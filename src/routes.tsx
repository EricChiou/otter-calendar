import { FC, ReactNode, useEffect, useLayoutEffect } from 'react';
import { RouteObject, Navigate, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectUser, setPrevPath, setToken } from '@/store/user.slice';
import { injectDispatch } from '@/api/base';

import Routes from '@/constants/routes';
import CookieKeys from '@/constants/cookie';
import Cookie from '@/utils/cookie';

import Main from '@/layout/Main';

import Login from '@/views/Login';
import Calendar from '@/views/Calendar';
import EventRecords from '@/views/EventRecords';
import TripNote from '@/views/TripNote';
import NoteDetail from '@/views/TripNote/NoteDetail';
import Setting from '@/views/Setting';

export const InterceptorRouter: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useLayoutEffect(() => {
    injectDispatch(dispatch);
    const token = Cookie.Get(CookieKeys.TOKEN);
    if (token) { dispatch(setToken(token)); }
  }, []);

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
    if (user.login && location.pathname !== Routes.LOGIN) { return <Outlet></Outlet>; }
    if (!user.login && location.pathname === Routes.LOGIN) { return <Outlet></Outlet>; }
    return null;
  }

  return <>{renderView()}</>;
};

const routes: RouteObject[] = [
  {
    element: <InterceptorRouter></InterceptorRouter>,
    children: [
      {
        element: <Main></Main>,
        children: [
          {
            id: Routes.CALENDAR,
            path: Routes.CALENDAR,
            element: <Calendar></Calendar>,
          },
          {
            id: Routes.EVENT_RECORDS,
            path: Routes.EVENT_RECORDS,
            element: <EventRecords></EventRecords>,
          },
          {
            id: Routes.TRIP_NOTE,
            path: Routes.TRIP_NOTE,
            element: <TripNote></TripNote>,
          },
          {
            id: Routes.TRIP_NOTE_DETAIL_$ID,
            path: Routes.TRIP_NOTE_DETAIL_$ID,
            element: <NoteDetail></NoteDetail>,
          },
          {
            id: Routes.SETTING,
            path: Routes.SETTING,
            element: <Setting></Setting>,
          },
        ],
      },
      {
        id: Routes.LOGIN,
        path: Routes.LOGIN,
        element: <Login></Login>,
      },
      {
        path: '*',
        element: <Navigate to={Routes.CALENDAR}></Navigate>,
      },
    ],
  },
];

export default routes;
