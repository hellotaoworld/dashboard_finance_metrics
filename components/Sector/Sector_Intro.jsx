import React from 'react'
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react"

const Sector_Intro = ({ sectorOverview }) => {
    if (sectorOverview == null) {
        return (<div>No data available</div>)
    }
    else {
        return (
            <span>
                <span className='mx-2 mb-2 text-3xl font-bold'>
                    {sectorOverview.sector}
                </span>
                <br />
                <span className='mx-2 text-default-500'>
                    {sectorOverview.count_company} companies in profile. Report range from year {sectorOverview.report_year_min} to {sectorOverview.report_year_max}.
                </span>
            </span>
        )
    }
}

export default Sector_Intro