import React from 'react'
import Company_Metric_graphcard from './Company_Metric_graphcard'
import { Tabs, Tab } from '@nextui-org/react';
import { Card, CardBody } from '@nextui-org/react';

const Company_Metric_group = ({ metricDetails, metricDetailsQ, sectorDetails, sectorDetailsQ, viewMode, setViewMode, company, sectormetricList, companyOverview }) => {
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

    const activeMetrics = viewMode === 'quarterly' ? (Array.isArray(metricDetailsQ) ? metricDetailsQ : []) : metricDetails;
    const activeSector  = viewMode === 'quarterly' ? (Array.isArray(sectorDetailsQ) ? sectorDetailsQ : []) : sectorDetails;

    const periodKey = (item) => viewMode === 'quarterly'
        ? `${item.report_year} ${item.report_quarter}`
        : item.report_year;

    const metricData = [];
    sectormetricFieldName.forEach(metric => {
        const metricDataEntry = activeMetrics.filter(m => m.metric_name == metric).reduce((accumulator, item) => {
            accumulator[periodKey(item)] = item.metric_value;
            return accumulator;
        }, {});

        const sectormetricArray = activeSector.filter(s => s.metric_name == metric).reduce((accumulator, item) => {
            accumulator[periodKey(item)] = null;
            return accumulator;
        }, {});
        Object.keys(metricDataEntry).length > 1 ?
            metricData.push({ key: [metric], data: metricDataEntry })
            : metricData.push({ key: [metric], data: sectormetricArray })
    });

    const sectormetricData = [];
    sectormetricFieldName.forEach(metric => {
        const metricDataEntry = activeSector.filter(s => s.metric_name == metric).reduce((accumulator, item) => {
            accumulator[periodKey(item)] = item.avg;
            return accumulator;
        }, {});

        sectormetricData.push({ key: [metric], data: metricDataEntry });
    });

    return (
        <div>
            <div className="flex gap-2 mb-3">
                <button
                    onClick={() => setViewMode('annual')}
                    className={`text-xs px-3 py-1.5 rounded transition-colors ${
                        viewMode === 'annual'
                            ? 'bg-primary text-white'
                            : 'bg-default-200 hover:bg-default-300 text-default-700'
                    }`}
                >Annual</button>
                <button
                    onClick={() => setViewMode('quarterly')}
                    className={`text-xs px-3 py-1.5 rounded transition-colors ${
                        viewMode === 'quarterly'
                            ? 'bg-primary text-white'
                            : 'bg-default-200 hover:bg-default-300 text-default-700'
                    }`}
                >Quarterly</button>
            </div>
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
                                            input={metricData.filter(m => m.key == item.formula_shortname)[0].data}
                                            sectorinput={sectormetricData.filter(s => s.key == item.formula_shortname)[0].data}
                                            metric={[item.formula_name, item.formula_pseudo_code, company]}
                                            rank={activeMetrics.filter(m => m.metric_name === item.formula_shortname)}
                                            sector={activeSector}>
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
