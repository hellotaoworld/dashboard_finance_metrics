import React, { useState, useEffect } from 'react'
import Sector_Metric_detailtable from './Sector_Metric_detailtable';
import Sector_Metric_graphcard from './Sector_Metric_graphcard';
import { useGlobalState } from '@/state';

const SectorMain = ({ sector }) => {
    const [sectorDetails, setsectorDetails] = useState([]);
    const metricDetails = [];

    useEffect(() => {
        //console.log(sectorSelected);
        fetch(`/api/sectors/details/${sector}`)
            .then(res => res.json())
            .then(value => {
                setsectorDetails(value);
            })
    }, [sector])


    metricDetails.push(
        sectorDetails.reduce((accumulator, item) => {
            accumulator[item.report_year] = item.avg_revenue_grwoth;
            return accumulator;
        }, {})
    );

    metricDetails.push(
        sectorDetails.reduce((accumulator, item) => {
            accumulator[item.report_year] = item.avg_return_on_invested_capital_rate;
            return accumulator;
        }, {})
    );

    metricDetails.push(
        sectorDetails.reduce((accumulator, item) => {
            accumulator[item.report_year] = item.avg_eps_growth_rate;
            return accumulator;
        }, {})
    );

    metricDetails.push(
        sectorDetails.reduce((accumulator, item) => {
            accumulator[item.report_year] = item.avg_adj_equity_growth_rate;
            return accumulator;
        }, {})
    );
    return (
        <div className='grid grid-rows-subgrid gap-4 row-span-3'>
            <div className='grid grid-rows-subgrid gap-4 row-span-3'>
                <div className="grid grid-cols-2 grid-flow-col gap-4">
                    <Sector_Metric_graphcard input={metricDetails[0]} metric={"Revenue Growth"}></Sector_Metric_graphcard>
                    <Sector_Metric_graphcard input={metricDetails[1]} metric={"Return on Invested Capital"}></Sector_Metric_graphcard>
                </div>
                <div className="grid grid-cols-2 grid-flow-col gap-4">
                    <Sector_Metric_graphcard input={metricDetails[2]} metric={"EPS Growth"}></Sector_Metric_graphcard>
                    <Sector_Metric_graphcard input={metricDetails[3]} metric={"Adjusted Equity Growth"}></Sector_Metric_graphcard>
                </div>
                <Sector_Metric_detailtable sectorDetails={sectorDetails}></Sector_Metric_detailtable>
            </div>
        </div>
    )
}

export default SectorMain