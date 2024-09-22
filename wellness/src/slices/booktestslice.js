import { createSlice } from "@reduxjs/toolkit";

export const booknameslice = createSlice({
    name:'Bookdetails',
    initialState:{
        nameofhospital : "",
        hospitaladdress:"",
        testprice:"",
    },

    reducers:{
        setHospName:(state,action)=>{
            console.log('Setting hosp name:', action.payload);
            state.nameofhospital = action.payload;

        },

        setHospAdd : (state,action) =>{
            console.log('Setting hosp add:', action.payload);
            state.hospitaladdress = action.payload;

        },
        setHospTestPrice : (state,action) =>{
            console.log('Setting hosp price:', action.payload);
            state.testprice = action.payload;

        }
    }
})


export const {setHospName,setHospAdd,setHospTestPrice} = booknameslice.actions;
export default booknameslice.reducer;
