import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import LoginScreen from './screen/login';
import HomeScreen from './screen/home';
import FinalMarkScreen from './screen/finalMark';
import DownloadScreen from './screen/downloadpdf';
import StudentScreen from './screen/student';
import StaffScreen from './screen/staff';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Reducer from './redux/reducer';
const store = configureStore({
  reducer: Reducer
});
function App() {
  return (

    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginScreen />} />
          <Route exact path="/home" element={<HomeScreen />} />
          <Route exact path="/finalmark" element={<FinalMarkScreen />} />
          <Route exact path="/downloadpdf" element={<DownloadScreen />} />
          <Route exact path="/student" element={<StudentScreen />} />
          <Route exact path="/staff" element={<StaffScreen />} />
        </Routes>

      </Router>
    </Provider>
  );
}

export default App;
