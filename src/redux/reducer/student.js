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
export const createStudent = createAsyncThunk(
    'student/createStudent',
    async (body) => {


        console.log("body createStudent", body)

        const result = await API.post(`/student/create`, body);
        return { result: result.data };


    });


const studentSclice = createSlice({
    name: "student",
    initialState: {
        studentLoader: false,
        studentListData: [],
        selectedstudentDataList: [],
        studentCreationStatus: ""

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
        },
        emptyStudentCreationStatus: (state, action) => {

            state.studentCreationStatus = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStudentList.pending, (state) => {
            state.studentLoader = true;
            state.loginStatus = "";

        });
        builder.addCase(getStudentList.fulfilled, (state, action) => {
            state.studentLoader = false;
            if (action.payload.result.message == "Success") {
                state.studentListData = action.payload.result.data;
            } else {
                state.studentListData = [];
            }

        });
        builder.addCase(getStudentList.rejected, (state) => {
            state.studentLoader = false;

        });

        builder.addCase(createStudent.pending, (state) => {
            state.studentLoader = true;
            state.staffCreationStatus = "";

        });
        builder.addCase(createStudent.fulfilled, (state, action) => {
            state.studentLoader = false;
            if (action.payload.result.status == 200) {
                state.studentCreationStatus = "success";
            } else {
                state.studentCreationStatus = "failed"
            }

        });
        builder.addCase(createStudent.rejected, (state) => {
            state.studentLoader = false;
            state.studentCreationStatus = "failed";

        });

    }
});
export const {
    setSelectedstudentDataList,
    removeSelectedStudentList,
    emptySelectedstudentDataList,
    emptyStudentCreationStatus
} = studentSclice.actions;

export default studentSclice.reducer;