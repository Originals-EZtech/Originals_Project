import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import moment from 'moment';

// ----------------------------------------------------------------------


export default function AppWebsiteVisits({visitorList,userSignUpList}) {
  const chartData= visitorList;
console.log("visitorList",visitorList)
console.log("userSignUpList",userSignUpList)

  const CHART_DATA = [
    {
      name: 'Team A',
      type: 'column',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    },
    {
      name: '가입자수',
      type: 'area',
      data: [userSignUpList.countA, userSignUpList.countB, userSignUpList.countC, userSignUpList.countD, userSignUpList.countE, userSignUpList.countF, userSignUpList.countG, userSignUpList.countH, userSignUpList.countI, userSignUpList.countJ, userSignUpList.countK]
    },
    {
      name: '방문자수',
      type: 'line',
      data: [chartData.a[0], chartData.b[0], chartData.c[0], chartData.d[0], chartData.e[0], chartData.f[0], chartData.g[0], chartData.h[0], chartData.i[0], chartData.j[0], chartData.k[0]]
    }
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
      <CardHeader title="Website Visits" subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
