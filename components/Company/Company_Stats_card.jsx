import React, { useState } from 'react'
import { Card, CardBody, ListboxItem, Listbox, CardHeader, Link } from '@nextui-org/react'
import Company_Stats_statement from './Company_Stats_statement'
import Company_Stats_realtime from './Company_Stats_realtime'

const Company_Stats = ({ input, overview }) => {
    //const currentYear = new Date().getFullYear();
    const yearlist = [...new Set(input.map(input => input["a.report_year"]))]
    const defaultyear = Math.max(...yearlist);
    const [year, setYear] = useState(defaultyear);

    const statement = input.filter(input => input["a.report_year"] == year)
    //console.log(input.filter(input => input["a.report_year"] == year))

    return (
        <div className="mx-1">
            <Card>
                <CardHeader className='font-medium '>Detailed Stats
                </CardHeader>
                <CardBody>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='grid grid-cols'>
                            <Company_Stats_realtime overview={overview}></Company_Stats_realtime></div>
                        <div className='grid grid-cols'>
                            <Company_Stats_statement input={input}></Company_Stats_statement></div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default Company_Stats