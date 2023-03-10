import { FunctionComponent, useState } from 'react';

import Title from '@/components/Title';
import { Sort } from '@/components/icons';
import Button from '@/components/Button';

const FoodNote: FunctionComponent = () => {
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
      title="餐廳心得記錄"
      extra={
        <div className="my-0.5 sm:hidden">
          <Button
            className="h-[28px] align-middle"
            click={() => setSortTypeIndex(sortTypes[sortTypeIndex + 1] ? sortTypeIndex + 1 : 0)}
          >
            <Sort className="inline-block align-top"></Sort>
            {sortTypes[sortTypeIndex].label}
          </Button>
        </div>
      }
    ></Title>
    <div className="mb-1">
      <Button
        className="hidden w-32 h-[28px] mr-8 sm:inline-block"
        click={() => setSortTypeIndex(sortTypes[sortTypeIndex + 1] ? sortTypeIndex + 1 : 0)}
      >
        <Sort className="inline-block align-top"></Sort>
        {sortTypes[sortTypeIndex].label}
      </Button>
      <div className="inline-block pr-1 w-1/3 sm:w-[calc((100%-10rem)/3)]">
        <select className="w-full h-[28px] input" defaultValue="all">
          <option value="all">全部星級</option>
        </select>
      </div>
      <div className="inline-block px-0.5 w-1/3 sm:w-[calc((100%-10rem)/3)]">
        <select className="w-full h-[28px] input" defaultValue="all">
          <option value="all">全部區域</option>
        </select>
      </div>
      <div className="inline-block pl-1 w-1/3 h-[28px] sm:w-[calc((100%-10rem)/3)]">
        <select className="w-full h-[28px] input" defaultValue="all">
          <option value="all">全部分類</option>
        </select>
      </div>
    </div>
  </>);
};

export default FoodNote;
