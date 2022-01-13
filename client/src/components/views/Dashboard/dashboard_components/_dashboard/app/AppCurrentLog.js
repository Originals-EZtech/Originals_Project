import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import moment from 'moment';

// ----------------------------------------------------------------------


export default function AppCurrentLog() {

  const CHART_DATA = [
    // {
    //   name: '방 개설수',
    //   type: 'column',
    //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    // },
    {
      name: '가입자수',
      type: 'column',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    },
    // {
    //   name: '방문자수',
    //   type: 'area',
    //   data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    // }
  ];

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      moment().add(-10, 'days').format('MMM/DD'),
      moment().add(-9, 'days').format('MMM/DD'),
      moment().add(-8, 'days').format('MMM/DD'),
      moment().add(-7, 'days').format('MMM/DD'),
      moment().add(-6, 'days').format('MMM/DD'),
      moment().add(-5, 'days').format('MMM/DD'),
      moment().add(-4, 'days').format('MMM/DD'),
      moment().add(-3, 'days').format('MMM/DD'),
      moment().add(-2, 'days').format('MMM/DD'),
      moment().add(-1, 'days').format('MMM/DD'),
      moment().format('MMM/DD')
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Website Visits" subheader="Error Log Monitoring" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
