import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
const DownloadPdf = () => {
    const navigation = useNavigate();
    return (
        <div>
            {/* <header class="header" id="header">
                <div class="header_toggle"> <i class='bx bx-menu' id="header-toggle"></i> </div>
                <div class="header_img"> <img src="https://i.imgur.com/hczKIze.jpg" alt="" /> </div>
            </header> */}
            <div class="l-navbar" id="nav-bar" style={{ width: 200 }}>
                <nav class="nav">
                    <div> <a class="nav_logo"> <i class='bx bx-layer nav_logo-icon'></i> <span class="nav_logo-name" style={{ fontSize: 15, marginLeft: -10 }}>ANNA UNIVERSITY</span> </a>
                        <div class="nav_list">
                            <label onClick={() => { navigation("/home") }} class="nav_link"> <i class='bx bx-grid-alt nav_icon'></i> <span class="nav_name">Dashboard</span> </label>
                            <label onClick={() => { navigation("/finalmark") }} class="nav_link"> <i class='bx bx-user nav_icon'></i> <span class="nav_name">Mark</span> </label>
                            <label class="nav_link active"> <i class='bx bx-user nav_icon'></i> <span class="nav_name">Download PDF</span> </label>
                            <label onClick={() => { navigation("/staff") }} class="nav_link"> <i class='bx bx-user nav_icon'></i> <span class="nav_name">Staff</span> </label>
                            <label onClick={() => { navigation("/student") }} class="nav_link"> <i class='bx bx-user nav_icon'></i> <span class="nav_name">Student</span> </label>
                        </div>
                    </div> <a href="#" class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">SignOut</span> </a>
                </nav>
            </div>

            <div class="height-100 bg-light" style={{ marginTop: -65, width: "89.5vw", marginLeft: 100 }}>
                <h4>Download Pdf</h4>
            </div>

        </div>
    );
}

export default DownloadPdf;  