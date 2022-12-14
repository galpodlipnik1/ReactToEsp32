import React, { useState, useEffect } from 'react'
import { getLedStatus, ledOff, ledOn, getTempAndHumidity } from '../actions/index';

import backgroundImage from '../images/white-texture-background.jpg'


const Main = () => {
  const [ledStatus, setLedStatus] = useState(null);
  const [TempHumidity, setTempHumidity] = useState({temp: 0, humidity: 0});

  const [placeholderStatus, setPlaceHolderStatus] = useState(false)

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
    // <div className='w-full h-full flex justify-center items-center flex-col'>
    //   <div className='flex w-4/12 flex-col mt-5'>
    //     <div className="flex justify-center">
    //       <h1 className="text-3xl underline">Delavnica</h1>
    //     </div>
    //     <div className={`flex justify-between flex-row ${ledStatus === true ? 'green' : 'red'}`}>
    //       <h3>Je Prižgan:</h3>
    //       <p className='text-black underline'>{ledStatus === true ? 'Ja' : 'Ne'}</p>
    //     </div>
    //     <div className='w-full flex justify-around flex-row mt-10'>
    //       <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={handleLedOn}>Led On</button>
    //       <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={handleLedOff}>Led Off</button>
    //     </div>
    //   </div>
    //   <div className='w-full h-full'>
    //     <br className='w-full h-full mt-10'/>
    //   </div>
    //   <div className='flex w-4/12 flex-col mt-5'>
    //     <div className='flex justify-between flex-row'>
    //       <h3>Temperature:</h3>
    //       <p className='text-black underline ml-1'>{Number(TempHumidity.temp).toPrecision(4) || 0} °C</p>
    //     </div>
    //     <div className='flex justify-between flex-row mt-10'>
    //       <h3>Humidity:</h3>
    //       <p className='text-black underline ml-1'>{Number(TempHumidity.humidity).toPrecision(4) || 0} %</p>
    //     </div>
    //   </div> 
    // </div>
    <div className="bg-gradient-to-r from-gray-100 to-gray-100/30 w-full h-screen font-sans p-[5%]">
        <div className="flex items-center flex-col">
          <h1 className="m-2 text-4xl text-gray-800 font-bold">ESP32 Status Page</h1>
          <h2 className="m-2 text-xl text-gray-600 font-bold">Delavnica pri predmetu RVP4</h2>
        </div>
        <div className="flex items-center flex-col mt-[2rem]">
          <div className="flex justify-between items-center w-[50%] bg-white px-4 py-3 border-2">
            <h1>LED 1</h1>
            {placeholderStatus === true ? <p className="bg-green-500 px-3 py-1 rounded-md text-white font-bold uppercase">Prižgana</p> : <p className="bg-red-500 px-3 py-1 rounded-md text-white font-bold uppercase">Ugasnjena</p>}
          </div>
          <div className="flex justify-between items-center w-[50%] bg-white px-4 py-3 border-x-2 border-b-2">
            <h1>LED 2</h1>
            {placeholderStatus === true ? <p className="bg-green-500 px-3 py-1 rounded-md text-white font-bold uppercase">Prižgana</p> : <p className="bg-red-500 px-3 py-1 rounded-md text-white font-bold uppercase">Ugasnjena</p>}
          
          </div>
        </div>
    </div>
  )
}

export default Main