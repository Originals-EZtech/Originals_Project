import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------


export default function AppWeeklySales(usersTotal) {

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={peopleFill} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{usersTotal.usersTotal.total}명</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        누적 가입 유저수
      </Typography>
    </RootStyle>
  );
}