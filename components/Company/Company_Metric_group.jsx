import React from 'react'
import Company_Metric_graphcard from './Company_Metric_graphcard'
import { Tabs, Tab } from '@nextui-org/react';

const Company_Metric_group = ({ metricDetails, companyDetails, sectorDetails, sectormetricList }) => {
    const metricGroup = [...new Set(sectormetricList.map(metricList => metricList.formula_category))]
    const sectormetricFieldName = [...new Set(sectormetricList.map(sectormetricList => sectormetricList.formula_shortname))]

    const metricData = [];
    sectormetricFieldName.forEach(metric => {
        const metricDataEntry = metricDetails.filter(metricDetails => metricDetails.metric_name == metric).reduce((accumulator, item) => {
            accumulator[item.report_year] = item.metric_value;  // Assuming you want to use dynamic metric
            return accumulator;
        }, {});

        const sectormetricArray = sectorDetails.filter(sectorDetails => sectorDetails.metric_name == metric).reduce((accumulator, item) => {
            accumulator[item.report_year] = null;  // Assuming you want to use dynamic metric
            return accumulator;
        }, {});
        Object.keys(metricDataEntry).length > 1 ?
            metricData.push({
                key: [metric],
                data: metricDataEntry
            })
            : metricData.push({
                key: [metric],
                data: sectormetricArray
            })
    });


    const sectormetricData = [];
    sectormetricFieldName.forEach(metric => {
        const metricDataEntry = sectorDetails.filter(sectorDetails => sectorDetails.metric_name == metric).reduce((accumulator, item) => {
            accumulator[item.report_year] = item.avg;  // Assuming you want to use dynamic metric
            return accumulator;
        }, {});

        sectormetricData.push({
            key: [metric],
            data: metricDataEntry
        });
    });

    const company_name = companyDetails.length > 0 ? companyDetails[0]["a.company_name"] : null

    return (
        <div>
            <Tabs aria-label="Graphs" className='my-4'>
                {metricGroup.map((group, i) => (
                    <Tab key={i} title={group}>
                        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                            {sectormetricList.filter(metricItem => metricItem.formula_category === group)
                                .map((item, index) => (
                                    <div key={index}>
                                        <Company_Metric_graphcard
                                            input={metricData.filter(metricData => metricData.key == item.formula_shortname)[0].data}
                                            sectorinput={sectormetricData.filter(sectormetricData => sectormetricData.key == item.formula_shortname)[0].data}
                                            metric={[item.formula_name,
                                            item.formula_pseudo_code,
                                                company_name]}
                                            rank={metricDetails.filter(metricDetailItem => metricDetailItem.metric_name === item.formula_shortname)}>
                                        </Company_Metric_graphcard>
                                    </div>
                                ))}
                        </div>

                    </Tab>
                ))}
            </Tabs>
        </div >
    )
}

export default Company_Metric_group