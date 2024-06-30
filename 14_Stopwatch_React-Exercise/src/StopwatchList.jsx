import Stopwatch from './Stopwatch.jsx';
import React, {useState} from 'react';

function StopwatchList() {

  const [stopwatchCount, setStopwatchCount] = useState(1);

  function addStopwatch() {
    setStopwatchCount(c => c + 1);
  }

  function getStopwatches() {
    return Array.from({ length: stopwatchCount }).map((_, i) => (
      <Stopwatch key={i} />
    ));
  }

  return (<>
    {getStopwatches()}
    <button onClick={addStopwatch} className='add-button'>Add</button>
  </>);
}

export default StopwatchList;