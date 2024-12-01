import { Card, CardBody } from "@nextui-org/react"
import { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";


const AdminRefresh = () => {
    const [companyList, setCompanyList] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch('/api/companies/company')
            .then((res) => res.json())
            .then((value) => {
                console.log("Fetched company list:", value); // Debug log
                setCompanyList(value); // Ensure value is an array
            })
            .catch((error) => {
                console.error("Error fetching companies:", error);
            });
    }, []);

    const getPastYears = (numYears) => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: numYears }, (_, index) => `${currentYear - index}`);
    };
    const yearlist = getPastYears(15);

    const handleCompaniesChange = (selectedKeys) => {
        setSelectedCompanies(selectedKeys);
    };

    const handleYearsChange = (selectedKeys) => {
        setSelectedYears(selectedKeys);
    };

    const startScript = () => {
        setLogs([]);

        const eventSource = new EventSource('/api/run-python');

        eventSource.onmessage = (event) => {
            setLogs((prevLogs) => [...prevLogs, event.data]);
        };

        eventSource.onerror = (error) => {
            console.error('Error:', error);
            eventSource.close();
        };
    };


    return (
        <div className='grid grid-row-2 gap-2'>
            <div className='grid grid-cols-2'>
                <div>
                    <Autocomplete
                        className="max-w-md"
                        label="Select Companies"
                        defaultItems={companyList}
                        onSelectionChange={handleCompaniesChange}
                    //selectionMode="multiple"
                    >
                        {companyList.map((company) => (
                            <AutocompleteItem key={company.company_name} value={company.cik}>
                                {company.company_name} ({company.cik})
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>
                <div>
                    <Autocomplete
                        className="max-w-md"
                        label="Select Years"
                        defaultItems={yearlist}
                        onSelectionChange={handleYearsChange}
                        selectionMode="multiple">
                        {yearlist.map((year) => (
                            <AutocompleteItem key={year} value={year}>
                                {year}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>

                </div>

            </div>

            <div className='grid grid-cols-4'>
                <div className="p-4 justify-content-end">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={startScript}
                    >
                        Run Python Script
                    </button>
                </div>
                <div className="grid col-span-3 mt-4 border p-2 rounded bg-gray-100">
                    <h3 className="font-bold">Logs:</h3>
                    <pre className="text-sm">
                        {logs.map((log, index) => (
                            <div key={index}>{log}</div>
                        ))}
                    </pre>
                </div>
            </div>

        </div>

    )
}

export default AdminRefresh