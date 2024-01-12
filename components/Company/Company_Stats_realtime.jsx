import React, { useEffect, useState } from 'react'

const Company_Stats_realtime = ({ overview }) => {
    const [tickerDetails, setTickerDetails] = useState([])

    const ticker = overview.company_ticker
    //const ticker = 'AMD'
    /*
    useEffect(() => {
        fetch(`/api/alphavantage/${ticker}`)
            .then(res => res.json())
            .then(value => {
                setTickerDetails(value);
            })

    }, [ticker])
    */

    //console.log(tickerDetails)

    return (
        <div></div>
    )
}

export default Company_Stats_realtime