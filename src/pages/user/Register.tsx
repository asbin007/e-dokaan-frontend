// this is wihout type hook 
//insetion or update garni bela ,POST, PUT , DELETE, GET, PATCH,update --> useDispatch()==> kunai action garnu pary vane pani 
// kunai action garnu pary vane useDispatch() use garne

import {  useAppSelector } from "../../store/hooks";
import { setAge, setName } from "../../store/userSlice";


// const dispatch = useDispatch();


// kunai slice bata data nikalnu pary vane useSelector() use garne
// const name = useSelector((state) => state.user.name);

const Register = () => {
  const data = useAppSelector((store) => store.user);
  console.log(data);
  const dispatch = useDispatch();
  dispatch(setName("lorem"));
  dispatch(setAge("25"));





  return (
    <div>Register</div>
  )
}


export default Register