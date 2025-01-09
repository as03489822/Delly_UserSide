import Object from '../../assets/Hero/OBJECTS.png'
import Image from '../../assets/Hero/2c5598627d268e8c9154dc45635c709d.jpeg'
import playIcon from '../../assets/Hero/Play Circle.svg'
import { SearchForm } from './SearchForm'
import { Detail } from './Detail'

export const Hero = () => {
  return (
    <>
    <div className=' md:flex  w-full md:h-[600px] z-0 overflow-hidden' >
        <div className='px-4 md:px-0 relative md:w-[60%] h-[475px] md:h-full bg-[#F0FFF8] flex flex-col items-center pt-16 md:pt-28 '>
            <div className='md:w-[60%] flex flex-col gap-5 z-10'>      
            <h1 className='text-[44px] md:text-[64px] font-bold outfit leading-[44px] md:leading-[64px]'>Get The Best <span className='text-[#219653]'>Deals</span> Near By You!</h1>
            <p className='text-[ 18px] w-[80%] md:w-[50%] outfit'>Explore nearby deals on map and buy deals to enjoy quality food with your family</p>
            <button className='md:mt-5 bg-[#013D29] w-[40%] md:w-[20%] rounded-full text-white outfit py-3 px-5'>Explore</button>
            </div>
            <img className='absolute bottom-0 md:bottom-[60px] right-[-70px] z-0 ' src={Object} />
        </div>
        <div className='relative h-[475px] md:w-[40%] z-10'>
            <img className=' object-cover' src={Image} alt="" />
            <div className='z-20 absolute rounded-full top-[35%] left-[35%] md:left-[40%] h-[120px] w-[120px] md:h-[141px] md:w-[141px] bg-[#219653] flex justify-center items-center'>
                <img className=' h-[55px] w-[55px] cursor-pointer' src={playIcon} alt="" />
            </div>
        </div>
    </div>
    <SearchForm />
    <Detail />
    </>
  )
}
