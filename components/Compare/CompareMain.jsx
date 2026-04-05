import React, { useState, useEffect } from 'react'
import { Skeleton, Card, CardBody } from '@nextui-org/react'
import Compare_MetricTable from './Compare_MetricTable'

const CompareMain = ({ companyA, sectorA, companyB, sectorB }) => {
    const [metricsA, setMetricsA] = useState([]);
    const [metricsB, setMetricsB] = useState([]);
    const [overviewA, setOverviewA] = useState(null);
    const [overviewB, setOverviewB] = useState(null);
    const [metricList, setMetricList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        Promise.all([
            fetch(`/api/companies/metrics/${encodeURIComponent(companyA)}`).then(r => r.json()),
            fetch(`/api/companies/metrics/${encodeURIComponent(companyB)}`).then(r => r.json()),
            fetch(`/api/companies/overview/${encodeURIComponent(companyA)}`).then(r => r.json()),
            fetch(`/api/companies/overview/${encodeURIComponent(companyB)}`).then(r => r.json()),
            fetch(`/api/sectors/metriclist/${sectorA}`).then(r => r.json()),
        ]).then(([mA, mB, ovA, ovB, mList]) => {
            setMetricsA(mA);
            setMetricsB(mB);
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

    const yearA = overviewA?.report_year_max;
    const yearB = overviewB?.report_year_max;

    return (
        <div className='mt-4'>
            <Card className="mb-4">
                <CardBody>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{companyA}</p>
                            <p className="text-sm text-default-500">{sectorA} · Latest year: {yearA}</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{companyB}</p>
                            <p className="text-sm text-default-500">{sectorB} · Latest year: {yearB}</p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <Compare_MetricTable
                        metricsA={metricsA}
                        metricsB={metricsB}
                        metricList={metricList}
                        companyA={companyA}
                        companyB={companyB}
                        yearA={yearA}
                        yearB={yearB}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default CompareMain;
