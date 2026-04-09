import React, { useState, useEffect } from 'react'
import { Skeleton, Card, CardBody } from '@nextui-org/react'
import Compare_MetricTable from './Compare_MetricTable'

const CompareMain = ({ companyA, sectorA, companyB, sectorB }) => {
    const [metricsA, setMetricsA] = useState([]);
    const [metricsB, setMetricsB] = useState([]);
    const [metricsAQ, setMetricsAQ] = useState([]);
    const [metricsBQ, setMetricsBQ] = useState([]);
    const [overviewA, setOverviewA] = useState(null);
    const [overviewB, setOverviewB] = useState(null);
    const [metricList, setMetricList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [viewMode, setViewMode] = useState('annual');
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedQuarter, setSelectedQuarter] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        Promise.all([
            fetch(`/api/companies/metrics/${encodeURIComponent(companyA)}`).then(r => r.json()),
            fetch(`/api/companies/metrics/${encodeURIComponent(companyB)}`).then(r => r.json()),
            fetch(`/api/companies/metrics-quarterly/${encodeURIComponent(companyA)}`).then(r => r.json()).catch(() => []),
            fetch(`/api/companies/metrics-quarterly/${encodeURIComponent(companyB)}`).then(r => r.json()).catch(() => []),
            fetch(`/api/companies/overview/${encodeURIComponent(companyA)}`).then(r => r.json()),
            fetch(`/api/companies/overview/${encodeURIComponent(companyB)}`).then(r => r.json()),
            fetch(`/api/sectors/metriclist/${sectorA}`).then(r => r.json()),
        ]).then(([mA, mB, mAQ, mBQ, ovA, ovB, mList]) => {
            setMetricsA(mA);
            setMetricsB(mB);
            setMetricsAQ(Array.isArray(mAQ) ? mAQ : []);
            setMetricsBQ(Array.isArray(mBQ) ? mBQ : []);
            setOverviewA(ovA[0]);
            setOverviewB(ovB[0]);
            setMetricList(mList);
            setIsLoading(false);
        }).catch(() => {
            setError('Failed to load comparison data. Please try again.');
            setIsLoading(false);
        });
    }, [companyA, companyB, sectorA]);

    if (isLoading) {
        return (
            <div className='grid gap-4 mt-4'>
                <Skeleton className="h-16 w-full rounded-lg" />
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

    const activeA = viewMode === 'quarterly' ? metricsAQ : metricsA;
    const activeB = viewMode === 'quarterly' ? metricsBQ : metricsB;

    // Derive available years from union of both companies' active data
    const availableYears = [...new Set([
        ...activeA.map(m => String(m.report_year)),
        ...activeB.map(m => String(m.report_year)),
    ])].sort((a, b) => b - a); // newest first for dropdown

    const defaultYear = availableYears[0] ?? String(overviewA?.report_year_max);
    const year = selectedYear ?? defaultYear;

    // Derive available quarters for selected year (quarterly mode only)
    const availableQuarters = viewMode === 'quarterly'
        ? [...new Set([
            ...activeA.filter(m => String(m.report_year) === year).map(m => m.report_quarter),
            ...activeB.filter(m => String(m.report_year) === year).map(m => m.report_quarter),
          ])].filter(Boolean).sort().reverse()
        : [];

    const defaultQuarter = availableQuarters[0] ?? null;
    const quarter = selectedQuarter ?? defaultQuarter;

    const periodLabel = viewMode === 'quarterly' ? `${year} ${quarter}` : year;

    const handleViewMode = (mode) => {
        setViewMode(mode);
        setSelectedYear(null);
        setSelectedQuarter(null);
    };

    return (
        <div className='mt-4'>
            <Card className="mb-4">
                <CardBody>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{companyA}</p>
                            <p className="text-sm text-default-500">{sectorA}</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{companyB}</p>
                            <p className="text-sm text-default-500">{sectorB}</p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    {/* Annual / Quarterly toggle + period selectors */}
                    <div className="flex flex-wrap gap-3 mb-4 items-center">
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

                    <Compare_MetricTable
                        metricsA={activeA}
                        metricsB={activeB}
                        metricList={metricList}
                        companyA={companyA}
                        companyB={companyB}
                        year={year}
                        quarter={viewMode === 'quarterly' ? quarter : null}
                        periodLabel={periodLabel}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default CompareMain;
