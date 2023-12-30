import React, { useState, useEffect } from 'react'
import Sector_Metric_detailtable from './Sector_Metric_detailtable';
import Sector_Metric_graphcard from './Sector_Metric_graphcard';
import Sector_Intro from './Sector_Intro';

const SectorMain = ({ sector }) => {
    const [sectorDetails, setsectorDetails] = useState([]);
    const [sectorOverview, setsectorOverview] = useState([]);
    const metricDetails = [];

    useEffect(() => {
        //console.log(sectorSelected);
        fetch(`/api/sectors/details/${sector}`)
            .then(res => res.json())
            .then(value => {
                setsectorDetails(value);
            })
    }, [sector])

    useEffect(() => {
        fetch(`/api/sectors/overview/${sector}`)
            .then(res => res.json())
            .then(value => {
                setsectorOverview(value[0]);
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
        <div>

            <div className='grid grid-rows-subgrid gap-4 row-span-4'>
                <div className="grid grid-flow-col gap-4">
                    <Sector_Intro sector={sector} sectorOverview={sectorOverview}></Sector_Intro>
                </div>
                <div className="grid grid-cols-2 grid-flow-col gap-4">
                    <Sector_Metric_graphcard input={metricDetails[0]} metric={"Revenue Growth"}></Sector_Metric_graphcard>
                    <Sector_Metric_graphcard input={metricDetails[1]} metric={"Return on Invested Capital"}>
                    </Sector_Metric_graphcard>
                </div>
                <div className="grid grid-cols-2 grid-flow-col gap-4">
                    <Sector_Metric_graphcard input={metricDetails[2]} metric={"EPS Growth"}></Sector_Metric_graphcard>
                    <Sector_Metric_graphcard input={metricDetails[3]} metric={"Adjusted Equity Growth"}>
                    </Sector_Metric_graphcard>
                </div>
                <Sector_Metric_detailtable sectorDetails={sectorDetails}></Sector_Metric_detailtable>
            </div>
        </div>
    )
}

export default SectorMain