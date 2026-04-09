import React from 'react'

const Company_Metric_ranking = ({ rank, sector }) => {
    return (
        <div
            className="block rounded-lg bg-white dark:bg-neutral-700 mx-1 my-1">
            <div className="border-b-1 border-neutral-100 py-2 dark:border-neutral-600 dark:text-neutral-50">
                <p className="leading-tight text-default-800">
                    Sector Ranking
                </p>
            </div>
            <table className='px-2'>
                <tbody>
                    <tr>
                        <td>Period</td>
                        <td>Value</td>
                        <td></td>
                        <td>Rank</td>
                    </tr>
                    {rank.map((r, i) => {
                        const periodLabel = r.report_quarter
                            ? `${r.report_year} ${r.report_quarter}`
                            : r.report_year;
                        const sectorRows = sector.filter(s => s.metric_name == r.metric_name);
                        const sectorRow = r.report_quarter
                            ? sectorRows.find(s => s.report_year == r.report_year && s.report_quarter == r.report_quarter)
                            : sectorRows.find(s => s.report_year == r.report_year);
                        const companyCount = sectorRow ? sectorRow.company_count : '';
                        return (
                            <tr key={i} className="w-full border-b-1 border-neutral-200 dark:border-default-300 border-opacity-500 px-6 py-3 dark:border-opacity-500">
                                <td className='text-sm px-2' width={60}>{periodLabel}</td>
                                <td className='text-sm px-2' width={60}>{r.formula_type == 'ratio' ? Math.round(r.metric_value * 100) + "%" : r.metric_value}</td>
                                <td>{r.metric_ranking <= 3 ? "🟢" : ""}
                                    {companyCount && r.metric_ranking >= companyCount - 3 && r.metric_ranking > 3 ? "🔻" : ""}
                                </td>
                                <td className='font-light text-sm'>{r.metric_ranking}/{companyCount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default Company_Metric_ranking
