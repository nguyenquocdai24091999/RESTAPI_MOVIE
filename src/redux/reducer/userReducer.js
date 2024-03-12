import { createSlice } from "@reduxjs/toolkit";
import { localServices } from "../../Services/localServices";

const initialState = {
    userLogin: localServices.get()
}

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserLogin: (state, action) => { 
      state.userLogin = action.payload;
     }
  }
})
export const {setUserLogin} = userReducer.actions;
export default userReducer.reducer;