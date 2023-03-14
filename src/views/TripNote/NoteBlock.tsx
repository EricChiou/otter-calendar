import { FunctionComponent, useState } from 'react';

import { Star, Location } from '@/components/icons';

const NoteBlock: FunctionComponent = () => {
  const [start, setStar] = useState(4);

  return (<>
    <div className="flex mb-2 p-1 h-[8.5rem] shadow">
      <div className="flex-initial mr-1 w-32 h-32">
        {/* <img></img> */}
        <div className="bg-mask-2 w-full h-full"></div>
      </div>
      <div className="flex-1 w-0">
        <div className="text-xl font-bold truncate">名稱</div>
        <div className="flex h-6">
          <div className="flex-initial mr-2">
            <span className="mr-1 align-middle">{start}</span>
            <div className="inline-block relative h-6 text-mask-4">
              {Array(5)
                .fill(Star)
                .map((Ele, i) => <Ele key={i} className="inline" width="1rem" height="1rem"></Ele>)
              }
              <div
                className="absolute top-0 h-full text-yellow whitespace-nowrap overflow-hidden"
                style={{ width: `${(start / 5) * 100}%` }}
              >
                {Array(5)
                  .fill(Star)
                  .map((Ele, i) => <Ele key={i} className="inline" width="1rem" height="1rem"></Ele>)
                }
              </div>
            </div>
          </div>
          <div className="flex-1 w-0 truncate">分類</div>
        </div>
        <div className="mb-0.5 h-6 truncate">
          <Location className="inline text-red-3" width="1.25rem"></Location>
          <span className="align-middle">區域</span>
        </div>
        <div className="h-[calc(100%-4.875rem)] line-clamp-2">介紹</div>
      </div>
    </div>
  </>);
};

export default NoteBlock;