import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea
} from 'recharts';

interface DataPoint {
  time: string;
  amplitude: number;
}

interface WaveformChartProps {
  data: DataPoint[];
  seizureIntervals?: { start: string; end: string }[];
}

export const WaveformChart = ({ data, seizureIntervals }: WaveformChartProps) => {
  return (
    <div className="w-full h-[400px] bg-white">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12, fill: '#64748b' }} 
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={false}
          />
          <YAxis 
            hide={true} 
            domain={['dataMin - 10', 'dataMax + 10']}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#5FA8D3' }}
          />
          
          {seizureIntervals?.map((interval, index) => (
             // Using string keys for XAxis requires using the index or exact matching string.
             // For simplicity in this mock, we assume the data keys match exactly or we rely on the index if data was numeric.
             // Given 'time' is a string label, ReferenceArea matches on index if x values are not numbers.
             // However, for robust string matching, Recharts handles it if it matches the tick.
             // Let's assume passed intervals match data points.
            <ReferenceArea
              key={index}
              x1={interval.start}
              x2={interval.end}
              fill="rgba(245, 158, 11, 0.15)"
              strokeOpacity={0.3}
            />
          ))}

          <Line
            type="monotone"
            dataKey="amplitude"
            stroke="#5FA8D3"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
