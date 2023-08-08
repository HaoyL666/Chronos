import React, { useState } from 'react';
import { all, solo as soloStyle } from './sizeSwitch';

interface EventChartProps {
    parsedName: string;
}

interface SoloStyles {
    height: number;
    width: number;
}

type PlotlyData = {
    name: string;
    x: string[];
    y: string[];
    type: string;
    mode: string;
    marker: { colors: string[] };
};

/** 
 * @params {EventChartProps} props - the props object containing relevant data.
 * @desc Handles k8s metrics. Memoized component to generate event chart with formatted data 
 * @returns {JSX.Element} The JSX element with the event chart.
 */
const GrafanaEventChart: React.FC<EventChartProps> = React.memo(props => {
    const { parsedName } = props;
    const [solo, setSolo] = useState<SoloStyles | null>(null);

    setInterval(() => {
        if (solo !== soloStyle) {
            setSolo(soloStyle);
        }
    }, 20);

    // makes time data human-readable, and reverses it so it shows up correctly in the graph
    //   const prettyTimeInReverse = (timeArray: string[]): string[] => {
    //     return timeArray.map((el: any) => moment(el).format('kk:mm:ss')).reverse();
    //   };

    //   // removes underscores from metric names to improve their look in the graph
    //   const prettyMetricName = (metricName: string): string => {
    //     const newName = metricName.replace(/kubernetes-cadvisor\/docker-desktop\//g, '');
    //     return newName.replace(/_/g, ' ');
    //   };

    //   const createChart = () => {
    //     const prettyName = prettyMetricName(metricName);
    //     const prettyTime = prettyTimeInReverse(chartData.time);

    //     const plotlyDataObject: PlotlyData = {
    //       name: prettyName,
    //       x: prettyTime,
    //       y: chartData.value,
    //       type: 'scattergl',
    //       mode: 'lines',
    //       marker: {
    //         colors: ['#fc4039', '#4b54ea', '#32b44f', '#3788fc', '#9c27b0', '#febc2c'],
    //       },
    //     };
    //     const sizeSwitch = sizing === 'all' ? all : solo;

    //     return (
    //       <Plot
    //         data={[plotlyDataObject]}
    //         config={{ displayModeBar: true }}
    //         layout={{
    //           title: prettyName,
    //           ...sizeSwitch,
    //           font: {
    //             color: '#444d56',
    //             size: 11.5,
    //             family: 'Roboto',
    //           },
    //           paper_bgcolor: 'white',
    //           plot_bgcolor: 'white',
    //           showlegend: true,
    //           legend: {
    //             orientation: 'v',
    //           },
    //           xaxis: {
    //             title: 'Time',
    //             tickmode: 'auto',
    //             tick0: 0,
    //             dtick: 10,
    //             rangemode: 'nonnegative',
    //             mirror: false,
    //             ticks: 'outside',
    //             showline: true,
    //           },
    //           yaxis: {
    //             rangemode: 'nonnegative',
    //             title: prettyName,
    //           },
    //         }}
    //       />
    //     );
    //   };


    return (
        <div className="chart" data-testid="Event Chart">
            {/* create chart using grafana */}
            <iframe src='http://localhost:32000/d-solo/${parsedName}/${parsedName}?orgId=1&refresh=10s&from=1691451277822&to=1691472877822&panelId=1' width="450" height="200" ></iframe>
        </div>
    );
});

export default GrafanaEventChart;
