import React from 'react';
import { RadialChart, LabelSeries } from 'react-vis';

const RChart = (props) => {
  console.log(props);
  return (
    <RadialChart className="radial-chart" 
    innerRadius={40} radius={80} showLabels={true}
    onValueClick={props.handleChartClick}
    data={props.data}
    labelsRadiusMultiplier={1.6}
    width={300}
    height={300}
    padAngle={0.04}
    center={{x: 0, y: 0}}>
      <LabelSeries data={[{x: 0, y: 0, yOffset: 8, xOffset: 2, label: `${props.centerInfo}`, style:{textAnchor: 'middle'}}]} />
    </RadialChart>
  );
}

export default RChart;