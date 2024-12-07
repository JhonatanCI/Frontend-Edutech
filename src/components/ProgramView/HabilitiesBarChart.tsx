import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts";
import React from "react";

type ChartValues = {
    categories: string[],
    max: number
}

interface HabilitiesBarChartProps {
    chartvalues: ChartValues
}

const HabilitiesBarChart: React.FC<HabilitiesBarChartProps> = ({chartvalues}) => {
    const options: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                horizontal: true, // Barra horizontal
                barHeight: '80%', // Ajusta el grosor de las barras
            },
        },
        dataLabels: {
            enabled: true,
        },
        colors: ['#865CF0'], // Fondo gris transparente y barra azul
        xaxis: {
            categories: chartvalues.categories,
            max: chartvalues.max,
            labels: {
                show: false
            },
            title: {
                text: `0 Cantidad de créditos ${chartvalues.max}`,
                offsetY: -18
            }
        },
        tooltip: {
            enabled: false
        },
        grid: {
            show: false,
            borderColor: '#f1f1f1',
        },
        legend: {
            show: false,
        },
    };

    const series = [
        {
            name: 'Actual',
            data: [3, 4, 6, 4, 5, 4, 2, 3], // Valores actuales (barras azules)
        },
    ];


    return (
        <div>
            <ReactApexChart options={options} series={series} type="bar" height={500} />
        </div>
    )
}

export default HabilitiesBarChart