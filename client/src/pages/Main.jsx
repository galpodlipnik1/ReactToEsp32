import React, { useState, useEffect } from 'react'
import { getLedStatus, ledOff, ledOn, getTempAndHumidity } from '../actions/index';


const Main = () => {
  const [ledStatus, setLedStatus] = useState(false);
  const [TempHumidity, setTempHumidity] = useState({temp: 0, humidity: 0});

  useEffect(() => {
    const getLedStatusFnc = async () => {
      const data = await getLedStatus();
      const TH = await getTempAndHumidity();
      setLedStatus(data);
      setTempHumidity({temp: TH.temp, humidity: TH.humidity});
    }

    getLedStatusFnc();
  }, []);

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
          <p className='text-black underline ml-1'>{TempHumidity.temp} °C</p>
        </div>
        <div className='flex justify-between flex-row mt-10'>
          <h3>Humidity:</h3>
          <p className='text-black underline ml-1'>{TempHumidity.humidity} %</p>
        </div>
      </div> 
    </div>
  )
}

export default Main