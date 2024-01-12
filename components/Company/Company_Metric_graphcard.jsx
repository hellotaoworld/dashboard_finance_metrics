import React from 'react'
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react"
import Company_Metric_linegraph from './Company_Metric_linegraph'
import Company_Metric_ranking from './Company_Metric_raking'

const Company_Metric_graphcard = ({ input, sectorinput, metric, rank }) => {

    return (
        <Card>
            <CardHeader>
                <span className='font-medium '>{metric[0]}</span>
                &nbsp;&nbsp;&nbsp;
                <span className='italic text-xs align-bottom'>{metric[1]}</span>
            </CardHeader>
            <CardBody>
                <div className='grid grid-cols-3 gap-2'>
                    <div className='col-span-2'>
                        <Company_Metric_linegraph
                            input={input} sectorinput={sectorinput} companyname={metric[2]}>
                        </Company_Metric_linegraph></div>
                    <div><Company_Metric_ranking rank={rank}></Company_Metric_ranking></div>
                </div>
            </CardBody>
        </Card>
    )
}

export default Company_Metric_graphcard