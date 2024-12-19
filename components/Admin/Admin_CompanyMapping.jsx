import { useState, useEffect, React } from 'react';
import DataTable from 'react-data-table-component'
import axios from 'axios';

const CompanyMapping = () => {
    const [data, setData] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [newRow, setNewRow] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

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

    // Handle edit/save action
    const handleEdit = (id) => {
        //console.log(id);
        //console.log(editRowId);
        if (editRowId === id) {
            // Save the changes
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
            setData((prevData) =>
                prevData.map((row) =>
                    row.cik === id ? { ...row, [field]: value } : row
                )
            );
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
            symbol: null
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
    );

    // Columns for DataTable
    const columns = [
        {
            name: 'CIK', selector: (row) =>
                editRowId === row.cik || (editRowId === "New" && row === newRow) ? (
                    <input
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
                    <input
                        defaultValue={editRowId === "New" ? newRow.company_name || '' : row.company_name}
                        onBlur={(e) =>
                            handleInputBlur(editRowId === "New" ? "New" : row.company_name, 'company_name', e.target.value)
                        }
                    />
                ) : (
                    row.company_name
                ), sortable: true
            , width: '25%'
        },
        {
            name: 'SIC', selector: (row) =>
                editRowId === row.cik || (editRowId === "New" && row === newRow) ? (
                    <input
                        defaultValue={editRowId === "New" ? newRow.sic || '' : row.sic}
                        onBlur={(e) =>
                            handleInputBlur(editRowId === "New" ? "New" : row.sic, 'sic', e.target.value)
                        }
                    />
                ) : (
                    row.sic
                ), sortable: true
            , width: '5%'
        },
        {
            name: 'Sector', selector: (row) => editRowId === row.cik || (editRowId === "New" && row === newRow) ? (
                <input
                    defaultValue={editRowId === "New" ? newRow.sector || '' : row.sector}
                    onBlur={(e) =>
                        handleInputBlur(editRowId === "New" ? "New" : row.sector, 'industry', e.target.value)
                    }
                />
            ) : (
                row.sector
            ), sortable: true
            , width: '25%'
        },
        {
            name: 'Stared', selector: (row) => editRowId === row.cik || (editRowId === "New" && row === newRow) ? (
                <input
                    defaultValue={editRowId === "New" ? newRow.type || '' : row.type}
                    onBlur={(e) =>
                        handleInputBlur(editRowId === "New" ? "New" : row.type, 'type', e.target.value)
                    }
                />
            ) : (
                row.type
            ), sortable: true
            , width: '6%'
        },
        { name: 'Last 10-K', selector: (row) => row.qtr, sortable: true, width: '7%' },
        { name: 'Exchange', selector: (row) => row.exchange, sortable: true, width: '7%' },
        {
            name: 'Ticker', selector: (row) => editRowId === row.cik || (editRowId === "New" && row === newRow) ? (
                <input
                    defaultValue={editRowId === "New" ? newRow.symbol || '' : row.symbol}
                    onBlur={(e) =>
                        handleInputBlur(editRowId === "New" ? "New" : row.symbol, 'symbol', e.target.value)
                    }
                />
            ) : (
                row.symbol
            ), sortable: true
            , width: '7%'
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
            <h1>Company Mapping</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by company name..."
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
            <DataTable
                columns={columns}
                data={editRowId === 'New' ? [newRow, ...filteredData] : filteredData}
                pagination
                paginationPerPage={20}
                paginationRowsPerPageOptions={[20, 50, 100, filteredData.length]}
                highlightOnHover
                dense
                customStyles={{
                    cells: {
                        style: {
                            //whiteSpace: 'nowrap', // Prevent wrapping
                            overflow: 'visible', // Hide overflow
                            //textOverflow: 'ellipsis', // Add ellipsis
                        },
                    },
                }}
            />
        </div>
    )
}

export default CompanyMapping