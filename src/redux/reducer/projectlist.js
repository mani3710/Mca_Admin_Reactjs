import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../config/api';
export const getProjectList = createAsyncThunk(
    'projectlist/getProjectList',
    async (uuid) => {
        try {
            console.log(uuid)
            const result = await API.get(`/admin/getprojectList?adminid=${uuid}`);
            console.log(result.data);
            return { result: result.data };

        } catch (error) {
            alert(error);
        }
    });
export const createNewProject = createAsyncThunk(
    'projectlist/createNewProject',
    async (body) => {
        try {
            console.log(body)
            const result = await API.post(`/admin/create/projectreview`, body);
            console.log(result.data);
            return { result: result.data };

        } catch (error) {
            alert(error);
        }
    });

// export const assignStaff = createAsyncThunk(
//     'projectlist/assignStaff',
//     async (bodyArray) => {
//         try {
//             console.log(bodyArray)
//             const result = await API.post(`/admin/create/projectreview`, body);

//             return { result: result.data };

//         } catch (error) {
//             alert(error);
//         }
//     });

const projectlistSclice = createSlice({
    name: "projectlist",
    initialState: {
        projectLoader: false,
        projectListData: [],


    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProjectList.pending, (state) => {
            state.projectLoader = true;
            state.loginStatus = "";

        });
        builder.addCase(getProjectList.fulfilled, (state, action) => {
            state.projectLoader = false;
            if (action.payload.result.message == "success") {
                state.projectListData = action.payload.result.data;
            } else {
                state.projectListData = [];
            }

        });
        builder.addCase(getProjectList.rejected, (state) => {
            state.projectLoader = false;

        });

        builder.addCase(createNewProject.pending, (state) => {
            state.projectLoader = true;
            state.loginStatus = "";

        });
        builder.addCase(createNewProject.fulfilled, (state, action) => {
            state.projectLoader = false;

        });
        builder.addCase(createNewProject.rejected, (state) => {
            state.projectLoader = false;

        });







    }
});


export default projectlistSclice.reducer;