import React, { useRef, useEffect } from 'react';
import { Chart } from "chart.js/auto";
import { useTheme } from "next-themes";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

const Sector_Metric_bargraph = ({ input }) => {
    const sortedData = [...input].sort((a, b) => parseFloat(a.pe_value) - parseFloat(b.pe_value));
    const industryAverage = input[0]?.industry_avg ? parseFloat(input[0].industry_avg) : null;
    const dateUpdated = input[0]?.ddate ? input[0].ddate : null;
    const chartRef = useRef(null);
    //console.log(dateUpdated)
    const { theme } = useTheme();
    const lineColor = theme === 'light' ? "darkblue" : "lightblue";
    const gridColor = theme === 'light' ? "#F4F4F5" : "#27272A";
    const chartHeight = sortedData.length * 10 < 60 ? sortedData.length * 60 : (sortedData.length) * 40;


    useEffect(() => {
        // destroy the chart if already eixsts
        if (chartRef.current) {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy()
            }
        }

        const context = chartRef.current.getContext("2d");
        chartRef.current.style.setProperty("height", `${chartHeight}px`, "important");

        // Initialize Chart.js instance
        const newChart2 = new Chart(context, {
            type: "bar",
            data: {
                labels: sortedData.map((item) => item.company_name),
                datasets: [
                    {
                        label: "P/E Ratio",
                        data: sortedData.map((item) => parseFloat(item.pe_value)),
                        backgroundColor: "rgb(110, 161, 255)",
                    },
                ],
            },
            options: {
                indexAxis: 'y',
                layout: {
                    padding: { right: 100 },
                },
                scales: {
                    x: {
                        ticks: {
                            color: lineColor,
                        },
                        grid: {
                            display: true,
                            color: gridColor,
                        },
                        title: {
                            display: true,
                        },
                    },
                    y: {
                        ticks: {
                            color: lineColor,
                            autoSkip: false,
                        },
                        grid: {
                            display: false,
                        },
                    },
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        animation: false
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
            },
            plugins: [
                {
                    id: 'industryAverageLine',
                    beforeDraw: (chart) => {
                        if (!industryAverage) return;

                        const ctx = chart.ctx;
                        const xScale = chart.scales.x;
                        const xPosition = xScale.getPixelForValue(industryAverage);

                        // Draw vertical line
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(xPosition, chart.chartArea.top);
                        ctx.lineTo(xPosition, chart.chartArea.bottom);
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        ctx.restore();

                        // Draw label for the vertical line
                        ctx.save();
                        ctx.fillStyle = lineColor;
                        ctx.textAlign = 'center';
                        ctx.fillText(`Avg: ${industryAverage.toFixed(2)}`, xPosition, chart.chartArea.top);
                        ctx.restore();
                    },
                },
            ],
        });

        chartRef.current.chart = newChart2;

    });

    return (
        <Card>
            <CardHeader>
                <div className='grid grid-rows-2'>
                    <div className='font-medium'>Price-Earning Ratio</div>
                    <div className='italic text-xs align-bottom'>Data updated as of {dateUpdated}</div>
                </div>
            </CardHeader>
            <CardBody>
                <canvas className="chart-canvas justify-center" ref={chartRef} />
            </CardBody>
        </Card>
    );
};

export default Sector_Metric_bargraph;