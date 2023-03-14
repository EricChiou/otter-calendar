import { FunctionComponent, ReactNode, useEffect, PropsWithChildren } from 'react';
import { RouteObject, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectUser, setPrevPath } from '@/store/user.slice';

import Routes from '@/constants/routes';

import Main from '@/layout/Main';

import Login from '@/views/Login';
import Calendar from '@/views/Calendar';
import EventRecords from '@/views/EventRecords';
import TripNote from '@/views/TripNote';
import Setting from '@/views/Setting';

export const InterceptorRouter: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.login && location.pathname !== Routes.LOGIN) {
      dispatch(setPrevPath(location.pathname));
      navigate(Routes.LOGIN, { replace: true });
    }
    if (user.login && location.pathname === Routes.LOGIN) {
      navigate(user.prevPath || Routes.CALENDAR, { replace: true });
    }
  }, [location, user]);

  function renderView(): ReactNode {
    if (user.login && location.pathname !== Routes.LOGIN) { return children; }
    if (!user.login && location.pathname === Routes.LOGIN) { return children; }
    return null;
  }

  return <>{renderView()}</>;
};

const routes: RouteObject[] = [
  {
    path: Routes.LOGIN,
    element: <Login></Login>,
  },
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
    path: Routes.TRIP_NOTE,
    element: <Main></Main>,
    children: [
      {
        index: true,
        element: <TripNote></TripNote>,
      },
    ],
  },
  {
    path: Routes.SETTING,
    element: <Main></Main>,
    children: [
      {
        index: true,
        element: <Setting></Setting>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={Routes.CALENDAR}></Navigate>,
  },
];

export default routes;
