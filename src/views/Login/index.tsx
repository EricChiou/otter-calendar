import { FunctionComponent, useState } from 'react';

import Button from '@/components/Button';
import { login } from '@/store/user.slice';

import { useDispatch } from '@/store';
import logo from '@/assets/image/logo.png';
import bgLg from '@/assets/image/bg-lg.jpg';
import { Add, Return } from '@/components/icons';
import Message from '@/components/Message';
import UserAPI from '@/api/user';

const Login: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [showSignUp, setShowSignUp] = useState(false);
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  function resetData() {
    setAccount('');
    setPassword('');
    setConfirmPwd('');
  }

  function doSignUp() {
    let msg = '';
    if (password !== confirmPwd) { msg = '密碼與確認密碼不一致'; }
    if (!password) { msg = '未輸入密碼'; }
    if (!account) { msg = '未輸入帳號'; }
    if (msg) {
      Message.add(msg);
      return;
    }

    UserAPI.SignUp(account, password).then(() => {
      Message.add('註冊成功');
      setPassword('');
      setShowSignUp(false);
    });
  }

  function doLogin() {
    let msg = '';
    if (!password) { msg = '未輸入密碼'; }
    if (!account) { msg = '未輸入帳號'; }
    if (msg) {
      Message.add(msg);
      return;
    }

    dispatch(login(account, password));
  }

  return (
    <div
      className="w-[100vw] h-[100vh] text-center bg-center bg-cover"
      style={{ backgroundImage: `url("${bgLg}")` }}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-mask-2"></div>
      <div className="absolute ml-[calc(50vw-11rem)] mt-[calc(50vh-10rem)] w-[22rem] bg-white shadow-lg">
        <div className="h-[40px] text-left text-white bg-green-2">
          <span className="m-1 float-left">
            <img className="inline-block w-8 h-8 align-middle" src={logo}></img>
            <span className="inline-block ml-1 align-middle">Otter Calendar</span>
          </span>
          <span className="float-right">
            {showSignUp ?
              <Button className="bg-green-2 hover:bg-green" click={() => { resetData(); setShowSignUp(false); }}>
                <Return width="28px" height="36px"></Return>
              </Button> :
              <Button className="bg-green-2 hover:bg-green" click={() => { resetData(); setShowSignUp(true); }}>
                <Add width="28px" height="36px"></Add>
              </Button>
            }
          </span>
        </div>
        {showSignUp ? <>
          <div className="mt-5">
            <span className="inline-block w-20 text-right align-middle">帳號：</span>
            <input
              className="px-1 w-62 align-middle input"
              value={account}
              onChange={(e) => { setAccount(e.target.value); }}
            ></input>
          </div>
          <div className="mt-5">
            <span className="inline-block w-20 text-right">密碼：</span>
            <input
              className="px-1 w-62 align-middle input"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); }}
            ></input>
          </div>
          <div className="mt-5">
            <span className="inline-block w-20 text-right">確認密碼：</span>
            <input
              className="px-1 w-62 align-middle input"
              type="password"
              value={confirmPwd}
              onChange={(e) => { setConfirmPwd(e.target.value); }}
            ></input>
          </div>
          <div className="my-4">
            <Button text={'註冊'} click={doSignUp}></Button>
          </div>
        </> : <>
          <div className="mt-5">
            <span className="inline-block w-12 text-right align-middle">帳號：</span>
            <input
              className="px-1 w-62 align-middle input"
              value={account}
              onChange={(e) => { setAccount(e.target.value); }}
              onKeyUp={(e) => e.key === 'Enter' && doLogin()}
            ></input>
          </div>
          <div className="mt-5">
            <span className="inline-block w-12 text-right">密碼：</span>
            <input
              className="px-1 w-62 align-middle input"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); }}
              onKeyUp={(e) => e.key === 'Enter' && doLogin()}
            ></input>
          </div>
          <div className="my-4">
            <Button text={'登入'} click={doLogin}></Button>
          </div>
        </>}
      </div>
    </div >
  );
};

export default Login;
