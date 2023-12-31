import React, { useState } from 'react'
import { Card, CardBody, ListboxItem, Listbox, CardHeader, Link } from '@nextui-org/react'

const Company_Statement = ({ input }) => {
    //const currentYear = new Date().getFullYear();
    const yearlist = [...new Set(input.map(input => input["a.report_year"]))]
    const defaultyear = Math.max(...yearlist);
    const [year, setYear] = useState(defaultyear);

    const statement = input.filter(input => input["a.report_year"] == year)
    //console.log(input.filter(input => input["a.report_year"] == year))

    return (
        <div className="flex w-full flex-col mx-1">
            <Card>
                <CardHeader className='font-medium '>Financial Statement, Year
                    <select value={year} className='mx-1' onChange={(e) => { setYear(e.target.value) }}>
                        {yearlist.map((y, i) => (
                            <option key={i} value={y}>{y}</option>
                        ))
                        }
                    </select>
                </CardHeader>
                <CardBody>
                    <ul className='list-none mx-2'>
                        {statement.map((record, k) => (
                            <li key={k}>
                                <p className=''>
                                    {record["a.report_year"]}&nbsp;
                                    {record["a.report_period"] == "FY" ? "Fiscal Year" : record["a.report_period"]}
                                    <span className='mx-1 text-default-500 font-light text-xs'> Report Date: {record.report_date}</span>

                                </p>
                                <p>
                                    <span className='mx-1'>
                                        <Link isBlock showAnchorIcon href={record["a.url_bs"]} target='_new' color="foreground" className='text-sm text-default-700'>Balance Sheet</Link>
                                    </span>
                                    <span className='mx-1'>
                                        <Link isBlock showAnchorIcon href={record["a.url_bs"]} target='_new' color="foreground" className='text-sm text-default-700'>Income Statement</Link>
                                    </span>
                                    <span className='mx-1 text-sm'>
                                        <Link isBlock showAnchorIcon href={record["a.url_bs"]} target='_new' color="foreground" className='text-sm text-default-700'>Cashflow Statement</Link>
                                    </span>
                                </p>
                            </li>
                        ))

                        }
                    </ul>

                </CardBody>
            </Card>
        </div>
    )
}

export default Company_Statement