import React from 'react';
import './index.css';
const Staff = () => {
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
                            <a href="/home" class="nav_link"> <i class='bx bx-grid-alt nav_icon'></i> <span class="nav_name">Dashboard</span> </a>
                            <a href="/finalmark" class="nav_link" > <i class='bx bx-user nav_icon'></i> <span class="nav_name">Final Mark</span> </a>
                            <a href="/downloadpdf" class="nav_link"> <i class='bx bx-message-square-detail nav_icon'></i> <span class="nav_name">Download PDF</span> </a>
                            <a class="nav_link active"> <i class='bx bx-bookmark nav_icon'></i> <span class="nav_name">Staff</span> </a>
                            <a href="/student" class="nav_link"> <i class='bx bx-folder nav_icon'></i> <span class="nav_name">Studen</span> </a>

                        </div>
                    </div> <a href="#" class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">SignOut</span> </a>
                </nav>
            </div>

            <div class="height-100 bg-light" style={{ marginTop: -65, width: "89.5vw", marginLeft: 100 }}>
                <h4>Staff</h4>
            </div>

        </div>
    );
}

export default Staff;  