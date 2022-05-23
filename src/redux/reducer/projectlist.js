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
            return { result: body };

        } catch (error) {
            alert(error);
        }
    });

export const createBatch = createAsyncThunk(
    'projectlist/createBatch',
    async (bodyArray) => {
        try {
            console.log(bodyArray)
            for (let body of bodyArray) {
                const result = await API.post(`/admin/createBatch`, body);
                console.log("body", body);
                console.log("result", result.data);
            }
            return { result: bodyArray };

        } catch (error) {
            alert(error);
        }
    });
export const assignStaffAndStudent = createAsyncThunk(
    'projectlist/assignStaffAndStudent',
    async (bodyArray) => {
        try {

            for (let staffBody of bodyArray.staff) {
                await API.post(`/admin/assignStaff`, staffBody);
            }
            for (let studentBody of bodyArray.student) {
                await API.post(`/admin/assignStudent`, studentBody);
            }
            return { result: bodyArray.batch };


        } catch (error) {
            alert(error);
        }
    });
const projectlistSclice = createSlice({
    name: "projectlist",
    initialState: {
        projectLoader: false,
        projectListData: [],
        currentProjectDetails: {},
        batchListData: [
            {
                "adminid": "029a62a4-c378-11ec-9d64-0242ac120002",
                "projectid": "1becfccb-798c-4faf-b4e1-cae42dcfdd5a",
                "title": "batch 1",
                "uuid": "013e81df-b697-48f2-ae08-4b35ebc9bafc",
                "status": "Pending"
            },
            {
                "adminid": "029a62a4-c378-11ec-9d64-0242ac120002",
                "projectid": "1becfccb-798c-4faf-b4e1-cae42dcfdd5a",
                "title": "batch 2",
                "uuid": "4c17ea2d-de3d-4fab-a2c7-30a6ff70b424",
                "status": "Pending"
            }
        ],
        selectedBatchData: {
            "adminid": "029a62a4-c378-11ec-9d64-0242ac120002",
            "projectid": "1becfccb-798c-4faf-b4e1-cae42dcfdd5a",
            "title": "batch 1",
            "uuid": "013e81df-b697-48f2-ae08-4b35ebc9bafc"
        }
    },
    reducers: {
        setSelectedBatchData: (state, action) => {
            state.selectedBatchData = action.payload;
        }
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


        });
        builder.addCase(createNewProject.fulfilled, (state, action) => {
            state.projectLoader = false;
            state.currentProjectDetails = action.payload.result;

        });
        builder.addCase(createNewProject.rejected, (state) => {
            state.projectLoader = false;

        });

        builder.addCase(createBatch.pending, (state) => {
            state.projectLoader = true;

        });
        builder.addCase(createBatch.fulfilled, (state, action) => {
            state.projectLoader = false;
            let batchs = action.payload.result;
            for (let obj of batchs) {
                obj.status = "Pending";
            }
            state.batchListData = batchs;

        });
        builder.addCase(createBatch.rejected, (state) => {
            state.projectLoader = false;

        });

        builder.addCase(assignStaffAndStudent.pending, (state) => {
            state.projectLoader = true;

        });
        builder.addCase(assignStaffAndStudent.fulfilled, (state, action) => {
            state.projectLoader = false;
            for (let i = 0; i < state.batchListData.length; i++) {
                if (state.batchListData[i].uuid == action.payload.result.uuid) {
                    state.batchListData[i].status = "DONE";
                }
            }

        });
        builder.addCase(assignStaffAndStudent.rejected, (state) => {
            state.projectLoader = false;

        });


    }
});
export const { setSelectedBatchData } = projectlistSclice.actions;

export default projectlistSclice.reducer;