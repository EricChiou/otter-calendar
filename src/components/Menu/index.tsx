import { FunctionComponent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import c from 'classnames';

import Routes from '@/constants/routes';
import logo from '@/assets/image/logo.png';
import { Calendar, Note, Menu, Setting, Logout } from '@/components/icons';
import { logout } from '@/store/user.slice';

const SideMenu: FunctionComponent = () => {
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
  const [show, setShow] = useState(false);

  function action() {
    window.removeEventListener('click', action);
    setShow(false);
  }

  return (
    <div className="relative p-0.5 h-full bg-green text-left sm:p-1">
      <span className="inline-block h-full align-middle sm:mb-1 sm:h-10">
        <img className="h-full sm:block sm:w-full" src={logo}></img>
      </span>
      <span className="ml-1 text-xl font-bold text-white align-middle sm:hidden">Otter Calendar</span>
      <div
        className="absolute top-0 right-0 p-1 text-white cursor-pointer active:bg-mask sm:hidden"
        onClick={(e) => {
          if (!show) {
            e.stopPropagation();
            window.addEventListener('click', action);
          }
          setShow(!show);
        }}
      >
        <Menu></Menu>
      </div>
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
      {show ?
        <div className="absolute top-full right-0 m-0.5 text-white bg-green sm:hidden z-10">
          {options.map((option) => (
            <div
              key={option.route}
              className={c('cursor-pointer p-1 active:bg-mask', { 'bg-mask': location.pathname === option.route })}
              onClick={(e) => {
                e.stopPropagation();
                setShow(false);
                if (option.action) { option.action(); }
                navigate(option.route);
              }}
            >
              <span className="inline-block align-middle"><option.Icon></option.Icon></span>
              <span className="inline-block ml-0.5 align-middle">{option.text}</span>
            </div>
          ))}
        </div> : null
      }
    </div >
  );
};

export default SideMenu;
