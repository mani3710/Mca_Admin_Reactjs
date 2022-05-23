import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../config/api';
export const getStudentList = createAsyncThunk(
    'student/getStudentList',
    async () => {
        try {

            const result = await API.get(`/student/getall`);
            console.log(result.data);
            return { result: result.data };

        } catch (error) {
            alert(error);
        }
    });



const studentSclice = createSlice({
    name: "student",
    initialState: {
        studentLoader: false,
        studentListData: [],
        selectedstudentDataList: []

    },
    reducers: {
        setSelectedstudentDataList: (state, action) => {
            state.selectedstudentDataList = [...state.selectedstudentDataList, action.payload];
        },
        removeSelectedStudentList: (state, action) => {

            let newObj = state.selectedstudentDataList;
            newObj.splice(action.payload, 1)
            state.selectedstudentDataList = newObj;
        },
        emptySelectedstudentDataList: (state, action) => {

            state.selectedstudentDataList = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStudentList.pending, (state) => {
            state.staffLoader = true;
            state.loginStatus = "";

        });
        builder.addCase(getStudentList.fulfilled, (state, action) => {
            state.staffLoader = false;
            if (action.payload.result.message == "Success") {
                state.studentListData = action.payload.result.data;
            } else {
                state.studentListData = [];
            }

        });
        builder.addCase(getStudentList.rejected, (state) => {
            state.staffLoader = false;

        });

    }
});
export const {
    setSelectedstudentDataList,
    removeSelectedStudentList,
    emptySelectedstudentDataList
} = studentSclice.actions;

export default studentSclice.reducer;