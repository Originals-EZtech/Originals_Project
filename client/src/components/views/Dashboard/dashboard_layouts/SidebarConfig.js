import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Statistics',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Approve User',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'User Log',
    path: '/dashboard/userlog',
    icon: getIcon(peopleFill)
  }
];

export default sidebarConfig;
