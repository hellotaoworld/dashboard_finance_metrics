import React from 'react'
import Sector_Metric_graphcard from './Sector_Metric_graphcard'
import { Tabs, Tab } from '@nextui-org/react';

const Sector_Metric_group = ({ metricList, metricDetails, sectorDetails, year }) => {
    const metricGroup = [...new Set(metricList.map(metricList => metricList.formula_category))]
    const metricFieldName = [...new Set(metricList.map(metricList => metricList.formula_shortname))]
    //const metricName = [...new Set(metricList.map(metricList => metricList.formula_name))]

    const metricData = [];
    metricFieldName.forEach(metric => {
        const metricDataEntry = sectorDetails.filter(sectorDetails => sectorDetails.metric_name == metric).reduce((accumulator, item) => {
            accumulator[item.report_year] = item.avg;  // Assuming you want to use dynamic metric
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
                {metricGroup.map((group, i) => (
                    <Tab key={i} title={group}>
                        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                            {metricList.filter(metricItem => metricItem.formula_category === group)
                                .map((item, index) => (
                                    <div key={index}>
                                        <Sector_Metric_graphcard
                                            input={metricData.filter(metricData => metricData.key == item.formula_shortname)[0].data}
                                            metric={[item.formula_name, item.formula_pseudo_code, item.formula_type]}
                                            rank={metricDetails.filter(metricDetailItem => metricDetailItem.metric_name === item.formula_shortname)}
                                            year={year}>
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