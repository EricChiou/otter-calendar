import { FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import c from 'classnames';

import Routes from '@/constants/routes';
import logo from '@/assets/image/logo.png';
import { Calendar, Note, Setting, Logout, Food } from '@/components/icons';
import { logout } from '@/store/user.slice';

interface Props {
  footer?: boolean;
}

const SideMenu: FunctionComponent<Props> = ({ footer }) => {
  const dispatch = useDispatch();
  const options = [
    {
      Icon: Calendar,
      route: Routes.CALENDAR,
    },
    {
      Icon: Note,
      route: Routes.EVENT_RECORDS,
    },
    {
      Icon: Food,
      route: Routes.FOOD_NOTE,
    },
    {
      Icon: Setting,
      route: Routes.SETTING,
    },
  ];
  const location = useLocation();
  const navigate = useNavigate();

  return footer ?
    <div className="h-full bg-green">
      {options.map((option) => (
        <span key={option.route} className="float-left w-[25%] h-12">
          <div
            className={c(
              'h-full text-center cursor-pointer',
              { 'bg-mask': location.pathname === option.route },
            )}
            onClick={() => navigate(option.route)}
          >
            <option.Icon className="inline-block my-3 w-6 h-6 text-white opacity-85"></option.Icon>
          </div>
        </span>
      ))}
    </div> :
    <div className="relative p-0.5 h-full bg-green text-left sm:p-0">
      <span className="inline-block h-full align-middle sm:p-1 sm:w-full sm:h-auto">
        <img className="h-full sm:w-full sm:h-auto" src={logo}></img>
      </span>
      <span className="sm:hidden">
        <span className="ml-1 text-xl font-bold text-white align-middle">Otter Calendar</span>
      </span>
      <span
        className="absolute top-0 right-0 bottom-0 p-1 text-white cursor-pointer sm:top-auto sm:bottom-0 sm:w-full"
        onClick={() => dispatch(logout())}
      >
        <Logout className="sm:w-full sm:h-full"></Logout>
      </span>
      {options.map((option) => (
        <span key={option.route} className="hidden sm:block sm:my-1.5">
          <div
            className={c(
              'inline-block w-full p-0.5 cursor-pointer hover:bg-mask active:bg-mask-2',
              { 'bg-mask': location.pathname === option.route },
            )}
            onClick={() => navigate(option.route)}
          >
            <option.Icon className="inline-block w-full h-full text-white opacity-85"></option.Icon>
          </div>
        </span>
      ))}
    </div>;
};

export default SideMenu;
