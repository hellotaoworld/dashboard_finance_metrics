import React, { useState, useEffect } from 'react'
import { Skeleton } from '@nextui-org/react'
import Sector_Intro from './Sector_Intro';
import Sector_Metric_group from './Sector_Metric_group';
import Sector_Metric_detailtable from './Sector_Metric_detailtable';

const SectorMain = ({ sector }) => {
    const [sectorDetails, setsectorDetails] = useState([]);
    const [sectorOverview, setsectorOverview] = useState([]);
    const [metricDetails, setmetricDetails] = useState([]);
    const [metricList, setmetricList] = useState([]);
    const [sectorMarketDetails, setsectorMarketDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const yearlist = [...new Set(metricDetails.map(m => m.report_year))].sort((a, b) => a - b)
    const defaultyear = Math.max(...yearlist);
    const [innerYear, setYear] = useState();
    const year = innerYear ?? defaultyear;

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        Promise.all([
            fetch(`/api/sectors/overview/${sector}`).then(r => r.json()),
            fetch(`/api/sectors/details/${sector}`).then(r => r.json()),
            fetch(`/api/sectors/metrics/${sector}`).then(r => r.json()),
            fetch(`/api/sectors/metriclist/${sector}`).then(r => r.json()),
            fetch(`/api/sectors/market/${sector}`).then(r => r.json()),
        ]).then(([overview, details, metrics, metriclist, market]) => {
            setsectorOverview(overview[0]);
            setsectorDetails(details);
            setmetricDetails(metrics);
            setmetricList(metriclist);
            setsectorMarketDetails(market);
            setIsLoading(false);
        }).catch(() => {
            setError('Failed to load sector data. Please try again.');
            setIsLoading(false);
        });
    }, [sector])

    if (isLoading) {
        return (
            <div className='grid grid-rows-subgrid gap-4 row-span-3'>
                <Skeleton className="h-20 w-full rounded-lg" />
                <Skeleton className="h-64 w-full rounded-lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-2 my-4 p-4 rounded-lg bg-danger-50 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400">
                {error}
            </div>
        );
    }

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
