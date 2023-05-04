import React , {useState , useEffect} from "react";
import { useSelector , useDispatch } from "react-redux";
import { getUserData, loginUser  , logOut} from "./redux/reducers/userReducer";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Actions from "./Actions";

const App = () => {
  const todos = useSelector((state) => state.todos);
  const user = useSelector((state) => state.user);
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [remember , setRemember] = useState(false)
  const dispatch =  useDispatch()
  let token = localStorage.getItem('access_token')

  useEffect(() => {
    if(user.isLoggedIn || token){
      dispatch(getUserData())
    }
  }, [token]);


  const login = () => {
    dispatch(loginUser(email , password , remember))
  } 

  return (
    <div className="wrapper">
      <h1 className="logo">ToDo List w/ Redux Toolkit</h1>
      <TodoForm />
      <TodoList todos={todos} />
      <Actions />
      {/* <div>
        {user.isLoggedIn ? 
          <h1>Welcome {user.data.first_name} {user.data.last_name} <button onClick={()=>{ dispatch(logOut())  }  } className="btn btn-primary">Log out</button> </h1> : 
          <>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input onChange={(e)=>{  setEmail(e.target.value)  }}  type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input onChange={(e)=>{  setPassword(e.target.value)  }}  type="password" class="form-control" id="exampleInputPassword1" />
              </div>
              <div class="mb-3 form-check">
                <input onChange={(e)=>{  setRemember(e.target.checked)  }}  type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button onClick={()=>{  login() }} type="submit" class="btn btn-primary">Submit</button>
          </>
        }
      </div> */}
    </div>
  );
};

export default App;