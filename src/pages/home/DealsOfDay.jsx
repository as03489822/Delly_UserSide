
import Card from '../../components/Card'
import  { useEffect, useState } from 'react';

export const DealsOfDay = () => {
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
      const firstThreeDeals = data.slice(3, 7);
  return (
    <div className="bg-[#FCF5DC] flex px-4 justify-center py-16 md:py-20 ">
        {/* title % button */}
        <div className="md:w-[1200px]  flex gap-10 flex-col ">
            <div className="w-full flex justify-between items-center">
                <div className='' >
                    <h1 className="text-[34px] md:text-[60px] font-semibold leading-[70px]">Deals of <span className="text-[#219653]">The Day</span></h1>
                    <p className='text-[14px] outfit'>Find deals of the day here & save money with offers and avail wide discounts on everything.</p>
                </div>
                <button className="hidden md:block outfit text-[16px] rounded-full py-3 px-5 bg-[#013D29]  text-white">View on Map</button>
            </div>
            {/* card */}
            <div  className='flex gap-10 flex-col md:flex-row justify-between  '>
            {firstThreeDeals.map((deal, index) => (
            <Card key={index} data={deal } />
          ))}
            </div>
        </div>
    </div>
  )
}