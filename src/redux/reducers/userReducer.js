import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialUser = {
    isLoggedIn: false,
    data: {},
    message: "",
    notify:false,
    loading:false,
};


export const getUserData = createAsyncThunk(
    'getUserData',
    async () => {
      const response = await axios.get('https://reqres.in/api/users/2')
      return response.data
    }
)


export const loginUser = createAsyncThunk(
    'loginUser',
    async (e , p , r) => {
      const response = await axios.post('https://reqres.in/api/login' , {
        username:e , password:p
      })
      return {
        ...response.data, 
        remember:r
      }
    }
)

const usersSlice = createSlice({
    name: 'user',
    initialState:initialUser,
    reducers: {
        logOut:(state , action) => {
            localStorage.removeItem('access_token')
            return initialUser
        }
      // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(loginUser.pending, (state, action) => {
        state = {
            ...initialUser ,
            loading: true,
        }
      })
      builder.addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload)
        localStorage.setItem('access_token' , action.payload.token)
        return {
            data: initialUser.data,
            isLoggedIn: action.payload.token !== null ?  true : false,
            message: "",
            notify:false,
            loading: false,
        }
      })

      builder.addCase(loginUser.rejected, (state, action) => {
        console.log(state , action.payload)
        state = {
            ...initialUser,
            message: action.payload.message,
            notify:true,
            loading: false,
        }
      })
      builder.addCase(getUserData.rejected, (state, action) => {
        console.log(state , action.payload)
        state = {
            ...initialUser,
            message: action.payload.message,
            notify:true,
            loading: false,
        }
      })
      builder.addCase(getUserData.pending, (state, action) => {
        state = {
            ...initialUser ,
            loading: true,
        }
      })
      builder.addCase(getUserData.fulfilled, (state, action) => {
        console.log(action)
        return {
            data: action.payload.data,
            isLoggedIn: true,
            message: "",
            notify:false,
            loading: false,
        }
      })
    },
})


export const {
    logOut
  } = usersSlice.actions;
  
  export default usersSlice.reducer;