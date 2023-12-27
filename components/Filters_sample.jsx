import React, { useState, useEffect } from 'react'

const Filters = ({ sectors }) => {
    const [sectorSelected, setsectorSelected] = useState(sectors[0].company_sector);
    const [companyList, setcompanyList] = useState([]);
    useEffect(() => {
        //console.log(sectorSelected);
        fetch(`/api/sectors/${sectorSelected}`)
            .then(res => res.json())
            .then(value => {
                //console.log(value)
                setcompanyList(value)
            })

    }, [sectorSelected])

    return (
        <div>
            <select value={sectorSelected} onChange={(e) => { setsectorSelected(e.target.value) }}>
                {sectors.map((sector, i) => (<option key={i} value={sector.company_sector}>{sector.company_sector}</option>))}
            </select>
            <table>
                <thead><tr><td>Company Name</td></tr></thead>
                <tbody>
                    {companyList.map((company, i) => (
                        <tr key={i}><td>{company.company_name}</td></tr>
                    ))}
                </tbody>
            </table>

        </div>
    )

}

export default Filters