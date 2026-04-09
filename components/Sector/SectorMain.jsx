import React, { useState, useEffect } from 'react'
import { Skeleton } from '@nextui-org/react'
import Sector_Intro from './Sector_Intro';
import Sector_Metric_group from './Sector_Metric_group';
import Sector_Metric_detailtable from './Sector_Metric_detailtable';

const SectorMain = ({ sector }) => {
    const [sectorDetails, setsectorDetails] = useState([]);
    const [sectorDetailsQ, setSectorDetailsQ] = useState([]);
    const [sectorOverview, setsectorOverview] = useState([]);
    const [metricDetails, setmetricDetails] = useState([]);
    const [metricDetailsQ, setMetricDetailsQ] = useState([]);
    const [metricList, setmetricList] = useState([]);
    const [sectorMarketDetails, setsectorMarketDetails] = useState([]);
    const [viewMode, setViewMode] = useState('annual');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedQuarter, setSelectedQuarter] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        Promise.all([
            fetch(`/api/sectors/overview/${sector}`).then(r => r.json()),
            fetch(`/api/sectors/details/${sector}`).then(r => r.json()),
            fetch(`/api/sectors/details-quarterly/${sector}`).then(r => r.json()).catch(() => []),
            fetch(`/api/sectors/metrics/${sector}`).then(r => r.json()),
            fetch(`/api/sectors/metrics-quarterly/${sector}`).then(r => r.json()).catch(() => []),
            fetch(`/api/sectors/metriclist/${sector}`).then(r => r.json()),
            fetch(`/api/sectors/market/${sector}`).then(r => r.json()),
        ]).then(([overview, details, detailsQ, metrics, metricsQ, metriclist, market]) => {
            setsectorOverview(overview[0]);
            setsectorDetails(details);
            setSectorDetailsQ(Array.isArray(detailsQ) ? detailsQ : []);
            setmetricDetails(metrics);
            setMetricDetailsQ(Array.isArray(metricsQ) ? metricsQ : []);
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

    const activeMetricDetails = viewMode === 'quarterly' ? metricDetailsQ : metricDetails;

    const availableYears = [...new Set(activeMetricDetails.map(m => String(m.report_year)))].sort((a, b) => b - a);
    const defaultYear = availableYears[0] ?? '';
    const year = selectedYear ?? defaultYear;

    const availableQuarters = viewMode === 'quarterly'
        ? [...new Set(activeMetricDetails.filter(m => String(m.report_year) === year).map(m => m.report_quarter))]
            .filter(Boolean).sort().reverse()
        : [];
    const defaultQuarter = availableQuarters[0] ?? null;
    const quarter = selectedQuarter ?? defaultQuarter;

    const handleViewMode = (mode) => {
        setViewMode(mode);
        setSelectedYear(null);
        setSelectedQuarter(null);
    };

    return (
        <div className='grid grid-rows-subgrid gap-4 row-span-3'>
            <div className="grid grid-flow-col gap-4">
                <div>
                    <Sector_Intro sectorOverview={sectorOverview}></Sector_Intro>
                    <div className="flex flex-wrap gap-3 mt-2 items-center">
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleViewMode('annual')}
                                className={`text-xs px-3 py-1.5 rounded transition-colors ${
                                    viewMode === 'annual'
                                        ? 'bg-primary text-white'
                                        : 'bg-default-200 hover:bg-default-300 text-default-700'
                                }`}
                            >Annual</button>
                            <button
                                onClick={() => handleViewMode('quarterly')}
                                className={`text-xs px-3 py-1.5 rounded transition-colors ${
                                    viewMode === 'quarterly'
                                        ? 'bg-primary text-white'
                                        : 'bg-default-200 hover:bg-default-300 text-default-700'
                                }`}
                            >Quarterly</button>
                        </div>
                        <span className='text-default-500 text-xs'>View Ranking in</span>
                        <select
                            value={year}
                            onChange={e => { setSelectedYear(e.target.value); setSelectedQuarter(null); }}
                            className="text-xs px-2 py-1.5 rounded border border-default-300 bg-default-100 text-default-700"
                        >
                            {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        {viewMode === 'quarterly' && availableQuarters.length > 0 && (
                            <select
                                value={quarter ?? ''}
                                onChange={e => setSelectedQuarter(e.target.value)}
                                className="text-xs px-2 py-1.5 rounded border border-default-300 bg-default-100 text-default-700"
                            >
                                {availableQuarters.map(q => <option key={q} value={q}>{q}</option>)}
                            </select>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 grid-flow-col gap-4">
                <div className='grid grid-flow-col col-span-3 gap-4'>
                    <Sector_Metric_group
                        metricList={metricList}
                        metricDetails={metricDetails}
                        metricDetailsQ={metricDetailsQ}
                        sectorDetails={sectorDetails}
                        sectorDetailsQ={sectorDetailsQ}
                        viewMode={viewMode}
                        year={year}
                        quarter={quarter}
                        sectorMarketDetails={sectorMarketDetails}
                    />
                </div>
            </div>

        </div>
    )
}

export default SectorMain
