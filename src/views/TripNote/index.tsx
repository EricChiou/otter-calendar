import { FunctionComponent, useState } from 'react';

import Title from '@/components/Title';
import { Sort } from '@/components/icons';
import Button from '@/components/Button';

const TripNote: FunctionComponent = () => {
  const sortTypes = [
    {
      value: 'star',
      label: '以星級排序',
    },
    {
      value: 'region',
      label: '以區域排序',
    },
    {
      value: 'classification',
      label: '以類別排序',
    },
  ];
  const [sortTypeIndex, setSortTypeIndex] = useState(0);

  return (<>
    <Title
      className="mb-2"
      title="遊記"
    ></Title>
    <div className="mb-1">
      <div className="hidden sm:inline-block sm:w-2/5">
        <Button
          className="inline-block w-32 h-[28px] mr-2"
          click={() => setSortTypeIndex(sortTypes[sortTypeIndex + 1] ? sortTypeIndex + 1 : 0)}
        >
          <Sort className="inline-block align-top"></Sort>
          {sortTypes[sortTypeIndex].label}
        </Button>
        <input className="input w-1/2" placeholder="搜尋"></input>
      </div>
      <div className="inline-block pr-1 w-1/3 sm:w-1/5">
        <select className="w-full h-[28px] input" defaultValue="all">
          <option value="all">全部星級</option>
        </select>
      </div>
      <div className="inline-block px-0.5 w-1/3 sm:w-1/5">
        <select className="w-full h-[28px] input" defaultValue="all">
          <option value="all">全部區域</option>
        </select>
      </div>
      <div className="inline-block pl-1 w-1/3 h-[28px] sm:w-1/5">
        <select className="w-full h-[28px] input" defaultValue="all">
          <option value="all">全部分類</option>
        </select>
      </div>
    </div>
    <div className="sm:hidden">
      <Button
        className="inline-block w-32 h-[28px] mr-1.5"
        click={() => setSortTypeIndex(sortTypes[sortTypeIndex + 1] ? sortTypeIndex + 1 : 0)}
      >
        <Sort className="inline-block align-top"></Sort>
        {sortTypes[sortTypeIndex].label}
      </Button>
      <input className="input w-[calc(100%-8.375rem)]" placeholder="搜尋"></input>
    </div>
  </>);
};

export default TripNote;
