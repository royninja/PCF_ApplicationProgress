import * as React from 'react';
import { HorizontalBarChart, IChartProps, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';
import { ThemeContext } from '@fluentui/react';

export interface IApplicationProgressBarProps{
 stageName: string;
 x: number;
 y: number;
}

export const ApplicationProgress: React.FunctionComponent<IApplicationProgressBarProps> = (props) => {
  const theme = React.useContext(ThemeContext);

  const getData = (isDarkMode: boolean, yVal : number, xVal: number, stageName: string): IChartProps[] => {
    return [
      {
        chartTitle: stageName,
        chartData: [
          {
            legend: stageName,
            horizontalBarChartdata: { x: xVal, y: yVal},
            color: getColorFromToken(DataVizPalette.color11, isDarkMode),
            xAxisCalloutData: xVal+'%',
            yAxisCalloutData: stageName,
          },
        ],
      },
    ];
  };

  return (
    <div className="containerDiv" style={{ maxWidth: 600 }}>
      <HorizontalBarChart data={getData(theme?.isInverted ?? false, props.y, parseFloat(props.x.toFixed(2)), props.stageName)} />
    </div>
  );
};