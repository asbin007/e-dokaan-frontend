import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { fetchCartItems } from "../../store/cartlSlice";

function Navbar() {
  const reduxToken = useAppSelector((store) => store.auth.user.token);
  console.log("reduxToken:", reduxToken);

  const localStorageToken = localStorage.getItem("tokenHoYo");
  console.log("local", localStorageToken);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { items } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();
  const navigate= useNavigate()
  useEffect(() => {
    console.log(localStorageToken, reduxToken);

    setIsLoggedIn(!!localStorageToken || !!reduxToken);
    if (isLoggedIn) {
      dispatch(fetchCartItems());
    }
    // if(reduxToken && localStorageToken){
    // setIsLoggedIn(false)

    // }
  }, [isLoggedIn]);


  console.log(localStorageToken, reduxToken);

  console.log(isLoggedIn);

  return (
    <header className="sticky top-0 bg-white shadow">
      <div className="container flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8">
        <div className="flex items-center text-2xl">
          <div className="w-12 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path
                fill="#BEE3F8"
                d="M44,7L4,23l40,16l-7-16L44,7z M36,23H17l18-7l1,6V23z"
              />
              <path
                fill="#3182CE"
                d="M40.212,10.669l-5.044,11.529L34.817,23l0.351,0.802l5.044,11.529L9.385,23L40.212,10.669 M44,7L4,23 l40,16l-7-16L44,7L44,7z"
              ></path>
              <path
                fill="#3182CE"
                d="M36,22l-1-6l-18,7l17,7l-2-5l-8-2h12V22z M27.661,21l5.771-2.244L33.806,21H27.661z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex mt-4 sm:mt-0">
          <Link className="px-4" to="/product">
            Products
          </Link>

          <a className="px-4" href="/my-orders">
            My Order
          </a>
          <a className="px-4" href="#services">
            Services
          </a>
          <a className="px-4" href="#stats">
            Stats
          </a>
          <a className="px-4" href="#testimonials">
            Testimonials
          </a>
        </div>

        <div className="hidden md:block">
          {isLoggedIn ? (
            <>
              <span className="mr-[10px]">
                 <button onClick={()=>navigate('/my-cart')}>
                  Cart <sup>{items?.length > 0 ? items?.length : 0}</sup>
                  </button>
              </span>
              <Link to="/logout">
                <button
                  type="button"
                  className="mr-5 py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white "
                >
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/register">
                <button
                  type="button"
                  className="mr-5 py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white "
                >
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button
                  type="button"
                  className=" py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white "
                >
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
