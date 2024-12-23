import { useState, useEffect, React } from 'react';
import DataTable, { createTheme } from 'react-data-table-component'
import axios from 'axios';


const CompanyMapping = ({ sectors }) => {
    const [data, setData] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [newRow, setNewRow] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const customStyles = {
        rows: {
            style: {
                backgroundColor: 'transparent', // For fallback
                className: 'bg-default-100 dark:bg-default-800', // Add Tailwind classes dynamically
            },
        },
        header: {
            style: {
                backgroundColor: 'transparent',
                className: 'bg-default-100 dark:bg-default-800', // Tailwind for header
            },
        },
        cells: {
            style: {
                className: 'bg-default-50 dark:bg-default-900 text-default-500', // Tailwind for cells
            },
        },
    };
    //console.log(editRowId)
    //console.log(newRow)


    useEffect(() => {
        fetch(`/api/mapping/getcompany`)
            .then(res => res.json())
            .then(value => {
                setData(value);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [])

    // useEffect(() => {
    //     fetch(`/api/mapping/getcompany`)
    //         .then(res => res.json())
    //         .then(value => {
    //             setData(value);
    //         })
    //         .catch((error) => console.error('Error fetching data:', error));
    // }, [])

    // Handle edit/save action
    const handleEdit = (id) => {
        //console.log(id);

        if (editRowId === id) {
            // Save the changes
            //console.log("save" + editRowId);
            const updatedRow = data.find((row) => row.cik === id);
            axios
                .put('/api/mapping/updatecompany', { id, data: updatedRow })
                .then(() => {
                    setEditRowId(null); // Exit edit mode
                })
                .catch((error) => console.error('Error updating row:', error));
        } else {
            // Enter edit mode
            setEditRowId(id);
        }
    };

    // Handle cancel action
    const handleCancelEdit = () => {
        setEditRowId(null); // Exit edit mode
    };

    // Handle delete action
    const handleDelete = (id) => {
        console.log(id);
        if (window.confirm('Are you sure you want to delete this row?')) {
            axios
                .delete('/api/mapping/deletecompany', { data: { id } })
                .then(() => setData((prevData) => prevData.filter((row) => row.cik !== id)))
                .catch((error) => console.error('Error deleting row:', error));
        }
    };

    // Handle input change for both edit and new row
    const handleInputBlur = (id, field, value) => {
        if (id === "New") {
            setNewRow((prevRow) => ({ ...prevRow, [field]: value }));
        } else {
            if (field === "sector") {
                setData((prevData) =>
                    prevData.map((row) =>
                        row.cik === id ? { ...row, ["sector"]: value } : row
                    )
                );
                const sic = sectors.find((item) => item.company_sector === value).sic;
                setData((prevData) =>
                    prevData.map((row) =>
                        row.cik === id ? { ...row, ["sic"]: sic } : row
                    )
                );
            }
            else {
                setData((prevData) =>
                    prevData.map((row) =>
                        row.cik === id ? { ...row, [field]: value } : row
                    )
                );
            };
        }
        if (field === "type" || field === "type_fav") {
            const updatedRow = { ...data.find((row) => row.cik === id), [field]: value };
            axios
                .put('/api/mapping/updatecompany', { id, data: updatedRow })
                .then(() => {
                    setEditRowId(null); // Exit edit mode
                })
                .catch((error) => console.error('Error updating row:', error));
        }

    };
    // Handle add new row
    const handleAddRow = () => {
        const defaultNewRow = {
            cik: '',
            company_name: '',
            sic: null,
            sector: null,
            type: null,
            qtr: null,
            exchange: null,
            symbol: null,
            type_fav: null
        };
        setNewRow(defaultNewRow);
        setEditRowId('New');
    };

    const handleSaveNewRow = () => {
        axios
            .post('/api/mapping/addcompany', { data: newRow })
            .then((response) => {
                setData((prevData) => [...prevData, newRow]);
                setNewRow({});
                setEditRowId(null);
            })
            .catch((error) => console.error('Error adding row:', error));
    };

    // Filter data based on search term
    const filteredData = data.filter((row) =>
        row.company_name.toLowerCase().includes(searchTerm.toLowerCase())
        || row.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        || row.sector.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Columns for DataTable
    const columns = [
        {
            name: 'CIK', selector: (row) =>
                editRowId === row.cik || (editRowId === "New" && row === newRow) ? (
                    <input className='w-full border rounded px-2 py-1'
                        defaultValue={editRowId === "New" ? newRow.cik || '' : row.cik}
                        onBlur={(e) => handleInputBlur(editRowId === "New" ? "New" : row.cik, 'cik', e.target.value)}
                    />
                ) : (
                    row.cik
                ), sortable: true
            , width: '7%'
        },
        {
            name: 'Company', selector: (row) =>
                editRowId === row.cik || (editRowId === "New" && row === newRow) ? (
                    <input className='w-full border rounded px-2 py-1'
                        defaultValue={editRowId === "New" ? newRow.company_name || '' : row.company_name}
                        onBlur={(e) =>
                            handleInputBlur(editRowId === "New" ? "New" : row.cik, 'company_name', e.target.value)
                        }
                    />
                ) : (
                    row.company_name
                ), sortable: true
            , width: '20%'
        },
        {
            name: 'Industry', selector: (row) => editRowId === row.cik || (editRowId === "New" && row === newRow) ? (

                <select
                    className='w-full border rounded px-2 py-1'
                    value={editRowId === "New" ? newRow.sector || '' : row.sector}
                    onChange={(e) =>
                        handleInputBlur(editRowId === "New" ? "New" : row.cik, 'sector', e.target.value)
                    }
                >
                    <option value=""></option>
                    {sectors.map((s, i) => (
                        <option key={i} value={s.company_sector}>{s.company_sector}</option>
                    ))}

                </select>

            ) : (
                row.sector
            ), sortable: true
            , width: '30%'
        },
        {
            name: 'Exchange', selector: (row) => editRowId === row.cik || (editRowId === "New" && row === newRow) ? (
                <input
                    defaultValue={editRowId === "New" ? newRow.exchange || '' : row.exchange}
                    onBlur={(e) =>
                        handleInputBlur(editRowId === "New" ? "New" : row.cik, 'exchange', e.target.value)
                    }
                />
            ) : (row.exchange), sortable: true, width: '7%'
        },
        {
            name: 'Ticker', selector: (row) => editRowId === row.cik || (editRowId === "New" && row === newRow) ? (
                <input
                    defaultValue={editRowId === "New" ? newRow.symbol || '' : row.symbol}
                    onBlur={(e) =>
                        handleInputBlur(editRowId === "New" ? "New" : row.cik, 'symbol', e.target.value)
                    }
                />
            ) : (
                row.symbol
            ), sortable: true
            , width: '7%'
        },
        { name: 'Last 10-K', selector: (row) => row.qtr, sortable: true, width: '7%' },
        {
            name: 'Love', selector: (row) => (
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        const newValue = row.type_fav === 'yes' ? null : 'yes';
                        handleInputBlur(row.cik, 'type_fav', newValue);
                    }}

                >
                    {row.type_fav === 'yes' ? (
                        <span role="img" aria-label="star" style={{ color: 'gold', fontSize: '1rem' }}>
                            ❤
                        </span>
                    ) : (
                        <span role="img" aria-label="star-outline" style={{ color: 'gray', fontSize: '1rem' }}>
                            🤍
                        </span>
                    )}
                </div>
            ), sortable: true
            , sortFunction: (rowA, rowB) => {
                const typeA = rowA.type_fav === 'yes' ? 1 : 0; // Convert 'pick' to 1 and others to 0
                const typeB = rowB.type_fav === 'yes' ? 1 : 0;
                return typeA - typeB; // Sort ascending (0 before 1)
            }
            , width: '6%'
        },
        {
            name: 'Pick', selector: (row) => (
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        const newValue = row.type === 'pick' ? null : 'pick';
                        handleInputBlur(row.cik, 'type', newValue);
                    }}

                >
                    {row.type === 'pick' ? (
                        <span role="img" aria-label="star" style={{ color: 'gold', fontSize: '1rem' }}>
                            ✔
                        </span>
                    ) : (
                        <span role="img" aria-label="star-outline" style={{ color: 'gray', fontSize: '1rem' }}>
                            ⬜
                        </span>
                    )}
                </div>
            ), sortable: true
            , sortFunction: (rowA, rowB) => {
                const typeA = rowA.type === 'pick' ? 1 : 0; // Convert 'pick' to 1 and others to 0
                const typeB = rowB.type === 'pick' ? 1 : 0;
                return typeA - typeB; // Sort ascending (0 before 1)
            }, width: '6%'
        },
        {
            name: 'Actions',
            cell: (row) =>
                editRowId === row.cik || (editRowId === "New" && row === newRow) ? (
                    <>
                        <button
                            onClick={() => editRowId === "New" ? handleSaveNewRow() : handleEdit(row.cik)}
                            className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 text-white px-2 py-1 rounded"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => handleEdit(row.cik)}
                            className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(row.cik)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </>
                ),
        },
    ];


    return (
        <div>
            <h1 className="font-sans mb-1">Company Mapping</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by company name, ticker or industry ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>
            <button
                onClick={handleAddRow}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
                Add New Row
            </button>

            <span className="link text-sm"> &nbsp; Edgar Company Search 👉 <a href="https://www.sec.gov/search-filings" target='new'>https://www.sec.gov/search-filings</a></span>
            <DataTable
                columns={columns}
                data={editRowId === 'New' ? [newRow, ...filteredData] : filteredData}
                pagination
                paginationPerPage={20}
                paginationRowsPerPageOptions={[20, 50, 100, filteredData.length]}
                highlightOnHover
                dense
                customStyles={customStyles}
            />
        </div>
    )
}

export default CompanyMapping
