import React, { useState, useEffect } from 'react'
import Sector_Intro from './Sector_Intro';
import Sector_Metric_group from './Sector_Metric_group';
import Sector_Metric_detailtable from './Sector_Metric_detailtable';

const SectorMain = ({ sector }) => {
    const [sectorDetails, setsectorDetails] = useState([]);
    const [sectorOverview, setsectorOverview] = useState([]);
    const [metricDetails, setmetricDetails] = useState([]);
    const [metricList, setmetricList] = useState([]);

    useEffect(() => {
        //console.log(sectorSelected);
        fetch(`/api/sectors/details/${sector}`)
            .then(res => res.json())
            .then(value => {
                setsectorDetails(value);
            })
    }, [sector])

    useEffect(() => {
        fetch(`/api/sectors/overview/${sector}`)
            .then(res => res.json())
            .then(value => {
                setsectorOverview(value[0]);
            })
    }, [sector])

    useEffect(() => {
        fetch(`/api/sectors/metrics/${sector}`)
            .then(res => res.json())
            .then(value => {
                setmetricDetails(value);
            })
    }, [sector])

    useEffect(() => {
        fetch(`/api/sectors/metriclist/${sector}`)
            .then(res => res.json())
            .then(value => {
                setmetricList(value);
            })
    }, [sector])

    return (
        <div>
            <Sector_Intro sector={sector} sectorOverview={sectorOverview}></Sector_Intro>
            <Sector_Metric_group metricList={metricList} metricDetails={metricDetails} sectorDetails={sectorDetails}>
            </Sector_Metric_group>
            {/*<Sector_Metric_detailtable metricList={metricList} sectorDetails={sectorDetails}></Sector_Metric_detailtable> */}

        </div>
    )
}

export default SectorMain