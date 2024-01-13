import React, { useState } from 'react'
import {
    Table, TableHeader, TableBody, TableColumn, TableRow, TableCell
} from "@nextui-org/react";

const Sector_Metric_detailtable = ({ metricList, sectorDetails }) => {
    //console.log(metricList)
    //const [metricGroup, setmetricGroup] = useState("Key Ratio");
    //console.log(metricList.filter(metricList => metricList.formula_category == metricGroup))
    return (
        <div>
            <Table aria-label="Sector Details">
                <TableHeader>
                    <TableColumn>Report Year</TableColumn>
                    <TableColumn>Company Count</TableColumn>
                    <TableColumn>Metric Group</TableColumn>
                    <TableColumn>Metric Name</TableColumn>
                    <TableColumn>Metric Average</TableColumn>
                </TableHeader>
                <TableBody>
                    {sectorDetails.map((value, i) => (
                        <TableRow key={i}>
                            <TableCell>{value.report_year}</TableCell>
                            <TableCell>{value.company_count}</TableCell>
                            <TableCell>{value.formula_category}</TableCell>
                            <TableCell>{value.formula_name}</TableCell>
                            <TableCell>{value.avg}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Sector_Metric_detailtable