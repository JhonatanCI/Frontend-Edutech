import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts";
import React from "react";
import { ChartValues } from "../../consts/types.d";

interface HabilitiesBarChartProps {
    chartvalues: ChartValues,
    data: number[]
}

const HabilitiesBarChart: React.FC<HabilitiesBarChartProps> = ({chartvalues, data}) => {
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
            enabled: false,
        },
        colors: ['#865CF0'], // Fondo gris transparente y barra azul
        xaxis: {
            categories: chartvalues.categories,
            max: chartvalues.max,
            labels: {
                show: false
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
            data: data,
        },
    ];


    return (
        <div>
            <ReactApexChart options={options} series={series} type="bar" height={500} />
        </div>
    )
}

export default HabilitiesBarChart