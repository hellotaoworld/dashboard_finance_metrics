import React, { useState, useEffect } from 'react'
import { getCompanies } from '../services'

const CompanyPage = ({ companies }) => {
    const [companySelected, setcompanySelected] = useState(companies[0].company_name);
    const [companyDetails, setcompanyDetails] = useState([]);
    const metricDetails = [];



    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className='grid grid-rows-subgrid gap-4 row-span-3'>
                <select value={companySelected} onChange={(e) => { setcompanySelected(e.target.value) }}>
                    {companies.map((company, i) => (<option key={i} value={company.company_name}>{company.company_name}</option>))}
                </select>
            </div>
        </div >
    )

}

export default CompanyPage

export async function getServerSideProps() {
    const companies = (await getCompanies()) || [];

    return {
        props: { companies }
    }
}