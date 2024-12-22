import { Card, CardBody, select } from "@nextui-org/react"
import { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem, Select, SelectItem, Badge } from "@nextui-org/react";


const AdminRefresh = () => {
    const [companyList, setCompanyList] = useState([]);
    const [pickcompanyList, setPickCompanyList] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState(["All"]);
    const [selectedCompaniesName, setSelectedCompaniesName] = useState(["All"]);
    const [selectedYears, setSelectedYears] = useState(["All"]);

    const [selectedPyFolder, setPyFolder] = useState("D:/tao_project/valuation_engine/");

    const [logs, setLogs] = useState([]);

    //console.log(selectedYears);

    //Company Filter
    useEffect(() => {
        fetch('/api/companies/company')
            .then((res) => res.json())
            .then((value) => {
                setCompanyList(value); // Ensure value is an array
            })
            .catch((error) => {
                console.error("Error fetching companies:", error);
            });
    }, []);

    useEffect(() => {
        fetch('/api/companies/companypick')
            .then((res) => res.json())
            .then((value) => {
                setPickCompanyList(value[0]); // Ensure value is an array
            })
            .catch((error) => {
                console.error("Error fetching companies:", error);
            });
    }, []);


    const handleCompanySelectionChange = (key, company) => {
        if (!key || !company) return; // Ensure valid inputs

        // Handle "All" selection
        if (key === "All") {
            setSelectedCompanies(["All"]);
            setSelectedCompaniesName(["All"]);
            return;
        }

        // Update selectedCompanies (CIK)
        setSelectedCompanies((prev) => {
            const updatedCompanies = prev.includes("All")
                ? [key]
                : prev.includes(key)
                    ? prev.filter((item) => item !== key) // Remove if already selected
                    : [...prev, key]; // Add new selection
            return updatedCompanies.length > 0 ? updatedCompanies : ["All"]; // Default to "All" if empty
        });

        // Update selectedCompaniesName (Company Name)
        setSelectedCompaniesName((prev) => {
            const updatedNames = prev.includes("All")
                ? [company.company_name]
                : prev.includes(company.company_name)
                    ? prev.filter((name) => name !== company.company_name)
                    : [...prev, company.company_name];
            return updatedNames.length > 0 ? updatedNames : ["All"]; // Default to "All" if empty
        });
    };

    const resetCompanySelection = () => {
        setSelectedCompanies(['All']);
        setSelectedCompaniesName(['All']);
    };


    const pickCompanySelection = () => {
        const pickArray = pickcompanyList.cik.split(',');
        setSelectedCompanies(pickArray);
    };


    //Year Filter
    const getPastYears = (numYears) => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: numYears }, (_, index) => `${currentYear - index}`);
    };
    const yearList = getPastYears(15);

    const handleYearSelectionChange = (keys) => {
        //console.log(keys);
        const newSelectedKeys = [...keys]; // Convert selection to an array
        if (!newSelectedKeys || newSelectedKeys.length === 0) {
            setSelectedYears(["All"]);
            return;
        }
        const filteredKeys = newSelectedKeys.includes("All")
            ? newSelectedKeys.filter((key) => key !== "All")
            : newSelectedKeys;
        //console.log(filteredKeys);

        const selectedValues = filteredKeys.map((key) => parseInt(key));

        if (selectedValues.length === 1) {
            setSelectedYears([`${selectedValues[0]}`]);
        } else {
            const startYear = Math.min(...selectedValues);
            const endYear = Math.max(...selectedValues);

            const yearsInRange = Array.from(
                { length: endYear - startYear + 1 },
                (_, index) => `${startYear + index}`
            );

            setSelectedYears(yearsInRange);
        }



    };

    const resetYearSelection = () => {
        setSelectedYears(["All"]);
    };


    //Trigger Python Script
    const startScript = async () => {
        setLogs([]); // Clear logs before starting

        try {
            const response = await fetch('/api/run-python', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input1: selectedCompanies,
                    input2: selectedYears,
                    input3: selectedPyFolder,
                    dbCredentials: {
                        host: process.env.LOCALDB_HOST,
                        user: process.env.LOCALDB_USERNAME,
                        password: process.env.LOCALDB_PASSWORD,
                        database: process.env.LOCALDB_NAME,
                        port: process.env.LOCALDB_PORT,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to trigger script: ${response.statusText}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const logLines = chunk
                    .split('\n') // Split by newline
                    .filter((line) => line.trim().startsWith('data:')) // Only process lines starting with 'data:'
                    .map((line) => line.replace(/^data:\s*/, '').trim()); // Remove 'data:' prefix and trim

                setLogs((prevLogs) => [...prevLogs, ...logLines]); // Append new logs to the existing ones
            }
        } catch (error) {
            console.error('Error triggering script:', error);
            setLogs(['Failed to execute script. Check console for details.']);
        }
    };
    const CloudUpdate = async () => {
        setLogs([]); // Clear logs before starting

        try {
            const response = await fetch('/api/run-python-cloud', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input3: selectedPyFolder,
                    dbCredentials: {
                        LOCALDB_HOST: process.env.LOCALDB_HOST,
                        LOCALDB_USERNAME: process.env.LOCALDB_USERNAME,
                        LOCALDB_PASSWORD: process.env.LOCALDB_PASSWORD,
                        LOCALDB_NAME: process.env.LOCALDB_NAME,
                        LOCALDB_PORT: process.env.LOCALDB_PORT,
                        DB_HOST: process.env.DB_HOST,
                        DB_USERNAME: process.env.DB_USERNAME,
                        DB_PASSWORD: process.env.DB_PASSWORD,
                        DB_NAME: process.env.DB_NAME,
                        DB_PORT: process.env.DB_PORT,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to trigger script: ${response.statusText}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const logLines = chunk
                    .split('\n') // Split by newline
                    .filter((line) => line.trim().startsWith('data:')) // Only process lines starting with 'data:'
                    .map((line) => line.replace(/^data:\s*/, '').trim()); // Remove 'data:' prefix and trim

                setLogs((prevLogs) => [...prevLogs, ...logLines]); // Append new logs to the existing ones
            }
        } catch (error) {
            console.error('Error triggering script:', error);
            setLogs(['Failed to execute script. Check console for details.']);
        }

    };

    return (
        <div className='grid grid-row-3 gap-3'>
            <div className='grid grid-cols-2 gap-2'>
                <div >
                    <Autocomplete
                        label="Add Company to Selection"
                        onSelectionChange={(key) => {
                            //console.log("Key Selected:", key); // Debug Log
                            const selectedCompany = companyList.find((item) => String(item.cik) === String(key));
                            //console.log("Selected Company:", selectedCompany); // Debug Log
                            handleCompanySelectionChange(key, selectedCompany); // Pass both CIK and company object
                        }}
                        className="max-w-md"
                    >
                        {companyList.map((company) => (
                            <AutocompleteItem key={company.cik} value={company.cik}>
                                {company.company_name}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>

                    <button
                        className="bg-default-400 text-default-100 px-4 py-2 m-4 rounded hover:bg-default-500"
                        onClick={resetCompanySelection}
                    >
                        Reset
                    </button>
                    <button
                        className="bg-default-400 text-default-100 px-4 py-2 m-4 rounded hover:bg-default-500"
                        onClick={pickCompanySelection}
                    >
                        All Pick!
                    </button>
                    <p className="text-small text-default-500">Company Selected: {selectedCompaniesName.join(', ')}</p>

                </div>
                <div>
                    <Select
                        label="Year"
                        onSelectionChange={(keys) => {
                            //console.log("Keys Triggered in Selection:", keys);
                            handleYearSelectionChange(keys)
                        }}
                        placeholder="Select years..."
                        selectedKeys={selectedYears}
                        selectionMode="multiple"
                        className="max-w-md"
                    ><SelectItem key="All" value="All">All</SelectItem>
                        {yearList.map((year) => (
                            <SelectItem key={year}>
                                {year}
                            </SelectItem>
                        ))}
                    </Select>

                    <button
                        className="bg-default-400 text-default-100 px-4 py-2 m-4 rounded hover:bg-default-500"
                        onClick={resetYearSelection}
                    >
                        Reset
                    </button>
                    <p className="text-small text-default-500">Year Selected: {selectedYears.join(', ')}</p>
                </div>



            </div>

            <div className='grid grid-cols-4'>
                <div className="p-4 justify-content-end">
                    <p className="mt-2 mb-2">Refresh Parameters</p>
                    <p className="text-small">CIK: <span className="text-small text-default-500">{selectedCompanies.join(', ')}</span></p>
                    <p className="text-small">Year: <span className="text-small text-default-500">{selectedYears.join(', ')}</span></p>
                    <p className="text-small"><label className="mr-1">Folder Path:</label>
                        <input
                            type="text"
                            value={selectedPyFolder}
                            onChange={(e) => setPyFolder(e.target.value)}
                            className="border p-1 w-full text-small text-default-500"
                        /></p>

                    <button
                        className="bg-blue-500 text-white px-4 py-2 mt-4 max-w-md rounded hover:bg-blue-600"
                        onClick={startScript}
                    >
                        Run Python Script
                    </button>
                    <div>
                        <button
                            className="bg-pink-500 text-white px-4 py-2 mt-4 max-w-md rounded hover:bg-pink-600"
                            onClick={CloudUpdate}
                        >
                            Upload Data to Cloud
                        </button>

                    </div>


                </div>
                <div className="grid col-span-3 mt-4 p-2 rounded bg-default-100">
                    <h3 className="font-bold">Logs</h3>
                    <pre className="text-sm overflow-y-scroll max-h-96 min-h-96 bg-black text-white rounded p-2"
                        style={{
                            fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordWrap: 'break-word'
                        }} >
                        {logs.map((log, index) => (
                            <span
                                key={index}
                                className={
                                    log.startsWith('ERROR:')
                                        ? 'text-red-500' // Error logs in red
                                        : log.startsWith('data:')
                                            ? 'text-green-500' // Data logs in green
                                            : 'text-white' // Default logs in white
                                }
                            >
                                {log}
                                {'\n'}
                            </span>
                        ))}
                    </pre>
                </div>
            </div >

        </div >

    )
}

export default AdminRefresh