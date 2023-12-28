import React from 'react'
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/react";

const Sector_Metric_detailtable = ({ sectorDetails }) => {
    return (
        <Table aria-label="Sector Details">
            <TableHeader>
                <TableColumn>Report Year</TableColumn>
                <TableColumn>Company Count</TableColumn>
                <TableColumn>AVG Revenue Growth</TableColumn>
                <TableColumn>AVG Return on Invested Capital</TableColumn>
                <TableColumn>AVG EPS Growth</TableColumn>
                <TableColumn>AVG Adjusted Equity Growth</TableColumn>
            </TableHeader>
            <TableBody>
                {sectorDetails.map((value, i) => (
                    <TableRow key={i}>
                        <TableCell>{value.report_year}</TableCell>
                        <TableCell>{value.count_company}</TableCell>
                        <TableCell>{value.avg_revenue_grwoth}</TableCell>
                        <TableCell>{value.avg_return_on_invested_capital_rate}</TableCell>
                        <TableCell>{value.avg_eps_growth_rate}</TableCell>
                        <TableCell>{value.avg_adj_equity_growth_rate}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default Sector_Metric_detailtable