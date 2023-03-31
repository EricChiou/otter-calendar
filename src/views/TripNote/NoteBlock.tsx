import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Star, Location } from '@/components/icons';
import Routes from '@/constants/routes';

interface Props {
  note: {
    id: number;
    star: number;
  };
}

const NoteBlock: FC<Props> = ({ note }) => {
  const navigate = useNavigate();

  function link2NoteDetail() {
    navigate(Routes.TRIP_NOTE_DETAIL_$ID.replace(':id', note.id.toString()));
  }

  return (<>
    <div className="flex mb-2 p-1 h-[8.5rem] cursor-pointer shadow hover:shadow-md" onClick={link2NoteDetail}>
      <div className="flex-initial mr-1 w-32 h-32">
        {/* <img></img> */}
        <div className="bg-mask-2 w-full h-full"></div>
      </div>
      <div className="flex-1 w-0">
        <div className="text-xl font-bold truncate">名稱</div>
        <div className="flex h-6">
          <div className="flex-initial mr-2">
            <div className="inline-block relative mr-1 text-mask-3 align-top">
              {Array(5)
                .fill(Star)
                .map((Ele, i) => <Ele key={i} className="inline mb-1" width="1rem" height="1rem"></Ele>)
              }
              <div
                className="absolute bottom-0.5 h-full text-yellow whitespace-nowrap overflow-hidden"
                style={{ width: `${(note.star / 5) * 100}%` }}
              >
                {Array(5)
                  .fill(Star)
                  .map((Ele, i) => <Ele key={i} className="inline" width="1rem" height="1rem"></Ele>)
                }
              </div>
            </div>
            <span className="align-top">{note.star}</span>
          </div>
          <div className="flex-1 w-0 truncate">分類</div>
        </div>
        <div className="mb-0.5 h-6 truncate">
          <Location className="inline ml-[-0.25rem] text-red-3"></Location>
          <span className="align-middle">區域</span>
        </div>
        <div className="h-[calc(100%-4.875rem)] line-clamp-2">
          心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.
        </div>
      </div>
    </div>
  </>);
};

export default NoteBlock;