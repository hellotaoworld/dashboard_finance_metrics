import React, { useState, useEffect } from 'react'
import Company_Intro from './Company_Intro'
import Company_Stats_card from './Company_Stats_card';
import Company_Metric_group from './Company_Metric_group';
import Company_Notes from './Company_Notes';

const CompanyMain = ({ sector, company }) => {
    const [companyOverview, setcompanyOverview] = useState([]);
    const [urlDetails, seturlDetails] = useState([]);
    const [metricDetails, setmetricDetails] = useState([]);
    const [sectormetricList, setsectormetricList] = useState([]);
    const [sectorDetails, setsectorDetails] = useState([]);
    const [rankingstats, setRankingstats] = useState([]);
    const [marketDetails, setmarketDetails] = useState([]);
    const [noteDetails, setNoteDetails] = useState(null);

    useEffect(() => {
        fetch(`/api/companies/overview/${encodeURIComponent(company)}`)
            .then(res => res.json())
            .then(value => {
                setcompanyOverview(value[0]);
            })
    }, [company])

    useEffect(() => {
        fetch(`/api/companies/market/${encodeURIComponent(company)}`)
            .then(res => res.json())
            .then(value => {
                setmarketDetails(value[0]);
            })
    }, [company])

    useEffect(() => {
        fetch(`/api/companies/url/${encodeURIComponent(company)}`)
            .then(res => res.json())
            .then(value => {
                seturlDetails(value);
            })
    }, [company])

    useEffect(() => {
        fetch(`/api/companies/metrics/${encodeURIComponent(company)}`)
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

    useEffect(() => {
        //console.log(sectorSelected);
        fetch(`/api/companies/ranking/${encodeURIComponent(company)}`)
            .then(res => res.json())
            .then(value => {
                setRankingstats(value);
            })
    }, [company])

    useEffect(() => {
        fetch(`/api/companies/notes/${encodeURIComponent(company)}`)
            .then(res => res.json())
            .then(value => {
                setNoteDetails(value[0]);
            })
            .catch((error) => console.error('Error fetching notes:', error));
    }, [company])


    //console.log(company);
    //console.log(companyOverview);
    //console.log(companyDetails);
    //console.log(metricDetails);
    //console.log(sectormetricList);
    //console.log(rankingstats);

    return (
        <div>

            <div className='grid grid-rows-subgrid gap-4 row-span-3'>
                <div className="grid grid-flow-col gap-4 mb-3">
                    <Company_Intro companyOverview={companyOverview} marketDetails={marketDetails}></Company_Intro>
                </div>

                <div >
                    <Company_Notes noteDetails={noteDetails} companyOverview={companyOverview} />
                </div>
                <div className="grid grid-cols-3 grid-flow-col gap-4">
                    <div className='grid grid-flow-col col-span-3 gap-4'>
                        <Company_Metric_group
                            metricDetails={metricDetails}
                            company={company}
                            sectorDetails={sectorDetails}
                            sectormetricList={sectormetricList} companyOverview={companyOverview}></Company_Metric_group>
                    </div>
                </div>
                <div className='grid grid-flow-col gap-4 mb-4'>
                    <Company_Stats_card input={urlDetails} ranking={rankingstats} metriclist={sectormetricList}>
                    </Company_Stats_card>
                </div>
            </div>
        </div>
    )
}

export default CompanyMain