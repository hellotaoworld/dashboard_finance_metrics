import React from 'react'
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react"
import Sector_Metric_linegraph from './Sector_Metric_linegraph'
import Sector_Metric_top10 from './Sector_Metric_top10'

const Sector_Metric_graphcard = ({ input, metric, rank }) => {

    return (
        <Card>
            <CardHeader>
                <div className='grid grid-rows-2'>
                    <div className='font-medium w-60'>{metric[0]}</div>

                    <div className='italic text-xs align-bottom'>{metric[1]}</div>
                </div>
            </CardHeader>
            <CardBody>
                <div className='grid grid-cols-3 gap-2'>
                    <div className='col-span-2'><Sector_Metric_linegraph input={input} type={metric[2]}></Sector_Metric_linegraph></div>
                    <div><Sector_Metric_top10 rank={rank}></Sector_Metric_top10></div>
                </div>
            </CardBody>
        </Card>
    )
}

export default Sector_Metric_graphcard