import { Table, TableBody, TableCell, TableColumn, TableRow } from '@nextui-org/react';
import React, { useState } from 'react'

const Company_Metric_ranking = ({ rank, sector }) => {
    const currentYear = new Date().getFullYear();
    const yearlist = [...new Set(rank.map(rank => rank.report_year))]
    const defaultyear = Math.max(...yearlist);
    //console.log(defaultyear)
    const [innerYear, setYear] = useState();
    const year = innerYear ?? defaultyear;
    //console.log(sector)
    //const companyCount = sector.filter(sector => sector["report_year"] == year)
    //console.log(companyCount)
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
                    <tr>
                        <td>Year</td>
                        <td>Value</td>
                        <td></td>
                        <td>Rank</td>
                    </tr>
                    {rank.map((r, i) => (
                        <tr key={i} className="w-full border-b-1 border-neutral-200 dark:border-default-300 border-opacity-500 px-6 py-3 dark:border-opacity-500">
                            <td className='text-sm px-2' width={40}>{r.report_year}</td>
                            <td className='text-sm px-2' width={60}>{r.formula_type == 'ratio' ? Math.round(r.metric_value * 100) + "%" : r.metric_value}</td>
                            <td>{r.metric_ranking <= 3 ? "🟢" : ""}
                                {sector.filter(sector => sector["metric_name"] == r.metric_name).length == 0 ?
                                    "" : (r.metric_ranking >= sector.filter(sector => sector["metric_name"] == r.metric_name)[i].company_count - 3 && r.metric_ranking > 3 ? "🔻" : "")}</td>
                            <td className='font-light text-sm'>{r.metric_ranking}/{sector.filter(sector => sector["metric_name"] == r.metric_name).length == 0 ? "" : sector.filter(sector => sector["metric_name"] == r.metric_name && sector['report_year'] == r.report_year)[0].company_count}</td>


                        </tr>
                    ))}
                </tbody>

            </table>
        </div >
    )
}

export default Company_Metric_ranking