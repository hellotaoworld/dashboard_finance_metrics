import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Button, Progress } from "@nextui-org/react"
import { ChartBullet, ChartLabel, ChartThemeColor } from '@patternfly/react-charts/victory';
import { useState, useEffect } from 'react';

const Company_Intro = ({ companyOverview, marketDetails }) => {
    //console.log(marketDetails);
    if (!companyOverview) {
        return (<div>No data available</div>)
    }
    else {
        return (
            <div>

                <div className='grid grid-cols-2 grid-flow-col gap-1'>
                    <div>
                        <div className='mx-2 mb-2 text-3xl font-bold'>
                            {companyOverview.company_name}&nbsp;&nbsp;
                            <span className="align-top text-default-700 text-sm dark:bg-primary-200 bg-primary-200" size="sm" color="primary" variant="solid">&nbsp;{companyOverview.company_ticker}&nbsp;</span>
                            &nbsp;
                            <span className="align-top text-default-900 text-sm dark:bg-primary-100 bg-primary-100" size="sm" color="primary" variant="solid">CIK:&nbsp;{companyOverview.cik}&nbsp;</span></div>
                        <div className='mx-2 text-default-500'>
                            Sector: {companyOverview.company_sector}.
                            Report range from year {companyOverview.report_year_min} to {companyOverview.report_year_max}.<br />
                            Last annual report as of {companyOverview.fye}.
                        </div>
                    </div>

                    <div className='mt-10 mr-32 justify-self-end absolute top-0 right-0 h-16 w-16' style={{ height: '200px', width: '600px' }}>
                        {companyOverview.company_name && marketDetails && (
                            <div>
                                <ChartBullet
                                    ariaDesc="PE Ratio"
                                    ariaTitle="PE Ratio"
                                    comparativeWarningMeasureData={[{ name: 'Industry Avg', y: marketDetails.industry_avg }]}
                                    comparativeWarningMeasureLegendData={[{ name: 'Industry Avg' }]}
                                    constrainToVisibleArea
                                    labels={({ datum }) => `${datum.name}: ${datum.y}`}
                                    height={200}
                                    maxDomain={{ y: marketDetails.industry_max }}
                                    minDomain={{ y: marketDetails.industry_min }}
                                    padding={{
                                        bottom: 50,
                                        left: 150, // Adjusted to accommodate labels
                                        right: 75,
                                        top: 50
                                    }}
                                    primarySegmentedMeasureData={[{ name: companyOverview.company_name, y: marketDetails.metric_value }]}
                                    primarySegmentedMeasureLegendData={[{ name: companyOverview.company_name }]}
                                    themeColor={ChartThemeColor.blue}
                                    subTitle="Stock Price / EPS"
                                    title="PE Ratio"
                                    width={600}
                                />

                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

}

export default Company_Intro