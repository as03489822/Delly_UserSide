import Card from '../../components/Card'
import { useEffect, useState } from 'react';

export const Deals = () => {
    let [data ,setData] = useState([])
    useEffect(() => {
        fetch('/data.json') 
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((jsonData) => setData(jsonData.items))
          .catch((error) => console.error('Error fetching JSON:', error));
      }, []);
      const firstThreeDeals = data.slice(0, 3);
  return (
    <div className=" flex px-4 justify-center py-16 md:py-20 ">
        {/* title % button */}
        <div className="md:w-[1200px] bg-white flex gap-10 flex-col ">
            <div className="w-full flex justify-between items-center">
                <div className='' >
                    <h1 className="text-[34px] md:text-[60px] font-semibold leading-[70px]">Nearby <span className="text-[#219653]">Deals</span></h1>
                    <p className='text-[14px] outfit'>Explore nearby deals on map and buy deals to enjoy quality food with your family</p>
                </div>
                <button className="hidden md:block outfit text-[16px] rounded-full py-3 px-5 bg-[#013D29]  text-white">View on Map</button>
            </div>
            {/* card */}
            <div  className='flex gap-10 flex-col md:flex-row justify-between  '>
            {firstThreeDeals.map((deal, index) => (
            <Card key={index} data={deal} />
          ))}
            </div>
        </div>
    </div>
  )
}
