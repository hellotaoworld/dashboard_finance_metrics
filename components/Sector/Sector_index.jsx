import React, { useState, useEffect } from 'react'
import Sector_Metric_graphcard from './Sector_Metric_graphcard';
import Sector_Metric_detailtable from './Sector_Metric_detailtable';

const SectorComponent = ({ sectors }) => {
    const [sectorSelected, setsectorSelected] = useState(sectors[0].company_sector);
    const [sectorDetails, setsectorDetails] = useState([]);
    const metricDetails = [];

    useEffect(() => {
        //console.log(sectorSelected);
        fetch(`/api/sectors/${sectorSelected}`)
            .then(res => res.json())
            .then(value => {
                setsectorDetails(value);
            })
    }, [sectorSelected])


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

    //console.log(metricDetails);

    return (
        <div className='grid grid-rows-subgrid gap-4 row-span-3'>
            <select value={sectorSelected} onChange={(e) => { setsectorSelected(e.target.value) }}>
                {sectors.map((sector, i) => (<option key={i} value={sector.company_sector}>{sector.company_sector}</option>))}
            </select>
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

    )

}

export default SectorComponent