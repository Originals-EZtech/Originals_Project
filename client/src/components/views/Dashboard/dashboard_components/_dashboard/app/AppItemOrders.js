import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------


export default function AppItemOrders(roomCount) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={homeFill} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{roomCount.roomCount }개</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        누적 교육장 생성량
      </Typography>
    </RootStyle>
  );
}
