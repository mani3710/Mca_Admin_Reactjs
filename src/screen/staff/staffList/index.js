import React, { useState, useEffect } from 'react';

import { getProjectList, createNewProject, createBatch, setSelectedProjectForViewMore } from '../../../redux/reducer/projectlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-drag-drawer';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Container, ButtonToolbar, Jumbotron, Card } from 'react-bootstrap';
import { getStaffList, emptyStaffCreationStatus, createStaff } from '../../../redux/reducer/staff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let emailRegex = /^[A-Z0-9_-]+([\.][A-Z0-9_-]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,5})+$/i;
const StaffList = (props) => {
    const dispatch = useDispatch();

    //Store 
    const authStore = useSelector(state => state.auth);
    const projectlistStore = useSelector(state => state.projectlist);
    const staffStore = useSelector(state => state.staff);
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
        staffListData,
        staffCreationStatus
    } = staffStore;
    const [isShowCreateProject, setIsShowCreateProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [projectCreateError, setProjectCreateError] = useState("");
    const [noOfBatch, setNoOfBatch] = useState(1);
    const [isShowBatch, setIsShowBatch] = useState(false);
    const [batchCreateError, setBatchCreateError] = useState("");

    const [newStaffName, setNewStaffName] = useState("");
    const [newStaffPassword, setNewStaffPassword] = useState("");
    const [newStaffEmail, setNewStaffEmail] = useState("");
    const [newStaffId, setNewStaffId] = useState("");
    const [isShowStaffCreation, setIsShowStaffCreation] = useState(false);

    useEffect(() => {
        getStaffListFunc()

    }, [])
    const getStaffListFunc = () => {
        dispatch(getStaffList());
    }
    useEffect(() => {
        if (staffCreationStatus == "success") {
            dispatch(emptyStaffCreationStatus())
            setIsShowStaffCreation(false);
            getStaffListFunc();
            toast("Successfully created")
        } else if (staffCreationStatus == "failed") {
            toast("Staff id already present")
            dispatch(emptyStaffCreationStatus())
        }
    }, [staffCreationStatus])
    const submitData = () => {
        if (newStaffName && newStaffId) {
            if (emailRegex.test(newStaffEmail)) {
                if (newStaffPassword.length >= 6) {
                    dispatch(createStaff({
                        "uuid": uuidv4(),
                        "name": newStaffName,
                        "password": newStaffPassword,
                        "staffid": newStaffId,
                        "email": newStaffEmail
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
                                setIsShowStaffCreation(true)
                            }}
                            type="button" class="btn btn-warning">CREATE STAFF</button>
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
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>

                            </tr>
                        </thead>
                        <tbody>
                            {staffListData.map((item, i) => {
                                return (
                                    <tr>
                                        <th scope="col">{i + 1}</th>
                                        <th scope="col" >{item.staffid}</th>
                                        <th scope="col">{item.username}</th>
                                        <th scope="col" >{item.email}</th>

                                    </tr>
                                )
                            })}



                        </tbody>
                    </table>
                </div>

            </div>
            <ToastContainer />

            <Drawer

                open={isShowStaffCreation}
                // onRequestClose={this.toggle}
                direction='left'
            >

                <Card style={{ backgroundColor: "white", height: 280, width: 400 }}>


                    <Card.Body className="pl-3 " style={{ backgroundColor: "white" }}>
                        <center>
                            <label style={{ fontWeight: "bold" }}>ADD NEW STAFF</label>
                            <form >
                                <div style={{ marginTop: 15 }}>
                                    <label>User Name </label>
                                    <input
                                        value={newStaffName}
                                        onChange={(e) => {
                                            setNewStaffName(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "50%" }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter user name"
                                    />
                                </div>
                                <div style={{ marginTop: 15 }}>
                                    <label>Staff ID </label>
                                    <input
                                        value={newStaffId}
                                        onChange={(e) => {
                                            setNewStaffId(e.target.value);
                                        }}
                                        style={{ marginLeft: 35, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "50%" }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter staff ID"
                                    />
                                </div>
                                <div style={{ marginTop: 15 }}>
                                    <label>Email     </label>
                                    <input
                                        value={newStaffEmail}
                                        onChange={(e) => {
                                            setNewStaffEmail(e.target.value);
                                        }}
                                        style={{ marginLeft: 45, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "50%" }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter staff eamil"
                                    />
                                </div>
                                <div style={{ marginTop: 15 }}>
                                    <label>Password </label>
                                    <input
                                        value={newStaffPassword}
                                        onChange={(e) => {
                                            setNewStaffPassword(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "50%" }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter staff password"
                                    />
                                </div>



                            </form>
                            <center><label style={{ color: "red", marginTop: 10 }}>{projectCreateError}</label></center>
                            <div style={{ marginTop: 24 }}>
                                <button
                                    style={{ width: 100, height: 40 }}
                                    onClick={() => {
                                        setIsShowStaffCreation(false)
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

        </center >
    )
}

export default StaffList;