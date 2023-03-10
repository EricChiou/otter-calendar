import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

import Menu from '@/components/Menu';

const Main: FunctionComponent = () => {
  return (
    <div className="sm:flex sm:flex-nowrap sm:justify-start">
      <div className="h-8 sm:w-12 sm:h-[100vh]"><Menu></Menu></div>
      <div className="h-[calc(100vh-5rem)] overflow-auto sm:w-[calc(100vw-3rem)] sm:h-[100vh]">
        <div className="px-1 py-0.5 sm:p-4">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="h-12 sm:hidden"><Menu footer={true}></Menu></div>
    </div>
  );
};

export default Main;
