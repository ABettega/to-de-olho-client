import React from 'react';
import { RadialChart, LabelSeries } from 'react-vis';
import './radialChartSenadores.css'

const RChart = (props) => {
  return (
    <div>
      <RadialChart className="radial-chart" 
      innerRadius={40} radius={80} showLabels={false}
      onValueClick={(dp, e) => props.handleChartClick(dp, props.legis)}
      data={props.data}
      labelsRadiusMultiplier={1.6}
      width={250}
      height={300}
      padAngle={0.04}
      center={{x: 0, y: 0}}>
      <LabelSeries data={[{x: 0, y: 0, yOffset: 8, xOffset: 2, label: `${props.centerInfo}`, style:{textAnchor: 'middle'}}]} />
      </RadialChart>
      <ul className="legenda-chart">
        {props.data.map((dp, idx) => {
          return <li key={idx} style={{color: dp.style.fill, listStyle: 'none' }}>{dp.subLabel} - {`${(Number((dp.angle / props.total)) * 100).toFixed(2)}%`}</li> 
        })}
      </ul>
  </div>
  );
}

export default RChart;