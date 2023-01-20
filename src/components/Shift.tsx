import React from 'react';
import moment from 'moment';

export interface IShift {
  shiftId: number;
  facilityName: string;
  shiftDate: string;
  startTime: string;
  endTime: string;
  selected?: boolean;
}

const Shift: React.FC<IShift> = (props) => {
  const {
    facilityName,
    shiftDate,
    startTime,
    endTime,
    selected,
  } = props;

  return (
    <>
      <div className={selected ? 'shift-wrapper shift-selected': 'shift-wrapper'}>
        <div className='facility-name'>
          {facilityName}
        </div>
        <div className='shift-date'>
          {shiftDate}
        </div>
        <div className='shift-time'>
          {moment(startTime, "h:mm:ss").format("h:mm A")} - {moment(endTime, "h:mm:ss").format("h:mm A")}
        </div>
      </div>
      <style>{`
        .shift-wrapper {
          display: flex;
          flex-direction: column;
          border: 1px solid black;
          cursor: pointer;
          width: 150px;
          height: 90px;
          padding: 10px;
          text-align: center;
          justify-content: center;
          margin: 10px;
        }
        .shift-selected {
          background-color: aquamarine;
        }
      `}</style>
    </>
  );
}

export default Shift;