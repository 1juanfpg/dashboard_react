import { useState } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { VscDebugStart } from 'react-icons/vsc';
import { BiStopCircle } from 'react-icons/bi';

import { getData } from '../helpers/getData';

export const LiveMeasure = () => {
  const [flag, setFlag] = useState(false);
  const [intervalId, setIntervalId] = useState(0);
  const [repetitions, setRepetitions] = useState(0);

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "ESP32 Temperature",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [],
      },
      {
        label: "ESP32 Humidity",
        backgroundColor: "rgb(132,99,255)",
        borderColor: "rgb(132, 99, 255)",
        data: [],
      }
    ],
  });

  const handleClick = async() => {

    if (flag == false) {
      const myIntervalID = await setInterval(async() => {

        const esp32Items = await getData('data');

        const tempValues = esp32Items.map((item) => {
          return item.temp;
        });

        const humValues = esp32Items.map((item) => {
          return item.hum;
        });

        const labels = esp32Items.map((item) => {
          const myDate = new Date(item.timestamp);
          return myDate.getDate().toString()
            + "-" + (myDate.getMonth() + 1).toString()
            + "-" + myDate.getFullYear()
            + " " + myDate.getHours()
            + ":" + myDate.getMinutes();
        });

        const myData = {
          labels: labels,
          datasets: [
            {
              label: "ESP32 Humidity",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: humValues,
            },
            {
              label: "ESP32 Temperature",
              backgroundColor: "rgb(132, 99, 255)",
              borderColor: "rgb(132, 99, 255)",
              data: tempValues,
            }
          ],
        };

        setData(myData);
        // Use functional argument to access previous state
        setRepetitions((prevRepetitions) => { return prevRepetitions + 1 });
        //setRepetitions(repetitions+1);
        console.log(repetitions);
        console.log(data);

      }, 10000);
      setIntervalId(myIntervalID);
      setFlag(true);
    } else {
      clearInterval(intervalId);
      setFlag(false);
    }
  }

  return (
    <>
      

    <div className=''>
      <div id="buttondiv" className='d-flex justify-content-center'>
        {!flag 
          ? <button  
              type="button"  
              className="btn btn-success btn-lg rounded-circle m-2 fs-2 text " 
              onClick={handleClick}
              >
                <VscDebugStart />
            </button>
          : <button  
              type="button"  
              className="btn btn-danger btn-lg rounded-circle m-2 fs-2 text" 
              onClick={handleClick}
              >
                <BiStopCircle />
            </button>
        }
      </div>
        <p id="paragraph1"></p>
        <Line data={data} />
      </div>
    
    </>
  )
}
