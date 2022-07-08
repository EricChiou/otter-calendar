import { FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import c from 'classnames';

import Routes from '@/constants/routes';
import logo from '@/assets/image/logo.png';
import { Calendar, Note, Setting, Logout } from '@/components/icons';
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
      text: '行事曆',
    },
    {
      Icon: Note,
      route: Routes.EVENT_RECORDS,
      text: '事件紀錄',
    },
    {
      Icon: Setting,
      route: Routes.SETTING,
      text: '設定',
    },
    {
      Icon: Logout,
      route: Routes.LOGIN,
      text: '登出',
      action: () => { dispatch(logout()); },
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
              'p-2 text-center cursor-pointer hover:bg-mask active:bg-mask-2',
              { 'bg-mask': location.pathname === option.route },
            )}
            onClick={() => {
              if (option.action) { option.action(); }
              navigate(option.route);
            }}>
            <option.Icon className="inline-block w-6 h-6 text-white opacity-85"></option.Icon>
          </div>
        </span>
      ))}
    </div> :
    <div className="p-0.5 h-full bg-green text-left sm:p-1">
      <span className="inline-block h-full align-middle sm:mb-1 sm:h-10">
        <img className="h-full sm:block sm:w-full" src={logo}></img>
      </span>
      <span className="ml-1 text-xl font-bold text-white align-middle sm:hidden">Otter Calendar</span>
      {options.map((option) => (
        <span key={option.route} className="hidden sm:block sm:my-1.5">
          <div
            className={c(
              'inline-block w-full p-0.5 cursor-pointer hover:bg-mask active:bg-mask-2',
              { 'bg-mask': location.pathname === option.route },
            )}
            onClick={() => {
              if (option.action) { option.action(); }
              navigate(option.route);
            }}>
            <option.Icon className="inline-block w-full h-full text-white opacity-85"></option.Icon>
          </div>
        </span>
      ))}
    </div>;
};

export default SideMenu;
