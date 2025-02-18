import { ChangeEvent, useState } from "react";
import Navbar from "../../globals/components/Navbar";
import { IData, PaymentMethod } from "./types";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import store from "../../store/store";

function Checkout() {
    const dispatch= useDispatch();
    const {items}=useAppSelector((store)=>store.cart)
    const total=items.reduce((total,item)=>item.Product.productPrice *item.quantity +item, 0);

    const [data,setData]=useState<IData>({
        firstName : "", 
        lastName : "", 
        addressLine : "", 
        city : "", 
        totalAmount : 0, 
        zipCode : "", 
        email : "", 
        phoneNumber : "", 
        state : "", 
        paymentMethod : PaymentMethod.Cod, 
        products : []        
        
    })
    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setData({
            ...data,
            [name]: value
        })
    }
    const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const productData=items.length >0 ? items.map((item)=>{
            return {
                productId : item.Product.id,
                quantity : item.quantity
            }
        }):[]
        const finalData={
            ...data,
            products : productData
            ,totalAmount : total

        }
        dispatch(orderIe)
    }

  return (
    <>
      <Navbar />

      <div className="font-[sans-serif] bg-white">
        <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
          <div className="bg-gray-100 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
            <div className="relative h-full">
              <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
                      <img
                        src="https://readymadeui.com/images/product10.webp"
                        className="w-full object-contain"
                      />
                    </div>
                    <div className="w-full">
                      <h3 className="text-sm lg:text-base text-gray-800">
                        Split Sneakers
                      </h3>
                      <ul className="text-xs text-gray-800 space-y-1 mt-3">
                        <li className="flex flex-wrap gap-4">
                          Size <span className="ml-auto">37</span>
                        </li>
                        <li className="flex flex-wrap gap-4">
                          Quantity <span className="ml-auto">2</span>
                        </li>
                        <li className="flex flex-wrap gap-4">
                          Total Price <span className="ml-auto">$40</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
                      <img
                        src="https://readymadeui.com/images/product11.webp"
                        className="w-full object-contain"
                      />
                    </div>
                    <div className="w-full">
                      <h3 className="text-sm lg:text-base text-gray-800">
                        Velvet Boots
                      </h3>
                      <ul className="text-xs text-gray-800 space-y-1 mt-3">
                        <li>
                          Size <span className="float-right">37</span>
                        </li>
                        <li>
                          Quantity <span className="float-right">2</span>
                        </li>
                        <li>
                          Total Price <span className="float-right">$40</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
                      <img
                        src="https://readymadeui.com/images/product14.webp"
                        className="w-full object-contain"
                      />
                    </div>
                    <div className="w-full">
                      <h3 className="text-sm lg:text-base text-gray-800">
                        Echo Elegance
                      </h3>
                      <ul className="text-xs text-gray-800 space-y-1 mt-3">
                        <li>
                          Size <span className="float-right">37</span>
                        </li>
                        <li>
                          Quantity <span className="float-right">2</span>
                        </li>
                        <li>
                          Total Price <span className="float-right">$40</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
                      <img
                        src="https://readymadeui.com/images/product13.webp"
                        className="w-full object-contain"
                      />
                    </div>
                    <div className="w-full">
                      <h3 className="text-sm lg:text-base text-gray-800">
                        Pumps
                      </h3>
                      <ul className="text-xs text-gray-800 space-y-1 mt-3">
                        <li>
                          Size <span className="float-right">37</span>
                        </li>
                        <li>
                          Quantity <span className="float-right">2</span>
                        </li>
                        <li>
                          Total Price <span className="float-right">$40</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:absolute md:left-0 md:bottom-0 bg-gray-200 w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-sm lg:text-base text-gray-800">
                  Total <span className="ml-auto">$84.00</span>
                </h4>
              </div>
            </div>
          </div>
          <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
            <h2 className="text-2xl font-bold text-gray-800">
              Complete your order
            </h2>
            <form className="mt-8">
              <div>
                <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Phone No."
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                  Shipping Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Address Line"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="State"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Zip Code"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                </div>
                <div className="flex gap-4 max-md:flex-col mt-8">
                  <button
                    type="button"
                    className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
