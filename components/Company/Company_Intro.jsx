import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Button, Progress } from "@nextui-org/react"
import { ChartBullet, ChartLabel, ChartThemeColor } from '@patternfly/react-charts/victory';
import { useState, useEffect } from 'react';

const Company_Intro = ({ companyOverview, marketDetails }) => {
    if (!companyOverview) {
        return (<div>No data available</div>)
    }
    else {
        return (

            <div className='grid grid-cols-2'>
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

                <div className='justify-self-center' style={{ height: '100px', width: '600px' }}>
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
                                legendPosition="top"
                                maxDomain={{ y: marketDetails.industry_max }}
                                minDomain={0}
                                padding={{
                                    bottom: 50,
                                    left: 130,
                                    right: 200,
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
        )
    }

}

export default Company_Intro