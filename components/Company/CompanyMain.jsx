import React, { useState, useEffect } from 'react'
import { Skeleton } from '@nextui-org/react'
import Company_Intro from './Company_Intro'
import Company_Stats_card from './Company_Stats_card';
import Company_Metric_group from './Company_Metric_group';
import Company_Notes from './Company_Notes';

function downloadCSV(rows, filename) {
    if (!rows || rows.length === 0) return;
    const header = Object.keys(rows[0]).join(',');
    const body = rows.map(r =>
        Object.values(r).map(v => (typeof v === 'string' && v.includes(',') ? `"${v}"` : v)).join(',')
    ).join('\n');
    const blob = new Blob([header + '\n' + body], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

const CompanyMain = ({ sector, company }) => {
    const [companyOverview, setcompanyOverview] = useState([]);
    const [urlDetails, seturlDetails] = useState([]);
    const [metricDetails, setmetricDetails] = useState([]);
    const [sectormetricList, setsectormetricList] = useState([]);
    const [sectorDetails, setsectorDetails] = useState([]);
    const [rankingstats, setRankingstats] = useState([]);
    const [marketDetails, setmarketDetails] = useState([]);
    const [noteDetails, setNoteDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        Promise.all([
            fetch(`/api/companies/overview/${encodeURIComponent(company)}`).then(r => r.json()),
            fetch(`/api/companies/market/${encodeURIComponent(company)}`).then(r => r.json()),
            fetch(`/api/companies/url/${encodeURIComponent(company)}`).then(r => r.json()),
            fetch(`/api/companies/metrics/${encodeURIComponent(company)}`).then(r => r.json()),
            fetch(`/api/companies/ranking/${encodeURIComponent(company)}`).then(r => r.json()),
            fetch(`/api/companies/notes/${encodeURIComponent(company)}`).then(r => r.json()),
        ]).then(([overview, market, url, metrics, ranking, notes]) => {
            setcompanyOverview(overview[0]);
            setmarketDetails(market[0]);
            seturlDetails(url);
            setmetricDetails(metrics);
            setRankingstats(ranking);
            setNoteDetails(notes[0]);
            setIsLoading(false);
        }).catch(() => {
            setError('Failed to load company data. Please try again.');
            setIsLoading(false);
        });
    }, [company])

    useEffect(() => {
        Promise.all([
            fetch(`/api/sectors/metriclist/${sector}`).then(r => r.json()),
            fetch(`/api/sectors/details/${sector}`).then(r => r.json()),
        ]).then(([metriclist, details]) => {
            setsectormetricList(metriclist);
            setsectorDetails(details);
        }).catch(() => {
            setError('Failed to load sector data. Please try again.');
        });
    }, [sector])

    if (isLoading) {
        return (
            <div className='grid grid-rows-subgrid gap-4 row-span-3'>
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-40 w-full rounded-lg" />
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
        <div>
            <div className='grid grid-rows-subgrid gap-4 row-span-3'>
                <div className="grid grid-flow-col gap-4 mb-3 items-start">
                    <Company_Intro companyOverview={companyOverview} marketDetails={marketDetails}></Company_Intro>
                    <div className="export-btn flex gap-2 justify-self-end self-start mt-2 mr-2">
                        <button
                            onClick={() => downloadCSV(metricDetails, `${company}_metrics.csv`)}
                            className="text-xs px-3 py-1.5 rounded bg-default-200 hover:bg-default-300 text-default-700 transition-colors"
                        >
                            Export CSV
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="text-xs px-3 py-1.5 rounded bg-default-200 hover:bg-default-300 text-default-700 transition-colors"
                        >
                            Print / PDF
                        </button>
                    </div>
                </div>

                <div >
                    <Company_Notes noteDetails={noteDetails} companyOverview={companyOverview} />
                </div>
                <div className="grid grid-cols-3 grid-flow-col gap-4">
                    <div className='grid grid-flow-col col-span-3 gap-4'>
                        <Company_Metric_group
                            metricDetails={metricDetails}
                            company={company}
                            sectorDetails={sectorDetails}
                            sectormetricList={sectormetricList} companyOverview={companyOverview}></Company_Metric_group>
                    </div>
                </div>
                <div className='grid grid-flow-col gap-4 mb-4'>
                    <Company_Stats_card input={urlDetails} ranking={rankingstats} metriclist={sectormetricList}>
                    </Company_Stats_card>
                </div>
            </div>
        </div>
    )
}

export default CompanyMain
