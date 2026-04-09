import { RadioGroup, Radio } from '@nextui-org/react';
import React, { useState } from 'react'

const Sector_Metric_top10 = ({ rank, year, quarter }) => {
    const [sortOrder, setsortOrder] = useState('top');

    const periodLabel = quarter ? `${year} ${quarter}` : year;
    const filtered = rank.filter(r =>
        String(r.report_year) === String(year) &&
        (!quarter || r.report_quarter === quarter)
    );

    return (
        <div
            className="block rounded-lg bg-white dark:bg-neutral-700 mx-1 my-1">
            <div className="border-b-1 border-neutral-100 py-2 dark:border-neutral-600 dark:text-neutral-50">
                {periodLabel}
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
                        filtered.sort((a, b) => a.metric_ranking - b.metric_ranking).slice(0, 5).map((r, i) => (
                            <tr key={i} className="w-full border-b-1 border-neutral-200 dark:border-default-300 border-opacity-500 px-6 py-3 dark:border-opacity-500">
                                <td className='text-sm px-2' width={200}>{r.company_name}</td>
                                <td className='font-light text-sm'>{r.formula_type == 'ratio' ? Math.round(r.metric_value * 100) + "%" : r.metric_value}</td>
                            </tr>
                        )) :
                        filtered.sort((a, b) => b.metric_ranking - a.metric_ranking).slice(0, 5).map((r, i) => (
                            <tr key={i} className="w-full border-b-1 border-neutral-200 dark:border-default-300 border-opacity-500 px-6 py-3 dark:border-opacity-500">
                                <td className='text-sm px-2' width={200}>{r.company_name}</td>
                                <td className='font-light text-sm'>{r.formula_type == 'ratio' ? Math.round(r.metric_value * 100) + "%" : r.metric_value}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}

export default Sector_Metric_top10