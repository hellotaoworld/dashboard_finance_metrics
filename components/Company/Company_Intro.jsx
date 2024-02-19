import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Button } from "@nextui-org/react"

const Company_Intro = ({ companyOverview }) => {
    //console.log(companyOverview)
    if (companyOverview == null) {
        return (<div></div>)
    }
    else {
        return (
            <div>
                <div className='mx-2 mb-2 text-3xl font-bold'>
                    {companyOverview.company_name}&nbsp;&nbsp;
                    <span className="align-top text-default-700 text-sm dark:bg-primary-200 bg-primary-200" size="sm" color="primary" variant="solid">&nbsp;{companyOverview.company_ticker}&nbsp;</span>

                </div>
                <div className='mx-2 text-default-500'>
                    Sector: {companyOverview.company_sector}.
                    Report range from year {companyOverview.report_year_min} to {companyOverview.report_year_max}.
                </div>
            </div>
        )
    }

}

export default Company_Intro