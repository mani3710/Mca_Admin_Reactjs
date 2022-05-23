import React, { useState, useEffect } from 'react';
import './index.css';
import ProjectList from './projectlist';
import SelectStaff from './selecteStaff';
import BatchList from './batch';
import Student from './student';
import BatchSummery from './batchSummery';
import BatchByProject from '../batchByProject';
import ProjectMember from '../projectMember';
import { useNavigate } from 'react-router-dom';
const screenWidth = window.innerWidth;
const Home = () => {
    const [projectFlowNo, setProjectFlowNo] = useState(1);
    const navigation = useNavigate();
    const renderContent = () => {
        switch (projectFlowNo) {
            case 1:
                return <ProjectList setProjectFlowNo={setProjectFlowNo} />
                break;
            case 2:
                return <BatchList setProjectFlowNo={setProjectFlowNo} />
                break;
            case 3:
                return <SelectStaff setProjectFlowNo={setProjectFlowNo} />
                break;
            case 4:
                return <Student setProjectFlowNo={setProjectFlowNo} />
                break;
            case 5:
                return <BatchSummery setProjectFlowNo={setProjectFlowNo} />
                break;
            case 6:
                return <BatchByProject setProjectFlowNo={setProjectFlowNo} />
                break;
            case 7:
                return <ProjectMember setProjectFlowNo={setProjectFlowNo} />
                break;
            default:
        }
    }

    return (
        <div>
            {/* <header class="header" id="header">
                <div class="header_toggle"> <i class='bx bx-menu' id="header-toggle"></i> </div>
                <div class="header_img"> <img src="https://i.imgur.com/hczKIze.jpg" alt="" /> </div>
            </header> */}
            <div class="l-navbar" id="nav-bar" style={{ width: 230 }}>
                <nav class="nav">
                    <div> <a class="nav_logo"> <i class='bx bx-layer nav_logo-icon'></i> <span class="nav_logo-name" style={{ fontSize: 15, marginLeft: -10 }}>ANNA UNIVERSITY</span> </a>
                        <div class="nav_list">

                            <label onClick={() => { navigation("/home") }} class="nav_link active"> <i class='bx bx-grid-alt nav_icon'></i> <span class="nav_name">Dashboard</span> </label>
                            <label onClick={() => { navigation("/finalmark") }} class="nav_link"> <i class='bx bx-user nav_icon'></i> <span class="nav_name">Final Mark</span> </label>
                            <label onClick={() => { navigation("/downloadpdf") }} class="nav_link"> <i class='bx bx-user nav_icon'></i> <span class="nav_name">Download PDF</span> </label>
                            <label onClick={() => { navigation("/staff") }} class="nav_link"> <i class='bx bx-user nav_icon'></i> <span class="nav_name">Staff</span> </label>
                            <label onClick={() => { navigation("/student") }} class="nav_link"> <i class='bx bx-user nav_icon'></i> <span class="nav_name">Student</span> </label>


                        </div>
                    </div> <a href="#" class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">SignOut</span> </a>
                </nav>
            </div>
            {/* {renderContent()} */}
            <div class="height-100 bg-light" style={{ marginTop: -65, width: "91.3%", marginLeft: 130 }}>
                <center>{renderContent()}</center>
            </div>

        </div>
    );
}

export default Home;