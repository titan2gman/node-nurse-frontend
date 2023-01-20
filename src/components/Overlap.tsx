import React from 'react';
import _ from 'lodash';

export interface IOverlap {
  overlap?: number;
  maxOverlap?: number;
  exceed?: boolean;
}

interface IProps extends IOverlap {
  onSubmit: () => void; 
}

const Overlap: React.FC<IProps> = (props) => {
  const {
    overlap,
    maxOverlap,
    exceed,
    onSubmit
  } = props;

  return (
    <>
      <div className='overlap-wrapper'>
        <div className='overlap-info'>
          <p>
            Overlap Minutes: {overlap}
          </p>
          <p>
            Max Overlap Threshold: {maxOverlap}
          </p>
          <p>
            Exceeds Overlap Threshold: {_.capitalize(exceed?.toString())}
          </p>
        </div>
        <div className='overlay-submit'>
          <button className='submit-btn' type='button' onClick={() => onSubmit()}>Submit</button>
        </div>
      </div>
      <style>{`
        .overlap-wrapper {
          padding: 10px;
          display: flex;
          border: 1px solid black;
          width: 350px;
          justify-content: space-between;
          margin: auto;
        }
        .overlay-submit {
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
        .submit-btn {
          width: 100px;
          height: 35px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Overlap;