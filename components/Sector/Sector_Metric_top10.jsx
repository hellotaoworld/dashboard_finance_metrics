import { RadioGroup, Radio } from '@nextui-org/react';
import React, { useState } from 'react'

const Sector_Metric_top10 = ({ rank, year }) => {
    // //const currentYear = new Date().getFullYear();
    // const yearlist = [...new Set(rank.map(rank => rank.report_year))]
    // const defaultyear = Math.max(...yearlist);
    // //const [year, setYear] = useState(currentYear);
    // const [innerYear, setYear] = useState(v_year);
    // const year = innerYear ?? defaultyear;

    const [sortOrder, setsortOrder] = useState('top');


    return (
        <div
            className="block rounded-lg bg-white dark:bg-neutral-700 mx-1 my-1">
            <div className="border-b-1 border-neutral-100 py-2 dark:border-neutral-600 dark:text-neutral-50">
                {year}
                <p className="leading-tight text-default-800">
                    <RadioGroup label="" orientation="horizontal" value={sortOrder} className='gap-1' onValueChange={setsortOrder}>
                        <Radio value="top">Top 5</Radio>
                        <Radio value="bottom">Bottom 5</Radio>
                    </RadioGroup>
                </p>
            </div>
            <table className='px-2'>

                <tbody>
                    {sortOrder == 'top' ?
                        rank.filter(rank => rank.report_year == year).sort((a, b) => a.metric_ranking - b.metric_ranking).slice(0, 5).map((rank, i) => (
                            <tr key={i} className="w-full border-b-1 border-neutral-200 dark:border-default-300 border-opacity-500 px-6 py-3 dark:border-opacity-500">
                                <td className='text-sm px-2' width={200}>{rank.company_name}</td>
                                <td className='font-light text-sm'>{rank.formula_type == 'ratio' ? Math.round(rank.metric_value * 100) + "%" : rank.metric_value}</td>
                            </tr>
                        )) :
                        rank.filter(rank => rank.report_year == year).sort((a, b) => b.metric_ranking - a.metric_ranking).slice(0, 5).map((rank, i) => (
                            <tr key={i} className="w-full border-b-1 border-neutral-200 dark:border-default-300 border-opacity-500 px-6 py-3 dark:border-opacity-500">
                                <td className='text-sm px-2' width={200}>{rank.company_name}</td>
                                <td className='font-light text-sm'>{rank.formula_type == 'ratio' ? Math.round(rank.metric_value * 100) + "%" : rank.metric_value}</td>
                            </tr>
                        ))
                    }

                </tbody>

            </table>
        </div >
    )
}

export default Sector_Metric_top10