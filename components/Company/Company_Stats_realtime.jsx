import React, { useEffect, useState } from 'react'

const Company_Stats_realtime = ({ company }) => {
    const [tickerDetails, setTickerDetails] = useState([])

    const ticker = 'AMD'
    useEffect(() => {
        fetch(`/api/alphavantage/${ticker}`)
            .then(res => res.json())
            .then(value => {
                setTickerDetails(value['Time Series (5min)']);
            })

    }, [ticker])


    //console.log(tickerDetails)

    return (
        <div>Company_Stats_realtime</div>
    )
}

export default Company_Stats_realtime