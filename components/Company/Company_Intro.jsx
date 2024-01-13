import React from 'react'
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react"

const Company_Intro = ({ company, companyOverview }) => {
    //console.log(companyOverview)
    return (
        <div>
            <div className='mx-2 mb-2 text-3xl font-bold'>
                {company}
            </div>
            <div className='mx-2 text-default-500'>
                Sector: {companyOverview.company_sector}. Report range from year {companyOverview.report_year_min} to {companyOverview.report_year_max}.
            </div>

        </div>


    )
}

export default Company_Intro