import React from 'react';
import { RadialChart, LabelSeries } from 'react-vis';
import './radialChartSenadores.css'

const RChart = (props) => {
  console.log(props);
  return (
    <div className="chart-div">
      <RadialChart className="radial-chart" 
      innerRadius={50} radius={120}
      onValueClick={props.handleChartClick}
      data={props.data}
      width={300}
      height={300}
      padAngle={0.04}
      center={{x: 0, y: 0}}>
      <LabelSeries data={[{x: 0, y: 0, yOffset: 8, xOffset: 2, label: `${props.centerInfo}`, style:{textAnchor: 'middle'}}]} />
      </RadialChart>
      <ul className="legenda-chart">
        {props.data.map(dp => {
          console.log(dp.angle, props.total)
          return <li style={{color: dp.style.fill, listStyle: 'none' }}>{dp.subLabel} - {`${(Number((dp.angle / props.total)) * 100).toFixed(2)}%`}</li> 
        })}
      </ul>
    </div>
  );
}

export default RChart;