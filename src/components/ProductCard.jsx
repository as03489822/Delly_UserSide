import PropTypes from "prop-types";
import CardRating from "./CardRating"
import Union from '../assets/Card/Union.svg'

export const ProductCard = ({data}) => {
  return (
    <div className="w-[280px] ">
        {/* image */}
        <div className="relative">
            <img className=" w-full h-[150px] object-cover border rounded-lg" src={data.image} alt="" />
        </div>
        {/* title  */}
        <div className="flex justify-between pt-3 px-3">
            <div className="flex justify-start items-center">
                <CardRating rating={data.rating}/>
            </div>
            <div  className="flex justify-end items-center gap-2">
                <img src={Union} alt="" />
                <p className="outfit text-[12px]">Flat {data.saleOff}% Off</p>
            </div>
        </div>
        {/* rating & sale */}    
        <div  className="relative flex flex-col gap-1 pt-3 px-3">
            <h1 className="text-[16px] font-[600] outfit">{data.title}</h1>
        </div>
        {/* price & button */}
        <div className="flex justify-between px-3 py-3">
        <h1 className="text-[16px] font-[600] outfit">{data.price}&nbsp; $</h1>
            <button  className="bg-[#219653] py-1 px-3 text-white outfit rounded-full">
                Add To Cart
            </button>
        </div>
    </div>
  )
}
ProductCard.propTypes = {
  data: PropTypes.shape({
    id:PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    saleOff: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired
};
