import { RouteObject, Navigate } from 'react-router-dom';

import Routes from '@/constants/routes';

import Main from '@/layout/Main';

import Calendar from '@/views/Calendar';
import EventRecords from '@/views/EventRecords';

const routes: RouteObject[] = [
  {
    path: Routes.CALENDAR,
    element: <Main></Main>,
    children: [
      {
        index: true,
        element: <Calendar></Calendar>,
      },
    ],
  },
  {
    path: Routes.EVENT_RECORDS,
    element: <Main></Main>,
    children: [
      {
        index: true,
        element: <EventRecords></EventRecords>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={Routes.CALENDAR}></Navigate>,
  },
];

export default routes;
