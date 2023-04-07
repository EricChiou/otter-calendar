import { FC, useState } from 'react';
// import { useParams } from 'react-router-dom';

import Title from '@/components/Title';
import { Star, Location } from '@/components/icons';
import Button from '@/components/Button';
import { Edit } from '@/components/icons';

const NoteDetail: FC = () => {
  // const params = useParams();
  const [detail, setDetail] = useState({ star: 3.5 });
  const [editDetail, setEditDetail] = useState({ star: 3.5 });
  const [editMode, setEditMode] = useState(false);

  return (<>
    <Title
      className="mb-2"
      title={<>
        皇家牛肉麵
        {!editMode &&
          <Button className="px-1 py-1" type="inline" click={() => setEditMode(true)}>
            <Edit width="1.25rem" height="1.25rem"></Edit>
          </Button>
        }
      </>}
    ></Title>
    {editMode ?
      <div>
        <span className="inline-block relative mr-1 text-mask-3">
          {Array(5)
            .fill(Star)
            .map((Ele, i) => <Ele key={i} className="inline mb-1" width="3rem" height="3rem"></Ele>)
          }
          <div
            className="absolute top-0 h-full text-yellow whitespace-nowrap overflow-hidden"
            style={{ width: `${(editDetail.star / 5) * 100}%` }}
          >
            {Array(5)
              .fill(Star)
              .map((Ele, i) => <Ele key={i} className="inline" width="3rem" height="3rem"></Ele>)
            }
          </div>
          <div className="absolute top-0 right-0 bottom-0 left-0">
            {Array(10)
              .fill((props: { index: number }) => {
                return (
                  <div
                    className="inline-block w-[calc(10%)] h-full cursor-pointer hover:bg-mask"
                    onClick={() => setEditDetail({ star: (props.index + 1) * 0.5 })}
                  ></div>
                );
              })
              .map((Ele, i) => <Ele key={i} index={i}></Ele>)
            }
          </div>
        </span>
        <span className="text-4xl align-middle">{editDetail.star}</span>
      </div> :
      <div className="flex mb-0.5 text-lg">
        <div className="flex-initial mr-2">
          <div className="inline-block relative mr-1 text-mask-3 align-top">
            {Array(5)
              .fill(Star)
              .map((Ele, i) => <Ele key={i} className="inline mb-1" width="1.25rem" height="1.25rem"></Ele>)
            }
            <div
              className="absolute bottom-0.5 h-full text-yellow whitespace-nowrap overflow-hidden"
              style={{ width: `${(detail.star / 5) * 100}%` }}
            >
              {Array(5)
                .fill(Star)
                .map((Ele, i) => <Ele key={i} className="inline" width="1.25rem" height="1.25rem"></Ele>)
              }
            </div>
          </div>
          <span className="align-top">{detail.star}</span>
        </div>
        <div className="flex-1 w-0 truncate">分類</div>
      </div>
    }
    <div className="mb-0.5 text-lg truncate">
      <Location className="inline ml-[-0.25rem] text-red-3"></Location>
      <span className="align-middle">區域</span>
    </div>
    <div>
      <div className="font-bold text-lg">心得</div>
      <div>心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得.心得</div>
    </div>
  </>);
};

export default NoteDetail;
