import { FunctionComponent } from 'react';
import { useRoutes } from 'react-router-dom';

import routes from '@/routes';

const App: FunctionComponent = () => {
  const element = useRoutes(routes);

  return (<>{element}</>);
};

export default App;
