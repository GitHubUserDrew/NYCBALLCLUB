import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";



export const login = createAsyncThunk('login', async ({username, password})=>{
    let user =await  axios.post("/auth/login",{username,password});
    console.log(user);
    return user.data;

}
)

export const register = createAsyncThunk('register', async ({username, email, password})=>{
    let user =await  axios.post("/auth/register",{username, email,password});
    return user.data;

}
)

export const getUser = createAsyncThunk('getUser',async()=>{
    try{
        return (await axios.get('/auth/me' )).data
    }catch(err){
        return null;
    }
})


export const logout = createAsyncThunk('logout', async()=>{
    return await axios.get('/auth/logout')
})

export const authSlice = createSlice({
    name: "auth",
    initialState: null,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(login.fulfilled, (state , action)=>{
            console.log(action);
            return action.payload;
        })
        builder.addCase(register.fulfilled, (state, action)=>{
            return action.payload;
        })
        builder.addCase(logout.fulfilled, (state, action)=>{
            return null;
        })
        builder.addCase(getUser.fulfilled, (state, action)=>{
            return action.payload;
        })
    }
})

export default authSlice.reducer;