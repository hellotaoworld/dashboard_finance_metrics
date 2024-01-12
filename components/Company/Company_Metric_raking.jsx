import { Table, TableBody, TableCell, TableColumn, TableRow } from '@nextui-org/react';
import React, { useState } from 'react'

const Company_Metric_ranking = ({ rank }) => {
    const currentYear = new Date().getFullYear();
    const yearlist = [...new Set(rank.map(rank => rank.report_year))]
    const defaultyear = Math.max(...yearlist);
    //console.log(defaultyear)
    const [innerYear, setYear] = useState();
    const year = innerYear ?? defaultyear;
    //console.log(rank)


    return (
        <div
            className="block rounded-lg bg-white dark:bg-neutral-700 mx-1 my-1">
            <div className="border-b-1 border-neutral-100 py-2 dark:border-neutral-600 dark:text-neutral-50">
                <p className="leading-tight text-default-800">
                    { /*<select value={year} onChange={(e) => { setYear(e.target.value) }}>
                        {yearlist.map((y, i) => (
                            <option key={i}>{y}</option>
                        ))}
                    </select>
                        */}
                    Sector Ranking
                </p>
            </div>
            <table className='px-2'>
                <tbody>
                    {rank.map((rank, i) => (
                        <tr key={i} className="w-full border-b-1 border-neutral-200 dark:border-default-300 border-opacity-500 px-6 py-3 dark:border-opacity-500">
                            <td className='text-sm px-2' width={40}>{rank.report_year}</td>
                            <td className='text-sm px-2' width={70}>{rank.formula_type == 'ratio' ? Math.round(rank.metric_value * 100) + "%" : rank.metric_value}</td>
                            <td className='font-light text-sm'>Rank {rank.metric_ranking}</td>
                            <td className='font-light text-sm'>out of 16</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div >
    )
}

export default Company_Metric_ranking