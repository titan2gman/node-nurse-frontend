import React, { useState, useEffect } from 'react';
import Shift, { IShift } from './components/Shift';
import Overlap, { IOverlap } from './components/Overlap';

const App: React.FC = () => {
  const [shifts, setShifts] = useState<Array<IShift>>([]);
  const [shiftIds, setShiftIds] = useState<Array<number>>([]);
  const [overlapInfo, setOverlapInfo] = useState<IOverlap>({});

  useEffect(() => {
    const api = async () => {
      const data = await fetch('http://localhost:8080/api/shifts', {
        method: 'GET'
      });
      const jsonData = await data.json();
      setShifts(jsonData.data.map((item: any) => {
        return {
          ...item,
          facilityName: item.facility.facilityName,
        }
      }));
    };

    api();
  }, []);

  const clickShiftHandler = (shiftId: number) => {
    const idx = shiftIds.indexOf(shiftId);
    if (idx != -1) {
      shiftIds.splice(idx, 1);
    } else {
      if (shiftIds.length < 2) {
        shiftIds.push(shiftId);
      } else {
        alert('You can select 2 shifts at maximum!');
        return;
      }
    }

    setShiftIds(shiftIds);

    setShifts(shifts.map(shift => (
      {
        ...shift, 
        selected: shiftIds.indexOf(shift.shiftId) != -1
      }
    ))) 
  };

  const submitHandler = () => {
    if (shiftIds.length < 2) {
      alert('2 shifts should be selected!');
      return;
    }

    const api = async () => {
      const data = await fetch(`http://localhost:8080/api/shifts/overlap/${shiftIds[0]}/${shiftIds[1]}`, {
        method: 'GET'
      });
      const jsonData = await data.json();
      setOverlapInfo(jsonData);      
    };

    api();
  }

  return (
    <>
      <Overlap {...overlapInfo} onSubmit={() => submitHandler()}/>
      <div className="shift-container">
      {
        shifts.map(shift => (
          <div key={shift.shiftId} onClick={() => clickShiftHandler(shift.shiftId)} >
            <Shift {...shift} />              
          </div>
        ))
      }
      </div>
      <style>{`
        .shift-container {
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
}

export default App;