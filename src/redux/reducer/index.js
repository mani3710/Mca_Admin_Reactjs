import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import projectlistReducer from './projectlist';
import staffReducer from './staff';
import studentReducer from './student';

const rootReducer = combineReducers({
    auth: authReducer,
    projectlist: projectlistReducer,
    staff: staffReducer,
    student: studentReducer
});
export default rootReducer;