import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../dashboard_util/formatNumber';
//
import { BaseOptionChart } from '../../charts';
import moment from 'moment';

// ----------------------------------------------------------------------


export default function AppConversionRates(roomList) {
  const chartData= roomList.roomList;
  const CHART_DATA = [{ data: [chartData.roomB, chartData.roomC, chartData.roomD, chartData.roomE, chartData.roomF, chartData.roomG, chartData.roomH, chartData.roomI, chartData.roomJ, chartData.roomK] }];


  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => '교육장 개설수'
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: [
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
      ]
    }
  });

  return (
    <Card>
      <CardHeader title="Activation Rates" subheader="일일 교육장 생성수" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
