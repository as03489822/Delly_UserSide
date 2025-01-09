import CardRating from "./CardRating"
import Union from '../assets/Card/Union.svg'
import { useEffect, useState } from "react"

import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux"


export const Cart = () => {
  let dispatch = useDispatch()
  let [CartData , setCartData] = useState(null)
  let [id , setId] = useState(null);
  // let [empty ,setEmpty] = useState(true)
  
  const token= localStorage.getItem('token')
  useEffect(() => {
    if(token) {
      setId(jwtDecode(token).id);  
    }
  }, [token]);

  useEffect(()=>{
    setCartData(JSON.parse(localStorage.getItem('cart')))
  },[CartData])

  let countIncrement=(card)=>{
    let updatedCart = CartData.map((item) =>
      item.id === card.id && item.userId === id
        ? { ...item, count: item.count + 1 }
        : item
    );  
      localStorage.setItem('cart', JSON.stringify(updatedCart));    
      dispatch({ type: 'ADD CART' });
  }

  let countDecrement=(card)=>{
    let updatedCart = CartData.map((item) =>
      item.id === card.id && item.userId === id && item.count > 1
        ? { ...item, count: item.count - 1 }
        : item
    );
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));    
    dispatch({ type: 'REMOVE CART' });
  }


  return (

    <div className="   h-[100vh] flex justify-center  items-center">
      <div className=" w-[900px] rounded-lg  border border-[#013D29]">
        <div className="px-10  h-[100px] bg-[#013D29] outfit ">
          <h1 className="text-[60px] text-white font-semibold">Cart</h1>
        </div>

        <div className="overflow-y-auto py-6 flex flex-col gap-5 items-center h-[500px]">
          {CartData?.map((card,idx)=>{
            if(card.userId == id){
              return (<div className="w-[80%]  flex gap-5 shadow-lg  bg-white shadow-gray rounded-lg   " key={idx}>
              {/* image */}
              <div className="w-[380px] h-[200px] overflow-hidden">
                <img className="w-[380px] h-[200px] rounded-tl-lg rounded-bl-lg object-cover" src={card.image} alt="" />
              </div>
              {/* details */}
              <div className="flex flex-col justify-around">
                <div className="flex relative">
                <h1 className="text-[24px] font-[600] outfit">{card.title}</h1>
                <i className=" absolute top-[-10px] right-[-35px] fa-solid fa-xmark"></i>
                </div>
                <div className="flex justify-between pt-3 px-3">
                  <div className="flex justify-start items-center">
                    <CardRating rating={card.rating}/>
                  </div>
                  <div  className="flex justify-end items-center gap-2">
                   <img src={Union} alt="" />
                    <p className="outfit text-[12px]">Flat {card.saleOff}% Off</p>
                  </div>
                </div>
                <div className="flex justify-between outfit items-center px-3 py-3">
                  <button className="bg-[#fcefc0]  flex gap-5 items-center px-4 rounded-full text-lg font-bold">
                    <i onClick={() => countDecrement(card)} className="fa-solid fa-minus"></i>
                    <span>{card.count}</span>
                    <i onClick={() => countIncrement(card)} className="fa-solid fa-plus"></i>
                  </button>
                  <button className="bg-[#219653] py-1 px-3 text-white rounded-full">Get Offer</button>
                </div>
              </div>
            </div>
          );
          }
          return null;
          })
          }
        </div>
        </div>    
      </div>
  )
}

