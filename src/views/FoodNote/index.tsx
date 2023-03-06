import { FunctionComponent } from 'react';

const FoodNote: FunctionComponent = () => {
  return (<>
    <div>
      <div className="m-2 text-xl">記錄列表</div>
      <div className="inline-block px-2 w-1/3">
        <select className="w-full input" defaultValue="all">
          <option value="all">全部區域</option>
        </select>
      </div>
      <div className="inline-block px-2 w-1/3">
        <select className="w-full input" defaultValue="all">
          <option value="all">全部種類</option>
        </select>
      </div>
      <div className="inline-block px-2 w-1/3">
        <select className="w-full input" defaultValue="all">
          <option value="all">全部星級</option>
        </select>
      </div>
    </div>
  </>);
};

export default FoodNote;
