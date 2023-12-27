import React, { useState, useEffect } from 'react'
import Sector_Metric_graph from './Sector_Metric_graph';

const SectorComponent = ({ sectors }) => {
    const [sectorSelected, setsectorSelected] = useState(sectors[0].company_sector);
    const [sectorDetails, setsectorDetails] = useState([]);
    useEffect(() => {
        //console.log(sectorSelected);
        fetch(`/api/sectors/${sectorSelected}`)
            .then(res => res.json())
            .then(value => {
                //console.log(value)
                setsectorDetails(value)
            })

    }, [sectorSelected])

    //const report_year = sectorDetails.map(item => [item.report_year: item.report_year]);
    const avg_revenue_grwoth = sectorDetails.reduce((accumulator, item) => {
        accumulator[item.report_year] = item.avg_revenue_grwoth;
        return accumulator;
    }, {});

    const avg_return_on_invested_capital_rate = sectorDetails.reduce((accumulator, item) => {
        accumulator[item.report_year] = item.avg_return_on_invested_capital_rate;
        return accumulator;
    }, {});

    const avg_eps_growth_rate = sectorDetails.reduce((accumulator, item) => {
        accumulator[item.report_year] = item.avg_eps_growth_rate;
        return accumulator;
    }, {});

    const avg_adj_equity_growth_rate = sectorDetails.reduce((accumulator, item) => {
        accumulator[item.report_year] = item.avg_adj_equity_growth_rate;
        return accumulator;
    }, {});
    //console.log(report_year)

    return (
        <div>

            <select value={sectorSelected} onChange={(e) => { setsectorSelected(e.target.value) }}>
                {sectors.map((sector, i) => (<option key={i} value={sector.company_sector}>{sector.company_sector}</option>))}
            </select>


            <div><Sector_Metric_graph input={avg_revenue_grwoth}></Sector_Metric_graph></div>
            <div><Sector_Metric_graph input={avg_return_on_invested_capital_rate}></Sector_Metric_graph></div>
            <div><Sector_Metric_graph input={avg_eps_growth_rate}></Sector_Metric_graph></div>
            <div><Sector_Metric_graph input={avg_adj_equity_growth_rate}></Sector_Metric_graph></div>


            <br></br>
            <table className="table-auto border-collapse">
                <thead>
                    <tr>
                        <th>Report Year</th>
                        <th>Company Count</th>
                        <th>AVG Revenue Growth</th>
                        <th>AVG Return on Invested Capital</th>
                        <th>AVG EPS Growth</th>
                        <th>AVG Adjusted Equity Growth</th>
                    </tr>
                </thead>
                <tbody>
                    {sectorDetails.map((value, i) => (
                        <tr key={i}>
                            <td>{value.report_year}</td>
                            <td>{value.count_company}</td>
                            <td>{value.avg_revenue_grwoth}</td>
                            <td>{value.avg_return_on_invested_capital_rate}</td>
                            <td>{value.avg_eps_growth_rate}</td>
                            <td>{value.avg_adj_equity_growth_rate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )

}

export default SectorComponent