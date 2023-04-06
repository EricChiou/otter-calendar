import { FC, SVGProps } from 'react';
import { useLocation, useNavigate, useMatches } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import c from 'classnames';

import Routes from '@/constants/routes';
import logo from '@/assets/image/logo.png';
import { Calendar, Note, Setting, Logout, Travel } from '@/components/icons';
import { logout } from '@/store/user.slice';

interface Props {
  footer?: boolean;
}

interface Option {
  Icon: FC<SVGProps<SVGSVGElement>>;
  route: string;
  routes?: string[];
}

const SideMenu: FC<Props> = ({ footer }) => {
  const dispatch = useDispatch();
  const matches = useMatches();
  const location = useLocation();
  const navigate = useNavigate();
  const options: Option[] = [
    {
      Icon: Calendar,
      route: Routes.CALENDAR,
    },
    {
      Icon: Note,
      route: Routes.EVENT_RECORDS,
    },
    {
      Icon: Travel,
      route: Routes.TRIP_NOTE,
      routes: [Routes.TRIP_NOTE, Routes.TRIP_NOTE_DETAIL_$ID],
    },
    {
      Icon: Setting,
      route: Routes.SETTING,
    },
  ];

  function enableOption(option: Option): boolean {
    if (location.pathname === option.route) {
      return true;
    }
    const id = matches.pop()?.id;
    if (option.routes && id) {
      console.log(matches, option.routes);
      return option.routes.includes(id);
    }
    return false;
  }

  return footer ?
    <div className="h-full bg-green">
      {options.map((option) => (
        <span key={option.route} className="float-left w-[25%] h-12">
          <div
            className={c(
              'h-full text-center cursor-pointer',
              { 'bg-mask': enableOption(option) },
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
        className="absolute top-0 right-0 bottom-0 p-1 text-white cursor-pointer
                   sm:top-auto sm:bottom-0 sm:p-1 sm:w-full"
        onClick={() => dispatch(logout())}
      >
        <Logout className="w-full h-full"></Logout>
      </span>
      {options.map((option) => (
        <span key={option.route} className="hidden sm:block">
          <div
            className={c(
              'inline-block w-full p-1 cursor-pointer hover:bg-mask active:bg-mask-2',
              { 'bg-mask': enableOption(option) },
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
