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
export const createStaff = createAsyncThunk(
    'staff/createStaff',
    async (body) => {

        console.log("body createStaff", body)

        const result = await API.post(`/staff/createStaff`, body);
        return { result: result.data };


    });


const staffSclice = createSlice({
    name: "staff",
    initialState: {
        staffLoader: false,
        staffListData: [],
        selectedStaffList: [],
        staffCreationStatus: ""

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
        },
        emptyStaffCreationStatus: (state, action) => {
            state.staffCreationStatus = "";
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

        builder.addCase(createStaff.pending, (state) => {
            state.staffLoader = true;
            state.staffCreationStatus = "";

        });
        builder.addCase(createStaff.fulfilled, (state, action) => {
            state.staffLoader = false;
            if (action.payload.result.status == 200) {
                state.staffCreationStatus = "success";
            } else {
                state.staffCreationStatus = "failed"
            }

        });
        builder.addCase(createStaff.rejected, (state) => {
            state.staffLoader = false;
            state.staffCreationStatus = "failed";

        });

    }
});
export const {
    setSelectedStaffList,
    removeSelectedStaffList,
    emptySelectedStaffList,
    emptyStaffCreationStatus
} = staffSclice.actions;

export default staffSclice.reducer;