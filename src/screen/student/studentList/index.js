import React, { useState, useEffect } from 'react';

import { getProjectList, createNewProject, createBatch, setSelectedProjectForViewMore } from '../../../redux/reducer/projectlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-drag-drawer';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Container, ButtonToolbar, Jumbotron, Card } from 'react-bootstrap';
import { getStudentList, emptyStudentCreationStatus, createStudent } from '../../../redux/reducer/student';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let emailRegex = /^[A-Z0-9_-]+([\.][A-Z0-9_-]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,5})+$/i;
const StudentList = (props) => {
    const dispatch = useDispatch();

    //Store 
    const authStore = useSelector(state => state.auth);
    const projectlistStore = useSelector(state => state.projectlist);
    const studentStore = useSelector(state => state.student);
    const {
        authLoader,
        adminDetails
    } = authStore;
    const {
        projectLoader,
        projectListData,
        currentProjectDetails
    } = projectlistStore;
    const {
        studentListData,
        studentCreationStatus
    } = studentStore;
    const [isShowCreateProject, setIsShowCreateProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [projectCreateError, setProjectCreateError] = useState("");
    const [noOfBatch, setNoOfBatch] = useState(1);
    const [isShowBatch, setIsShowBatch] = useState(false);
    const [batchCreateError, setBatchCreateError] = useState("");

    const [isShowStudentCreation, setIsShowStudentCreation] = useState(false);
    const [newStudentName, setNewStudentName] = useState("");
    const [newStudenEmail, setNewStudenEmail] = useState("");
    const [newStudentRollno, setNewStudentRollno] = useState("");
    const [newStudentPassword, setNewStudentPassword] = useState("");

    useEffect(() => {
        getStudentListFunc()
    }, [])
    useEffect(() => {
        if (studentCreationStatus == "success") {
            dispatch(emptyStudentCreationStatus())
            setIsShowStudentCreation(false);
            getStudentListFunc()
            toast("Successfully created")
        } else if (studentCreationStatus == "failed") {
            toast("Student roll no already present")
            dispatch(emptyStudentCreationStatus())
        }
    }, [studentCreationStatus]);
    const getStudentListFunc = () => {
        dispatch(getStudentList());
    }

    const submitData = () => {
        if (newStudentName && newStudentRollno) {
            if (emailRegex.test(newStudenEmail)) {
                if (newStudentPassword.length >= 6) {
                    dispatch(createStudent({
                        "uuid": uuidv4(),
                        "name": newStudentName,
                        "password": newStudentPassword,
                        "rollno": newStudentRollno,
                        "email": newStudenEmail
                    }))
                } else {
                    toast("Password should have 6 atleast charaters");
                }
            } else {
                toast("Invalide email id");
            }
        } else {
            toast("Empty Field Found!");
        }
    }


    return (
        <center>
            <div class="height-100 bg-light" style={{ width: "95%", backgroundColor: "red" }}>
                <center><label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>STAFF</label></center>
                <div class="d-flex flex-row-reverse bd-highlight">


                    <div class="p-2 bd-highlight">
                        <button
                            onClick={() => {
                                setIsShowStudentCreation(true)
                            }}
                            type="button" class="btn btn-warning">CREATE STUDENT</button>
                    </div>
                    {/* <div class="p-2 bd-highlight">
                        <label style={{ fontWeight: "bold", marginTop: 5 }}>{adminData.username}</label>
                    </div>
                    <div class="p-2 bd-highlight">
                        <label style={{ marginTop: 5 }}>User :</label>
                    </div> */}
                </div>
                <div style={{ overflow: "auto", height: "82vh" }}>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Sno</th>
                                <th scope="col">Roll no</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>

                            </tr>
                        </thead>
                        <tbody>
                            {studentListData.map((item, i) => {
                                return (
                                    <tr>
                                        <th scope="col">{i + 1}</th>
                                        <th scope="col" >{item.rollno}</th>
                                        <th scope="col">{item.username}</th>
                                        <th scope="col" >{item.email}</th>

                                    </tr>
                                )
                            })}



                        </tbody>
                    </table>
                </div>

            </div>
            <Drawer

                open={isShowStudentCreation}
                // onRequestClose={this.toggle}
                direction='left'
            >

                <Card style={{ backgroundColor: "white", height: 280, width: 400 }}>


                    <Card.Body className="pl-3 " style={{ backgroundColor: "white" }}>
                        <center>
                            <label style={{ fontWeight: "bold" }}>ADD NEW STUDENT</label>
                            <form >
                                <div style={{ marginTop: 15 }}>
                                    <label>User Name </label>
                                    <input
                                        value={newStudentName}
                                        onChange={(e) => {
                                            setNewStudentName(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "50%" }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter user name"
                                    />
                                </div>
                                <div style={{ marginTop: 15 }}>
                                    <label>Roll no </label>
                                    <input
                                        value={newStudentRollno}
                                        onChange={(e) => {
                                            setNewStudentRollno(e.target.value);
                                        }}
                                        style={{ marginLeft: 30, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "50%" }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter Student roll no"
                                    />
                                </div>
                                <div style={{ marginTop: 15 }}>
                                    <label>Email :</label>
                                    <input
                                        value={newStudenEmail}
                                        onChange={(e) => {
                                            setNewStudenEmail(e.target.value);
                                        }}
                                        style={{ marginLeft: 40, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "50%" }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter student eamil"
                                    />
                                </div>
                                <div style={{ marginTop: 15 }}>
                                    <label>Password </label>
                                    <input
                                        value={newStudentPassword}
                                        onChange={(e) => {
                                            setNewStudentPassword(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "50%" }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter student password"
                                    />
                                </div>



                            </form>
                            <center><label style={{ color: "red", marginTop: 10 }}>{projectCreateError}</label></center>
                            <div style={{ marginTop: 24 }}>
                                <button
                                    style={{ width: 100, height: 40 }}
                                    onClick={() => {
                                        setIsShowStudentCreation(false)
                                    }}

                                    type="button" class="btn btn-info">CANCEL</button>
                                <button
                                    style={{ marginLeft: 55, width: 100, height: 40 }}
                                    onClick={() => {
                                        submitData()
                                    }}

                                    type="button" class="btn btn-warning">CREATE</button>
                            </div>

                        </center>




                    </Card.Body>
                </Card>

            </Drawer>
            <ToastContainer />

        </center >
    )
}

export default StudentList;