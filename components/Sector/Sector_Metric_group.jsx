import React from 'react'
import Sector_Metric_graphcard from './Sector_Metric_graphcard'
import { Tabs, Tab } from '@nextui-org/react';
import Sector_Metric_bargraph from './Sector_Metric_bargraph';

const Sector_Metric_group = ({ metricList, metricDetails, metricDetailsQ, sectorDetails, sectorDetailsQ, viewMode, year, quarter, sectorMarketDetails }) => {
    const metricGroup = [...new Set(metricList.map(metricList => metricList.formula_category))]
    const metricFieldName = [...new Set(metricList.map(metricList => metricList.formula_shortname))]

    const activeSectorDetails = viewMode === 'quarterly' ? (Array.isArray(sectorDetailsQ) ? sectorDetailsQ : []) : sectorDetails;
    const activeMetricDetails = viewMode === 'quarterly' ? (Array.isArray(metricDetailsQ) ? metricDetailsQ : []) : metricDetails;

    const periodKey = (item) => viewMode === 'quarterly'
        ? `${item.report_year} ${item.report_quarter}`
        : String(item.report_year);

    const metricData = [];
    metricFieldName.forEach(metric => {
        const metricDataEntry = activeSectorDetails.filter(s => s.metric_name == metric).reduce((accumulator, item) => {
            accumulator[periodKey(item)] = item.avg;
            return accumulator;
        }, {});

        metricData.push({
            key: [metric],
            data: metricDataEntry
        });
    });

    //console.log(metricList.filter(metricList => metricList.formula_category == 'Key Ratio'));
    //console.log(metricData.filter(metricData => metricData.key == 'eps_growth_rate')[0].data)

    return (
        <div>
            <Tabs aria-label="Graphs" className='my-4'>
                <Tab key={0} title="PE Ratio">

                    <Sector_Metric_bargraph input={sectorMarketDetails} />
                </Tab>
                {metricGroup.map((group, i) => (
                    <Tab key={i + 1} title={group}>
                        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                            {metricList.filter(metricItem => metricItem.formula_category === group)
                                .map((item, index) => (
                                    <div key={index}>
                                        <Sector_Metric_graphcard
                                            input={metricData.filter(metricData => metricData.key == item.formula_shortname)[0].data}
                                            metric={[item.formula_name, item.formula_pseudo_code, item.formula_type]}
                                            rank={activeMetricDetails.filter(metricDetailItem => metricDetailItem.metric_name === item.formula_shortname)}
                                            year={year}
                                            quarter={quarter}>
                                        </Sector_Metric_graphcard>
                                    </div>
                                ))}
                        </div>

                    </Tab>
                ))}
            </Tabs>
        </div >
    )
}

export default Sector_Metric_group