import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@/components/Button';
import { login } from '@/store/user.slice';

import logo from '@/assets/image/logo.png';
import bgLg from '@/assets/image/bg-lg.jpg';

const Login: FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="w-[100vw] h-[100vh] text-center bg-center bg-cover"
      style={{ backgroundImage: `url("${bgLg}")` }}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-mask-2"></div>
      <div className="absolute ml-[calc(50vw-11rem)] mt-[calc(50vh-10rem)] w-[22rem] bg-white shadow-lg">
        <div className="p-1 text-left text-white bg-green-2">
          <img className="inline-block w-8 h-8 align-middle" src={logo}></img>
          <span className="inline-block ml-1 align-middle">Otter Calendar</span>
        </div>
        <div className="mt-5">
          <span className="inline-block w-12 text-right align-middle">帳號：</span>
          <input className="px-1 w-62 align-middle border border-mask-4 outline-none"></input>
        </div>
        <div className="mt-5">
          <span className="inline-block w-12 text-right">密碼：</span>
          <input className="px-1 w-62 align-middle border border-mask-4 outline-none" type="password"></input>
        </div>
        <div className="my-4">
          <Button text={'登入'} click={() => { dispatch(login()); }}></Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
