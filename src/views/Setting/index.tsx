import { FunctionComponent } from 'React';

import Button from '@/components/Button';

const Setting: FunctionComponent = () => {
  return (
    <div className="m-2 sm:m-4">
      <div className="text-2xl font-bold">設定</div>
      <div className="my-1">
        <hr></hr>
        <div className="mt-1 text-xl">修改密碼</div>
        <div className="mt-2">
          <span className="inline-block w-28 text-right">舊密碼：</span>
          <input className="px-1 w-60 align-middle border border-mask-5 outline-none" type="password"></input>
        </div>
        <div className="mt-4">
          <span className="inline-block w-28 text-right">新密碼：</span>
          <input className="px-1 w-60 align-middle border border-mask-5 outline-none" type="password"></input>
        </div>
        <div className="mt-4">
          <span className="inline-block w-28 text-right">確認新密碼：</span>
          <input className="px-1 w-60 align-middle border border-mask-5 outline-none" type="password"></input>
        </div>
        <div className="mt-4 text-center sm:w-[22rem]">
          <Button text="確認修改"></Button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
