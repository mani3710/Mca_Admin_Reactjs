import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../config/api';
export const getStaffList = createAsyncThunk(
    'staffSclice/getStaffList',
    async () => {
        try {

            const result = await API.get(`/staff/getall`);
            console.log(result.data);
            return { result: result.data };

        } catch (error) {
            alert(error);
        }
    });



const staffSclice = createSlice({
    name: "staff",
    initialState: {
        staffLoader: false,
        staffListData: [],
        selectedStaffList: []

    },
    reducers: {
        setSelectedStaffList: (state, action) => {
            state.selectedStaffList = [...state.selectedStaffList, action.payload];
        },
        removeSelectedStaffList: (state, action) => {

            let newObj = state.selectedStaffList;
            newObj.splice(action.payload, 1)
            state.selectedStaffList = newObj;
        },
        emptySelectedStaffList: (state, action) => {
            state.selectedStaffList = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStaffList.pending, (state) => {
            state.staffLoader = true;
            state.loginStatus = "";

        });
        builder.addCase(getStaffList.fulfilled, (state, action) => {
            state.staffLoader = false;
            if (action.payload.result.message == "Success") {
                state.staffListData = action.payload.result.data;
            } else {
                state.staffListData = [];
            }

        });
        builder.addCase(getStaffList.rejected, (state) => {
            state.staffLoader = false;

        });

    }
});
export const {
    setSelectedStaffList,
    removeSelectedStaffList,
    emptySelectedStaffList
} = staffSclice.actions;

export default staffSclice.reducer;