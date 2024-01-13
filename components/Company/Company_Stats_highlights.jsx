import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Company_Stats_highlights = ({ ranking, metriclist }) => {
    //const currentYear = new Date().getFullYear();
    const yearlist = [...new Set(ranking.map(ranking => ranking["year"]))]
    const defaultyear = Math.max(...yearlist);
    const [innerYear, setYear] = useState();
    const year = innerYear ?? defaultyear;

    const stats = ranking.filter(ranking => ranking["year"] == year)
    const top_stats = stats.filter(stats => stats["metric_ranking"] <= 3)
    const bottom_stats = stats.filter(stats => stats["metric_ranking"] > 3)
    //console.log(metriclist)

    return (
        <div>
            <div className='font-medium mb-3'>Ranking Stats, Year
                <select value={year} className='mx-1' onChange={(e) => { setYear(e.target.value) }}>
                    {yearlist.map((y, i) => (
                        <option key={i} value={y}>{y}</option>
                    ))
                    }
                </select>
            </div>
            <div className='my-2 grid grid-cols-2 gap-1'>
                <div>
                    <div className='list mx-2'>
                        {top_stats.map((ranking, k) => (
                            <p key={k} className='mb-2'>
                                <p className=''>
                                    🏆
                                    Ranked #{ranking.metric_ranking}
                                    <span className='text-sm'>&nbsp;in&nbsp;{ranking.count}&nbsp;{ranking.count == 1 ? "metric" : "metrics"}</span>
                                </p>
                                <p className='mx-7 text-default-500 text-sm'>
                                    {ranking.metrics.split(',').map((m, i) => (

                                        <li key={i}>
                                            {metriclist.filter(metriclist => metriclist["formula_name"] == m).map((category, c) => (
                                                <span key={c}>{category.formula_category}</span>
                                            ))}
                                            {m}</li>
                                    ))}
                                </p>

                            </p>
                        ))

                        }
                    </div>
                </div>

                <div>
                    <div className='list'>
                        {bottom_stats.map((ranking, k) => (
                            <p key={k} className='mb-2'>
                                <p className=''>
                                    ⚠
                                    Ranked #{ranking.metric_ranking}
                                    <span className='text-sm'>&nbsp;in&nbsp;{ranking.count}&nbsp;{ranking.count == 1 ? "metric" : "metrics"}</span>
                                </p>
                                <p className='mx-7 text-default-500 text-sm'>
                                    {ranking.metrics.split(',').map((m, i) => (

                                        <li key={i}>
                                            {metriclist.filter(metriclist => metriclist["formula_name"] == m).map((category, c) => (
                                                <span key={c}>{category.formula_category}</span>
                                            ))}
                                            {m}</li>
                                    ))}
                                </p>

                            </p>
                        ))

                        }
                    </div>
                </div>



            </div>


        </div>
    )
}

export default Company_Stats_highlights