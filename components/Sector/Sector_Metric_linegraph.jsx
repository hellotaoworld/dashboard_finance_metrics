import { Chart } from "chart.js/auto"
import React, { useRef, useEffect } from 'react'
import { useTheme } from "next-themes"

const Sector_Metric_linegraph = ({ input, metric }) => {
    const chartRef = useRef(null)

    const { theme, setTheme } = useTheme()
    const lineColor = theme == 'light' ? "darkblue" : "lightblue";
    const gridColor = theme == 'light' ? "#F4F4F5" : "#27272A";

    useEffect(() => {
        // destroy the chart if already eixsts
        if (chartRef.current) {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy()
            }
        }
        const context = chartRef.current.getContext("2d");



        const newChart = new Chart(context, {
            type: "line",
            data: {
                labels: Object.keys(input),
                datasets: [
                    {
                        label: "Metric",
                        data: Object.values(input),
                        backgroundColor: lineColor,
                        borderColor: lineColor,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            color: lineColor,
                        },
                        grid: {
                            display: false,
                            color: gridColor
                        }
                    }
                    ,
                    y: {
                        suggestedMin: -1,
                        suggestedMax: 1,
                        ticks: {
                            color: lineColor,
                            format: {
                                style: 'percent',
                                maximumSignificantDigits: 2

                            },
                        },
                        grid: {
                            display: false,
                            color: gridColor
                        },
                    },


                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                responsive: true
            }
        })
        chartRef.current.chart = newChart
    })

    return (
        <canvas ref={chartRef} />
    )
}

export default Sector_Metric_linegraph