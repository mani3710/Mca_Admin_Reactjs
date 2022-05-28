import React, { useEffect, useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import StudentList from './studentList';
const Staff = () => {
    const navigation = useNavigate();
    const [flowNo, setFlowNo] = useState(1)
    const renderContent = () => {
        switch (flowNo) {
            case 1:
                return <StudentList />
                break;
            default:
                return null;
        }
    }
    return (
        <div>

            <div class="l-navbar" id="nav-bar" style={{ width: 230 }}>
                <nav class="nav">
                    <div> <a class="nav_logo"> <i class='bx bx-layer nav_logo-icon'></i> <span class="nav_logo-name" style={{ fontSize: 15, marginLeft: -10 }}>ANNA UNIVERSITY</span> </a>
                        <div class="nav_list">
                            <label onClick={() => { navigation("/home") }} class="nav_link"> <i class='bx bx-grid-alt nav_icon'></i> <span class="nav_name">Dashboard</span> </label>
                            <label onClick={() => { navigation("/finalmark") }} class="nav_link"> <i class='bx bx-user nav_icon'></i> <span class="nav_name">Mark</span> </label>
                            {/* <label onClick={() => { navigation("/downloadpdf") }} class="nav_link"> <i class='bx bx-user nav_icon'></i> <span class="nav_name">Download PDF</span> </label> */}
                            <label onClick={() => { navigation("/staff") }} class="nav_link"> <i class='bx bx-user nav_icon'></i> <span class="nav_name">Staff</span> </label>
                            <label class="nav_link active"> <i class='bx bx-user nav_icon'></i> <span class="nav_name">Student</span> </label>

                        </div>
                    </div> <a href="#" class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">SignOut</span> </a>
                </nav>
            </div>

            <div class="height-100 bg-light" style={{ marginTop: -65, width: "91.3%", marginLeft: 130 }}>
                <center>{renderContent()}</center>
            </div>

        </div>
    );
}

export default Staff;  