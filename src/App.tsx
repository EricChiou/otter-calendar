import { FunctionComponent } from 'react';
import { useRoutes } from 'react-router-dom';

import routes, { InterceptorRouter } from '@/routes';

const App: FunctionComponent = () => {
  const view = useRoutes(routes);
  return <InterceptorRouter>{view}</InterceptorRouter>;
};

export default App;
