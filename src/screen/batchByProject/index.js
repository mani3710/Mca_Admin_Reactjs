import React, { useState, useEffect } from 'react';
import './index.css';
import {
    getProjectList, createNewProject, createBatch, setSelectedBatchData, getBatchByProject, setSelectedBatchForMoreDetails,
    emptyNotificationForAllProjectMemberStatus,
    sendNotificationToAllProjectMembers
} from '../../redux/reducer/projectlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-drag-drawer';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Container, ButtonToolbar, Jumbotron, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
const Batch = (props) => {
    const dispatch = useDispatch();

    //Store 
    const authStore = useSelector(state => state.auth);
    const projectlistStore = useSelector(state => state.projectlist);
    const {
        authLoader,
        adminDetails
    } = authStore;
    const {
        projectLoader,
        batchListData,
        selectedProjectForViewMore,
        selectedBatchForMoreDetails,
        notificationForAllProjectMemberStatus
    } = projectlistStore;
    const [isShowCreateProject, setIsShowCreateProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [projectCreateError, setProjectCreateError] = useState("");
    const [noOfBatch, setNoOfBatch] = useState(1);
    const [isShowBatch, setIsShowBatch] = useState(false);
    const [batchCreateError, setBatchCreateError] = useState("");
    const [isShowNotificationDialog, setIsShowNotificationDialog] = useState(false);
    const [messageTitle, setMessageTitle] = useState("");
    const [messageContent, setMessageContent] = useState("");
    const [notificationError, setNotificationError] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);

    useEffect(() => {
        dispatch(getBatchByProject({ adminID: adminDetails.uuid, projectID: selectedProjectForViewMore.uuid }))
    }, [])

    const setSelectedBatchForMoreDetailsFunc = (item) => {
        dispatch(setSelectedBatchForMoreDetails(item));
    }
    useEffect(() => {
        if (notificationForAllProjectMemberStatus == "success") {

            toast("Successfully sent")
            dispatch(emptyNotificationForAllProjectMemberStatus());
            setIsShowNotificationDialog(false);

        } else if (notificationForAllProjectMemberStatus == "failed") {
            setNotificationError("Something went worng");
            dispatch(emptyNotificationForAllProjectMemberStatus());

        }
    }, [notificationForAllProjectMemberStatus])
    const sendNotification = () => {
        if (messageContent && messageTitle) {
            dispatch(sendNotificationToAllProjectMembers({
                "message": messageContent,
                "projectid": selectedProjectForViewMore.uuid,
                "subject": messageTitle
            }));
        } else {
            setNotificationError("Empty Field Found!");
        }
    }


    return (
        <center>
            <div class="height-100 bg-light" style={{ width: "95%", backgroundColor: "red" }}>
                <center><label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>BATCH</label></center>
                <div class="d-flex flex-row-reverse bd-highlight">


                    <div class="p-2 bd-highlight">
                        <button
                            onClick={() => {
                                // setIsShowCreateProject(true)
                                props.setProjectFlowNo(1);
                            }}
                            type="button" class="btn btn-secondary">BACK</button>
                    </div>
                    <div class="p-2 bd-highlight">
                        <button
                            onClick={() => {
                                setIsShowNotificationDialog(true);
                            }}
                            type="button" class="btn btn-warning">SEND NOTIFICATION</button>
                    </div>

                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Sno</th>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {selectedBatchForMoreDetails.map((item, i) => {
                            return (
                                <tr>
                                    <th scope="col">{i + 1}</th>
                                    <th scope="col">{item.uuid}</th>
                                    <th scope="col" >{item.title}</th>
                                    <th scope="col" >
                                        <button
                                            style={{}}
                                            onClick={() => {
                                                setSelectedBatchForMoreDetailsFunc(item)
                                                props.setProjectFlowNo(7);
                                            }}

                                            type="button" class="btn btn-info">SHOW STAFF & STUDENT</button>
                                    </th>

                                </tr>
                            )
                        })}



                    </tbody>
                </table>




            </div>
            <Drawer

                open={isShowNotificationDialog}
                // onRequestClose={this.toggle}
                direction='left'
            >

                <Card style={{ backgroundColor: "white", height: 280, width: 400 }}>


                    <Card.Body className="pl-3 " style={{ backgroundColor: "white" }}>
                        <center>
                            <label style={{ fontWeight: "bold" }}>NOTIFICATION TITLE</label>
                            <form >
                                <div style={{ marginTop: 28 }}>
                                    <input
                                        value={messageTitle}
                                        onChange={(e) => {
                                            setMessageTitle(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "80%" }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter message title"
                                    />
                                    <div></div>
                                    <textarea
                                        value={messageContent}
                                        onChange={(e) => {
                                            setMessageContent(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", width: "80%", marginTop: 25 }}
                                        rows="5" cols="60" name="description">

                                    </textarea>
                                    {/* <input
                                        multiple
                                        value={messageContent}
                                        onChange={(e) => {
                                            setMessageContent(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "80%", marginTop: 25 }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter message content"
                                    /> */}
                                </div>



                            </form>
                            <center><label style={{ color: "red", marginTop: 10 }}>{notificationError}</label></center>
                            <div style={{ marginTop: 24 }}>
                                <button
                                    style={{ width: 100, height: 40 }}
                                    onClick={() => {
                                        setIsShowNotificationDialog(false)
                                    }}

                                    type="button" class="btn btn-info">CANCEL</button>
                                <button
                                    style={{ marginLeft: 55, width: 100, height: 40 }}
                                    onClick={() => {
                                        //  createProjectFunc()
                                        sendNotification();
                                    }}

                                    type="button" class="btn btn-warning">SEND</button>
                            </div>

                        </center>




                    </Card.Body>
                </Card>

            </Drawer>



            <Drawer

                open={successMessage}
                // onRequestClose={this.toggle}
                direction='left'
            >

                <Card style={{ backgroundColor: "white", height: 100, width: 400 }}>


                    <Card.Body className="pl-3 " style={{ backgroundColor: "white" }}>
                        <center>
                            <label style={{ fontWeight: "bold" }}>NOTIFICATION SEND SUCCESSFULLY</label>

                            <div style={{ marginTop: 24 }}>
                                <button
                                    style={{ width: 100, height: 40 }}
                                    onClick={() => {
                                        setSuccessMessage(false)
                                    }}
                                    type="button" class="btn btn-success">CLOSE</button>
                            </div>

                        </center>
                    </Card.Body>
                </Card>

            </Drawer>
            <ToastContainer />
        </center >
    )
}

export default Batch;