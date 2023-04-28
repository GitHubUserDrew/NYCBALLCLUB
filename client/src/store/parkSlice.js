import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import  axios  from 'axios';


export const getParks =createAsyncThunk("Get parks", async()=>{
    return (await axios.get("/parks/")).data
})

 const parkSlice = createSlice(
    {
        name:"parks",
        initialState:[],
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getParks.fulfilled, (state , action)=>{
                return action.payload;
            })
        }
    }
)

export default parkSlice.reducer

