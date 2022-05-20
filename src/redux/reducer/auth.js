import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../config/api';
export const login = createAsyncThunk(
    'auth/login',
    async (body) => {
        try {
            console.log(body)
            const result = await API.post("/admin/signin", body)
            console.log(result.data);
            return { result: result.data };

        } catch (error) {
            alert(error);
        }
    });



const authSclice = createSlice({
    name: "auth",
    initialState: {
        authLoader: false,
        adminDetails: {
            uuid: "",
            username: "",
            password: ""
        },
        loginStatus: ""

    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.authLoader = true;
            state.loginStatus = "";

        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.authLoader = false;
            if (action.payload.result.message == "Successfully signin") {
                state.adminDetails = action.payload.result.data;
                state.loginStatus = action.payload.result.message;
            } else {
                state.loginStatus = action.payload.result.message;
            }

        });
        builder.addCase(login.rejected, (state) => {
            state.authLoader = false;

        });







    }
});


export default authSclice.reducer;