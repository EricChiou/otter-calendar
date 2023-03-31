import { FC, useLayoutEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import routes, { InterceptorRouter } from '@/routes';
import Cookie from '@/utils/cookie';
import { setToken } from '@/store/user.slice';
import CookieKeys from '@/constants/cookie';
import { injectDispatch } from '@/api/base';

const App: FC = () => {
  const dispatch = useDispatch();
  const view = useRoutes(routes);

  useLayoutEffect(() => {
    injectDispatch(dispatch);
    const token = Cookie.Get(CookieKeys.TOKEN);
    if (token) { dispatch(setToken(token)); }
  }, []);

  return <InterceptorRouter>{view}</InterceptorRouter>;
};

export default App;
