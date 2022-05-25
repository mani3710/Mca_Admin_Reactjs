import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../config/api';
export const createReviewAndTopic = createAsyncThunk(
    'review/createReviewAndTopic',
    async (data) => {
        try {
            await API.post(`/review/create/list`, { reviewList: data.reviewList });
            await API.post(`/review/create/topiclist`, { reviewTopicList: data.reviewTopicList });
            // const result = await API.get(`/staff/getall`);
            // console.log(result.data);
            return { result: "success" };

        } catch (error) {
            alert(error);
        }
    });



const reviewSclice = createSlice({
    name: "review",
    initialState: {
        reviewLoader: false,
        reviewInfo: [

        ],
        selectedReview: {}

    },
    reducers: {
        updateReviewInfo: (state, action) => {
            state.reviewInfo.push(action.payload);
        },
        removeReviewInfo: (state, action) => {
            state.reviewInfo.splice(action.payload, 1);
        },
        setSelectedReview: (state, action) => {
            state.selectedReview = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createReviewAndTopic.pending, (state) => {
            state.reviewLoader = true;
            state.loginStatus = "";

        });
        builder.addCase(createReviewAndTopic.fulfilled, (state, action) => {
            state.reviewLoader = false;
            state.reviewInfo = [];
            console.log(action.payload);

        });
        builder.addCase(createReviewAndTopic.rejected, (state) => {
            state.reviewLoader = false;

        });

    }
});

export const {
    updateReviewInfo,
    removeReviewInfo,
    setSelectedReview
} = reviewSclice.actions;

export default reviewSclice.reducer;