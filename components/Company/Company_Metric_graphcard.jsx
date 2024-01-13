import React from 'react'
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react"
import Company_Metric_linegraph from './Company_Metric_linegraph'
import Company_Metric_ranking from './Company_Metric_ranking'

const Company_Metric_graphcard = ({ input, sectorinput, metric, rank, sector }) => {
    //console.log(sector)
    return (
        <Card>
            <CardHeader>
                <div className='grid grid-rows-2'>
                    <div className='font-medium '>{metric[0]}</div>
                    <div className='italic text-xs align-bottom'>{metric[1]}</div>
                </div>


            </CardHeader>
            <CardBody>
                <div className='grid grid-cols-3 gap-2'>
                    <div className='col-span-2'>
                        <Company_Metric_linegraph
                            input={input} sectorinput={sectorinput} companyname={metric[2]}>
                        </Company_Metric_linegraph></div>
                    <div><Company_Metric_ranking rank={rank} sector={sector}></Company_Metric_ranking></div>
                </div>
            </CardBody>
        </Card>
    )
}

export default Company_Metric_graphcard