import React from 'react'
import Company_Metric_graphcard from './Company_Metric_graphcard'
import { Tabs, Tab } from '@nextui-org/react';
import { Card, CardBody } from '@nextui-org/react';

const Company_Metric_group = ({ metricDetails, company, sectorDetails, sectormetricList, companyOverview }) => {
    const exchangeMapping = {
        NYQ: "NYSE",
        NMS: "NASDAQ",
        YHD: "NYSE",
        NCM: "NASDAQ",
        BTS: "BATS",
        NGM: "NASDAQ",
    };
    const mappedExchange = exchangeMapping[companyOverview.exchange] || companyOverview.exchange;

    const stockview = `https://s.tradingview.com/widgetembed/?symbol=${mappedExchange}:${companyOverview.company_ticker}&interval=D&theme=light&style=1&locale=en&toolbar_bg=f1f3f6&studies=[]&enabled_features=[]&disabled_features=[]&hide_side_toolbar=false&allow_symbol_change=true&save_image=false&show_popup_button=true&popup_width=1000&popup_height=650`

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


    return (
        <div>
            <Tabs aria-label="Graphs" >
                <Tab key={0} title="Trading View">
                    <Card>
                        <CardBody>
                            <iframe
                                src={stockview}
                                width="100%"
                                height="500"
                                style={{ border: "none" }}
                            ></iframe>
                        </CardBody>
                    </Card>

                </Tab>
                {metricGroup.map((group, i) => (
                    <Tab key={i + 1} title={group}>
                        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                            {sectormetricList.filter(metricItem => metricItem.formula_category === group)
                                .map((item, index) => (
                                    <div key={index}>
                                        <Company_Metric_graphcard
                                            input={metricData.filter(metricData => metricData.key == item.formula_shortname)[0].data}
                                            sectorinput={sectormetricData.filter(sectormetricData => sectormetricData.key == item.formula_shortname)[0].data}
                                            metric={[item.formula_name,
                                            item.formula_pseudo_code,
                                                company]}
                                            rank={metricDetails.filter(metricDetailItem => metricDetailItem.metric_name === item.formula_shortname)}
                                            sector={sectorDetails}>
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