import React, { useState, useEffect } from 'react'
import { getLedStatus, ledOff, ledOn, getTempAndHumidity } from '../actions/index';


const Main = () => {
  const [ledStatus, setLedStatus] = useState(null);
  const [TempHumidity, setTempHumidity] = useState({temp: 0, humidity: 0});

  useEffect(() => {
    
    (async () => {
      getLedStatus().then((res) => {
        setLedStatus(res.data.led);
      });
      
      getTempAndHumidity().then((res) => {
        setTempHumidity({temp: res.data.temp, humidity: res.data.humidity});
      });
    }) ();

  }, []);

  useEffect(() => {
    console.log('Status: ' + ledStatus);
    console.log('Temp&Hum: ' + TempHumidity.humidity + ',' + TempHumidity.temp);
  }, [ledStatus, TempHumidity]);

  const handleLedOn = async () => {
    await ledOn();
    setLedStatus(true);
  };

  const handleLedOff = async () => {
    await ledOff();
    setLedStatus(false);
  };

  return (
    <div className='w-full h-full flex justify-center items-center flex-col'>
      <div className='flex w-4/12 flex-col mt-5'>
        <div className={`flex justify-between flex-row ${ledStatus === true ? 'green' : 'red'}`}>
          <h3>Led Status:</h3>
          <p className='text-black underline'>{ledStatus === true ? 'On' : 'Off'}</p>
        </div>
        <div className='flex justify-around flex-row mt-10'>
          <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={handleLedOn}>Led On</button>
          <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={handleLedOff}>Led Off</button>
        </div>
      </div>
      <div className='w-full h-full'>
        <br className='w-full h-full mt-10'/>
      </div>
      <div className='flex w-4/12 flex-col mt-5'>
        <div className='flex justify-between flex-row'>
          <h3>Temperature:</h3>
          <p className='text-black underline ml-1'>{TempHumidity.temp || 0} °C</p>
        </div>
        <div className='flex justify-between flex-row mt-10'>
          <h3>Humidity:</h3>
          <p className='text-black underline ml-1'>{TempHumidity.humidity || 0} %</p>
        </div>
      </div> 
    </div>
  )
}

export default Main