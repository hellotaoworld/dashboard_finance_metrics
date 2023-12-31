import { Table, TableBody, TableCell, TableColumn, TableRow } from '@nextui-org/react';
import React, { useState } from 'react'

const Company_Metric_ranking = ({ rank, sectorinput }) => {
    //const currentYear = new Date().getFullYear();
    const yearlist = [...new Set(rank.map(rank => rank.report_year))]
    const defaultyear = Math.max(...yearlist);
    const [year, setYear] = useState(defaultyear);

    return (
        <div
            className="block rounded-lg bg-white dark:bg-neutral-700 mx-1 my-1">
            <div className="border-b-1 border-neutral-100 py-2 dark:border-neutral-600 dark:text-neutral-50">
                <p className="leading-tight text-default-800">
                    <select value={year} onChange={(e) => { setYear(e.target.value) }}>
                        {yearlist.map((y, i) => (
                            <option key={i}>{y}</option>
                        ))}
                    </select></p>
            </div>
            <table className='px-2'>
                <tbody>
                    {rank.filter(rank => rank.report_year == year).sort((a, b) => b.metric_value - a.metric_value).slice(0, 5).map((rank, i) => (
                        <tr key={i} className="w-full border-b-2 border-neutral-100 border-opacity-100 px-6 py-3 dark:border-opacity-50">
                            <td className='text-sm px-2' width={150}></td>
                            <td className='font-light text-sm float-right'></td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div >
    )
}

export default Company_Metric_ranking