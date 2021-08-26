/**
 *
 * StockGraph
 *
 */
import * as React from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectStockHistoricalData } from '../../slice/selectors';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData, Interaction } from 'chart.js';
import { CrosshairPlugin, Interpolate } from 'chartjs-plugin-crosshair';
import { StockHistoricalData } from '../../slice/types';
import { useTheme } from 'styled-components';
import { usePrevious } from 'app/hooks/usePrevious';

Interaction.modes.interpolate = Interpolate;
declare module 'chart.js' {
  interface InteractionModeMap {
    interpolate: 'interpolate';
  }

  interface ControllerDatasetOptions {
    interpolate?: boolean;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PluginOptionsByType<TType extends ChartType> {
    crosshair?: CrosshairOptions;
  }
}

export interface CrosshairOptions {
  line?: CrosshairLineOptions;
  sync?: CrosshairSyncOptions;
  zoom?: CrosshairZoomOptions;
  snap?: CrosshairSnapOptions;
  callbacks?: CrosshairCallbackOptions;
}

export interface CrosshairLineOptions {
  color?: string;
  width?: number;
  dashPattern?: number[];
}

export interface CrosshairSyncOptions {
  enabled?: boolean;
  group?: number;
  suppressTooltips?: boolean;
}

export interface CrosshairZoomOptions {
  enabled?: boolean;
  zoomboxBackgroundColor?: string;
  zoomboxBorderColor?: string;
  zoomButtonText?: string;
  zoomButtonClass?: string;
}

export interface CrosshairSnapOptions {
  enabled?: boolean;
}

export interface CrosshairCallbackOptions {
  beforeZoom?: (start: number, end: number) => boolean;
  afterZoom?: (start: number, end: number) => void;
}

interface Props {}

export const StockGraph = React.memo((props: Props) => {
  const stockHistoricalData = useSelector(selectStockHistoricalData);
  const theme = useTheme();
  const previousTheme = usePrevious(theme);
  const disableAnimation = theme !== previousTheme;

  const _parseHistoricalClose = (historical: StockHistoricalData[] | null) => {
    return (
      historical?.map(item => {
        return { x: Date.parse(item.timestamp).valueOf(), y: item.close };
      }) || []
    );
  };

  const _isNegative = (historical: StockHistoricalData[] | null): boolean => {
    if (!historical || !historical.length) return false;
    return historical[0].close < historical[historical.length - 1].close;
  };

  const _buildGraphData = (
    historical: StockHistoricalData[] | null,
  ): ChartData => {
    if (!historical) return { datasets: [] };

    return {
      //labels: _parseHistoricalLabels(historical),
      datasets: [
        {
          label: '',
          fill: false,
          tension: 0.15,
          backgroundColor: _isNegative(historical)
            ? theme.palette.success.main
            : theme.palette.error.main,
          borderColor: _isNegative(historical)
            ? theme.palette.success.main
            : theme.palette.error.main,
          borderWidth: 2,
          data: _parseHistoricalClose(historical),
          interpolate: true,
        },
      ],
    };
  };

  const _buildGraphOptions = (): ChartOptions => {
    return {
      animation: disableAnimation ? false : {},
      scales: {
        x: {
          type: 'time', // 'timeseries'
          position: 'bottom',
          ticks: {
            display: false,
            source: 'data',
            autoSkip: true,
            autoSkipPadding: 5,
          },
          time: {
            tooltipFormat: 'EEEEEE MMM dd yyyy',
          },
          grid: {
            drawBorder: false,
            display: false,
          },
        },
        y: {
          type: 'linear',
          position: 'left',
          ticks: {
            display: false,
          },
          grid: {
            drawBorder: false,
            display: false,
          },
        },
      },
      //suppressTooltips: true,
      //maintainAspectRatio: true,
      responsive: true, // Resizes the chart canvas when its container does
      plugins: {
        crosshair: {
          line: {
            color: '#F66', // Crosshair line color
            width: 1, // Crosshair line width
            //dashPattern: [5, 5], // Crosshair line dash pattern
          },
          zoom: {
            enabled: false, // Enables zooming
          },
        },
        tooltip: {
          // Defines tooltips appearing on the chart
          mode: 'interpolate',
          //intersect: false, // Specifies if the tooltip mode applies when the mouse position intersets with an element or all times
          callbacks: {
            // Defines tooltip callbacks
            title: function (a) {
              // Returns text to render as the title of the tooltip
              return format(a[0].element.x, 'MMM dd yyyy p');
            },
            label: function (d) {
              // Returns text to render for an individual item in the tooltips
              return (
                // d.chart.data.datasets[d.datasetIndex].label +
                // ': ' +
                d.element.y.toFixed(2)
              );
            },
          },
        },
        legend: {
          // Defines the legend appearing on the chart
          display: false, // Specifies if the legend is shwon
          position: 'right', // Specifies the position of the legend
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    };
  };

  const graphData = _buildGraphData(stockHistoricalData);
  const graphOptions = _buildGraphOptions();

  return (
    <Line
      data={graphData}
      height={75}
      options={graphOptions}
      plugins={[CrosshairPlugin]}
    />
  );
});
