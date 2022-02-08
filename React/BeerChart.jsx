import React from "react";
import Chart from "react-apexcharts";
import PropTypes from "prop-types";

function BeerChart(props) {
  const chartData = props.chartProp;
  const chartXaxis = props.xaxisProp;
  console.log("Charting Data:", chartData);

  const options = {
    xaxis: {
      categories: chartXaxis.categories,
      title: {
        text: "Year",
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
      title: {
        text: "Drinkers",
      },
      min: 0,
    },
    chart: {
      type: "area",
      stacked: false,
      height: 1000,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: false,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    stroke: {
      curve: "straight",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.75,
        stops: [20, 100, 100, 100],
      },
    },
    title: {
      text: "Market Share in Time Series",
      align: "left",
      offsetX: 40,
    },
    tooltip: {
      shared: true,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetX: -10,
    },
  };

  const mapChartData = function (singleSeries) {
    return {
      name: singleSeries.name,
      data: singleSeries.data,
    };
  };

  const series = chartData.map(mapChartData);

  return (
    <>
      <Chart options={options} series={series} type="area" />
    </>
  );
}

BeerChart.propTypes = {
  chartProp: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      data: PropTypes.array,
    })
  ),
  xaxisProp: PropTypes.shape({
    categories: PropTypes.array,
  }),
};

export default BeerChart;
