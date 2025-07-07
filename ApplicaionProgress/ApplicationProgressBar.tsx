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
        chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about three' },
        chartDataAccessibilityData: { ariaLabel: 'Data 8888 of 15000' },
        chartData: [
          {
            legend: stageName,
            horizontalBarChartdata: { x: xVal, y: yVal},
            color: getColorFromToken(DataVizPalette.color11, isDarkMode),
            xAxisCalloutData: xVal+'%',
            yAxisCalloutData: stageName,
            //callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart three 2021/06/12 59%' },
          },
        ],
      },
    ];
  };

  return (
    <div className="containerDiv" style={{ maxWidth: 600 }}>
      <HorizontalBarChart data={getData(theme?.isInverted ?? false, props.y, props.x, props.stageName)} />
    </div>
  );
};