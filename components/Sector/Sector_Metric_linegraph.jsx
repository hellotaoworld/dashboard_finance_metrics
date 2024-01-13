import { Chart } from "chart.js/auto"
import React, { useRef, useEffect } from 'react'
import { useTheme } from "next-themes"

const Sector_Metric_linegraph = ({ input, type }) => {
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
                        label: "Sector Average",
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

                        ticks: {
                            color: lineColor,
                            format: {

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
                responsive: true,
                //maintainAspectRatio: false,
            }
        })
        chartRef.current.chart = newChart
    })

    return (
        <canvas className="chart-canvas" ref={chartRef} />
    )
}

export default Sector_Metric_linegraph