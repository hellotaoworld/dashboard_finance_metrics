import React, { useState, useEffect } from 'react'
import Company_Intro from './Company_Intro'
import Company_Statement from './Company_Statement';
import Company_Metric_group from './Company_Metric_group';

const CompanyMain = ({ sector, company }) => {
    const [companyOverview, setcompanyOverview] = useState([]);
    const [companyDetails, setcompanyDetails] = useState([]);
    const [metricDetails, setmetricDetails] = useState([]);
    const [sectormetricList, setsectormetricList] = useState([]);
    const [sectorDetails, setsectorDetails] = useState([]);

    useEffect(() => {
        fetch(`/api/companies/overview/${company}`)
            .then(res => res.json())
            .then(value => {
                setcompanyOverview(value[0]);
            })
    }, [company])

    useEffect(() => {
        fetch(`/api/companies/details/${company}`)
            .then(res => res.json())
            .then(value => {
                setcompanyDetails(value);
            })
    }, [company])

    useEffect(() => {
        fetch(`/api/companies/metrics/${company}`)
            .then(res => res.json())
            .then(value => {
                setmetricDetails(value);
            })
    }, [company])


    useEffect(() => {
        fetch(`/api/sectors/metriclist/${sector}`)
            .then(res => res.json())
            .then(value => {
                setsectormetricList(value);
            })
    }, [sector])

    useEffect(() => {
        //console.log(sectorSelected);
        fetch(`/api/sectors/details/${sector}`)
            .then(res => res.json())
            .then(value => {
                setsectorDetails(value);
            })
    }, [sector])

    //console.log(company);
    //console.log(companyOverview);
    //console.log(companyDetails);
    //console.log(metricDetails);
    //console.log(metricList);


    return (
        <div>

            <div className='grid grid-rows-subgrid gap-4 row-span-3'>
                <div className="grid grid-flow-col gap-4">
                    <Company_Intro company={company} companyOverview={companyOverview}></Company_Intro>
                </div>
                <div className="grid grid-cols-3 grid-flow-col gap-4">


                    <div className='grid grid-flow-col col-span-3 gap-4'>
                        <Company_Metric_group
                            metricDetails={metricDetails}
                            companyDetails={companyDetails}
                            sectorDetails={sectorDetails}
                            sectormetricList={sectormetricList}></Company_Metric_group>
                    </div>
                </div>
                <div className='grid grid-flow-col gap-4'>
                    <Company_Statement input={companyDetails}></Company_Statement>
                </div>
            </div>
        </div>
    )
}

export default CompanyMain