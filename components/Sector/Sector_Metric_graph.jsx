import { Chart } from "chart.js/auto"
import React, { useRef, useEffect } from 'react'

const Sector_Metric_graph = ({ input, metric }) => {
    const chartRef = useRef(null)

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
                        backgroundColor: "blue",
                        borderColor: "blue",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        type: "category"
                    },
                    y: {
                        suggestedMin: -1,
                        suggestedMax: 1
                    }
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
        <div className="GraphWrapper" style={{ position: "relative", width: "200vw", height: "60vh" }}>
            <canvas ref={chartRef} />
        </div>
    )
}

export default Sector_Metric_graph