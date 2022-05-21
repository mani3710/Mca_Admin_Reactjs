import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import projectlistReducer from './projectlist';
import staffReducer from './staff';

const rootReducer = combineReducers({
    auth: authReducer,
    projectlist: projectlistReducer,
    staff: staffReducer
});
export default rootReducer;