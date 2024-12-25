import React, { useState, useEffect } from 'react'
import Sector_Intro from './Sector_Intro';
import Sector_Metric_group from './Sector_Metric_group';
import Sector_Metric_detailtable from './Sector_Metric_detailtable';

const SectorMain = ({ sector }) => {
    const [sectorDetails, setsectorDetails] = useState([]);
    const [sectorOverview, setsectorOverview] = useState([]);
    const [metricDetails, setmetricDetails] = useState([]);
    const [metricList, setmetricList] = useState([]);
    const [sectorMarketDetails, setsectorMarketDetails] = useState([]);

    const yearlist = [...new Set(metricDetails.map(metricDetails => metricDetails.report_year))].sort((a, b) => a - b)
    const defaultyear = Math.max(...yearlist);
    const [innerYear, setYear] = useState();
    const year = innerYear ?? defaultyear;


    useEffect(() => {
        fetch(`/api/sectors/overview/${sector}`)
            .then(res => res.json())
            .then(value => {
                setsectorOverview(value[0]);
            })
    }, [sector])

    useEffect(() => {
        //console.log(sectorSelected);
        fetch(`/api/sectors/details/${sector}`)
            .then(res => res.json())
            .then(value => {
                setsectorDetails(value);
            })
    }, [sector])

    useEffect(() => {
        fetch(`/api/sectors/metrics/${sector}`)
            .then(res => res.json())
            .then(value => {
                setmetricDetails(value);
            })
    }, [sector])

    useEffect(() => {
        fetch(`/api/sectors/metriclist/${sector}`)
            .then(res => res.json())
            .then(value => {
                setmetricList(value);
            })
    }, [sector])

    useEffect(() => {
        fetch(`/api/sectors/market/${sector}`)
            .then(res => res.json())
            .then(value => {
                setsectorMarketDetails(value);
            })
    }, [sector])

    return (
        <div className='grid grid-rows-subgrid gap-4 row-span-3'>
            <div className="grid grid-flow-col gap-4">
                <div>
                    <Sector_Intro sectorOverview={sectorOverview}></Sector_Intro>
                    <span className='text-default-500'> {"["} View Ranking in
                        <select value={year} onChange={(e) => { setYear(e.target.value) }}>
                            {yearlist.map((y, i) => (
                                <option key={i}>{y}</option>
                            ))}
                        </select>{"]"}
                    </span>

                </div>

            </div>

            <div className="grid grid-cols-3 grid-flow-col gap-4">
                <div className='grid grid-flow-col col-span-3 gap-4'>
                    <Sector_Metric_group metricList={metricList} metricDetails={metricDetails} sectorDetails={sectorDetails} year={year} sectorMarketDetails={sectorMarketDetails}>
                    </Sector_Metric_group>
                </div>
            </div>

        </div>
    )
}

export default SectorMain