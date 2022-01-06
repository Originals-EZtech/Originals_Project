import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import moment from 'moment';

// ----------------------------------------------------------------------


export default function AppWebsiteVisits(visitorList) {
  
  const CHART_DATA = [
    {
      name: 'Team A',
      type: 'column',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    },
    {
      name: 'Team B',
      type: 'area',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    },
    {
      name: 'Team C',
      type: 'line',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }
  ];
  // const teste = visitorList.visitorList[0];
  console.log("어떰?",visitorList.visitorList)
  const nowTime = moment().format('MM/DD/YYYY');
  console.log("nowTime : ", nowTime);

  console.log("nowTime : ", nowTime);

  // console.log("어떰?",visitorList.visitorList[0].CREATEDATE)
  
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      '12/27/2021',
      '12/28/2021',
      '12/29/2021',
      '12/30/2021',
      '12/31/2021',
      '01/01/2022',
      '01/02/2022',
      '01/03/2022',
      '01/04/2022',
      '01/05/2022',
      nowTime
    ],
    // xaxis: { type: 'datetime' },
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
