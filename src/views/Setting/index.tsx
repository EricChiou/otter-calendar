import { FunctionComponent } from 'react';

import Title from '@/components/Title';
import Button from '@/components/Button';

const Setting: FunctionComponent = () => {
  return (<>
    <Title title="設定"></Title>
    <div className="mb-2">
      <div className="mt-1 text-xl">修改密碼</div>
      <div className="mt-2">
        <span className="inline-block w-28">舊密碼：</span>
        <input className="w-56 align-middle input" type="password"></input>
      </div>
      <div className="mt-4">
        <span className="inline-block w-28">新密碼：</span>
        <input className="w-56 align-middle input" type="password"></input>
      </div>
      <div className="mt-4">
        <span className="inline-block w-28">確認新密碼：</span>
        <input className="w-56 align-middle input" type="password"></input>
      </div>
      <div className="mt-4 text-center sm:w-[22rem]">
        <Button text="確認修改"></Button>
      </div>
    </div>
  </>);
};

export default Setting;
