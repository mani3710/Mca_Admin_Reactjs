import React, { useState, useEffect } from 'react';
import './index.css';
import { getProjectList, createNewProject } from '../../../redux/reducer/projectlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-drag-drawer';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Container, ButtonToolbar, Jumbotron, Card } from 'react-bootstrap';
import { assignStaffAndStudent } from '../../../redux/reducer/projectlist';
import { emptySelectedStaffList } from '../../../redux/reducer/staff';
import { emptySelectedstudentDataList } from '../../../redux/reducer/student';
const BatchSummary = (props) => {
    const dispatch = useDispatch();
    //Store 
    const authStore = useSelector(state => state.auth);
    const projectlistStore = useSelector(state => state.projectlist);
    const staffStore = useSelector(state => state.staff);
    const studentStore = useSelector(state => state.student);
    const {
        authLoader,
        adminDetails
    } = authStore;
    const {
        projectLoader,
        projectListData,
        selectedBatchData
    } = projectlistStore;
    const {
        studentLoader,
        studentListData,
        selectedstudentDataList
    } = studentStore;
    const {
        staffLoader,
        staffListData,
        selectedStaffList
    } = staffStore;

    const [studentSearchText, setStudentSearchText] = useState("");
    const [filetedDataList, setFiletedDataList] = useState([]);
    //  const [seletedStudentList, setSeletedStudentList] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const assign = () => {
        let arrOfStaff = [];
        let arrOfStudent = [];

        for (let staff of selectedStaffList) {
            arrOfStaff.push({
                batchid: selectedBatchData.uuid,
                staffid: staff.uuid,
            })
        }
        for (let student of selectedstudentDataList) {
            arrOfStudent.push({
                batchid: selectedBatchData.uuid,
                studentid: student.uuid,
                guidename: "Dr.K.Vidya"
            })
        }
        dispatch(assignStaffAndStudent({ student: arrOfStudent, staff: arrOfStaff, batch: selectedBatchData }));
        dispatch(emptySelectedStaffList());
        dispatch(emptySelectedstudentDataList());
    }

    return (
        <center>
            <div class="height-100 bg-light" style={{ width: "95%", backgroundColor: "red" }}>
                <center><label style={{ marginTop: 20, fontWeight: "bold", fontSize: 40, marginBottom: 20 }}>{selectedBatchData.title} Summary</label></center>

                <div style={{ width: "100%", textAlign: "start" }}>
                    <label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>Panel Members</label>
                    <div style={{}}>
                        {selectedStaffList.map((item, i) => {
                            return (
                                <div>
                                    <label style={{ marginTop: 10, fontSize: 15, marginBottom: 10 }}> {i + 1}.) {item.username}</label>
                                </div>

                            )
                        })}

                    </div>
                    <label
                        onClick={() => {
                            props.setProjectFlowNo(3);
                        }}
                        style={{ color: "blue", textDecorationLine: "underline", cursor: "pointer" }} >Edit</label>
                </div>


                <div style={{ width: "100%", textAlign: "start" }}>
                    <label style={{ marginTop: 20, fontSize: 20, marginBottom: 20 }}>Number of students :</label>
                    <label style={{ marginTop: 20, fontWeight: "bold", fontSize: 20, marginBottom: 20, marginLeft: 15 }}>  {selectedstudentDataList.length}</label>
                    <label
                        onClick={() => {
                            props.setProjectFlowNo(4);
                        }}
                        style={{ color: "blue", textDecorationLine: "underline", cursor: "pointer", marginLeft: 15 }} >Edit</label>
                </div>


                <button
                    style={{}}
                    onClick={() => {
                        assign()
                        props.setProjectFlowNo(2);
                    }}

                    type="button" class="btn btn-success">CONFIRM STAFF & STUDENT</button>

            </div>





        </center >
    )
}

export default BatchSummary;