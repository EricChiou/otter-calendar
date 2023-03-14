import { FunctionComponent, useState } from 'react';

import Title from '@/components/Title';
import { Sort } from '@/components/icons';
import Button from '@/components/Button';
import NoteBlock from './NoteBlock';

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

  function renderNoteList() {
    const md = 'md:basis-[calc((100%-0.5rem)/2)] md:[&:nth-child(1n)]:mr-2 md:[&:nth-child(2n)]:mr-0';
    const lg = 'lg:basis-[calc((100%-1.0rem)/3)] lg:[&:nth-child(2n)]:mr-2 lg:[&:nth-child(3n)]:mr-0';
    const xl = 'xl:basis-[calc((100%-1.5rem)/4)] xl:[&:nth-child(3n)]:mr-2 xl:[&:nth-child(4n)]:mr-0';
    return (
      <div className="flex flex-wrap">
        {Array(7)
          .fill(NoteBlock)
          .map((Ele, i) => <div key={i} className={`basis-full ${md} ${lg} ${xl}`}><Ele></Ele></div>)
        }
      </div>
    );
  }

  return (<>
    <Title className="mb-2" title="遊記"></Title>
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
    <div className="mb-2 sm:hidden">
      <Button
        className="inline-block w-32 h-[28px] mr-1.5"
        click={() => setSortTypeIndex(sortTypes[sortTypeIndex + 1] ? sortTypeIndex + 1 : 0)}
      >
        <Sort className="inline-block align-top"></Sort>
        {sortTypes[sortTypeIndex].label}
      </Button>
      <input className="input w-[calc(100%-8.375rem)]" placeholder="搜尋"></input>
    </div>
    {renderNoteList()}
  </>);
};

export default TripNote;
