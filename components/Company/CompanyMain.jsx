import React, { useState, useEffect } from 'react'
import Company_Intro from './Company_Intro'

const CompanyMain = ({ company }) => {
    const [companyOverview, setcompanyOverview] = useState([]);

    useEffect(() => {
        fetch(`/api/companies/overview/${company}`)
            .then(res => res.json())
            .then(value => {
                setcompanyOverview(value[0]);
            })
    }, [company])

    return (
        <div>

            <div className='grid grid-rows-subgrid gap-4 row-span-4'>
                <div className="grid grid-flow-col gap-4">
                    <Company_Intro company={company} companyOverview={companyOverview}></Company_Intro>
                </div>
                <div className="grid grid-cols-2 grid-flow-col gap-4">

                </div>
                <div className="grid grid-cols-2 grid-flow-col gap-4">

                </div>

            </div>
        </div>
    )
}

export default CompanyMain