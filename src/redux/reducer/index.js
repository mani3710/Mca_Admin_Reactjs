import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import projectlistReducer from './projectlist';
import staffReducer from './staff';
import studentReducer from './student';
import reviewReducer from './review';
const rootReducer = combineReducers({
    auth: authReducer,
    projectlist: projectlistReducer,
    staff: staffReducer,
    student: studentReducer,
    review: reviewReducer
});
export default rootReducer;