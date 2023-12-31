import React from 'react'
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react"
import Sector_Metric_linegraph from './Sector_Metric_linegraph'
import Sector_Metric_top10 from './Sector_Metric_top10'

const Sector_Metric_graphcard = ({ input, metric, rank }) => {

    return (
        <Card>
            <CardHeader>
                <span className='font-medium '>{metric[0]}</span>
                &nbsp;&nbsp;&nbsp;
                <span className='italic text-xs align-bottom'>{metric[1]}</span>
            </CardHeader>
            <CardBody>
                <div className='grid grid-cols-3 gap-2'>
                    <div className='col-span-2'><Sector_Metric_linegraph input={input}></Sector_Metric_linegraph></div>
                    <div><Sector_Metric_top10 rank={rank}></Sector_Metric_top10></div>
                </div>
            </CardBody>
        </Card>
    )
}

export default Sector_Metric_graphcard