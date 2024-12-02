import { useState, useEffect, React } from 'react';
import DataTable from 'react-data-table-component'

const CompanyMapping = () => {
    const [data, setData] = useState([]);
    const [newRow, setNewRow] = useState({});

    useEffect(() => {
        fetch(`/api/mapping/getcompany`)
            .then(res => res.json())
            .then(value => {
                setData(value);
            })
    }, [])

    // Update row in the backend
    const handleEdit = async (id, updatedRow) => {
        try {
            await axios.put('/api/mapping/updatecompany', { id, data: updatedRow });
            setData((prevData) =>
                prevData.map((row) => (row.id === id ? { ...row, ...updatedRow } : row))
            );
        } catch (error) {
            console.error('Error updating row:', error);
        }
    };

    // Delete row from the backend
    const handleDelete = async (id) => {
        try {
            await axios.delete('/api/mapping/deletecompany', { data: { id } });
            setData((prevData) => prevData.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Error deleting row:', error);
        }
    };

    // Add a new row to the backend
    const handleAddRow = async () => {
        try {
            const response = await axios.post('/api/mapping/addcompany', newRow);
            setData((prevData) => [...prevData, { ...newRow, id: response.data.id }]);
            setNewRow({}); // Reset new row form
        } catch (error) {
            console.error('Error adding row:', error);
        }
    };

    // Columns for DataTable
    const columns = [
        { name: 'CIK', selector: (row) => row.cik, sortable: true },
        { name: 'Company', selector: (row) => row.company_name, sortable: true },
        { name: 'SIC', selector: (row) => row.sic, sortable: true },
        { name: 'Sector', selector: (row) => row.sector, sortable: true },
        { name: 'Stared', selector: (row) => row.type, sortable: true },
        { name: 'Last 10-K', selector: (row) => row.qtr, sortable: true },
        { name: 'Exchange', selector: (row) => row.exchange, sortable: true },
        { name: 'Ticker', selector: (row) => row.symbol, sortable: true },
        {
            name: 'Actions',
            cell: (row) => (
                <>
                    <button
                        onClick={() => handleEdit(row.id, { ...row, name: 'Updated Name' })}
                        className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
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
            <DataTable
                columns={columns}
                data={data || []}
                pagination
                highlightOnHover
                dense
            />
        </div>
    )
}

export default CompanyMapping