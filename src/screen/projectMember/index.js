import React, { useState, useEffect } from 'react';
import './index.css';
import { getProjectList, createNewProject, createBatch, setSelectedBatchData, getBatchByProject, getProjectMember, sendNotificationForParticularBatch, emptyNotificationForAllProjectMemberStatus } from '../../redux/reducer/projectlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-drag-drawer';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Container, ButtonToolbar, Jumbotron, Card } from 'react-bootstrap';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ToastContainer, toast } from 'react-toastify';
const ProjectMember = (props) => {
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
        selectedProjectMember,
        selectedBatchForMoreDetailsObj,
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

    const [isShowNotificationDialogStaff, setIsShowNotificationDialogStaff] = useState(false);
    const [messageTitleStaff, setMessageTitleStaff] = useState("");
    const [messageContentStaff, setMessageContentStaff] = useState("");

    const [isShowNotificationStaffSearch, setIsShowNotificationStaffSearch] = useState(false);
    const [staffSearchText, setStaffSearchText] = useState("");
    const [searchFielteredList, setSearchFielteredList] = useState([]);
    const [staffSelectedList, setStaffSelectedList] = useState([]);
    const [showStaffSearchResultList, setShowStaffSearchResultList] = useState(false);
    const [messageContentStaffSearch, setMessageContentStaffSearch] = useState("");
    const [messageTitleStaffSearch, setMessageTitleStaffSearch] = useState("");
    const [isShowNotificationStudentSearch, setIsShowNotificationStudentSearch] = useState(false);
    const [studentSelectedList, setStudentSelectedList] = useState([]);

    const [messageContentStudentSearch, setMessageContentStudentSearch] = useState("");
    const [messageTitleStudentSearch, setMessageTitleStudentSearch] = useState("");

    const [showStudentSearchResultList, setShowStudentSearchResultList] = useState(false);
    const [studentSearchText, setStudentSearchText] = useState("");
    const [studentSearchFielteredList, setStudentSearchFielteredList] = useState([]);
    const [selectedStudentList, setSelectedStudentList] = useState([]);

    useEffect(() => {
        dispatch(getProjectMember(selectedBatchForMoreDetailsObj.uuid))
    }, [])
    const exportStundet = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = `${selectedBatchForMoreDetailsObj.title}`;
        const headers = [["NAME", "ROLL NUMBER"]];

        const data = selectedProjectMember.student.map(elt => [elt.username, elt.rollno]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save(`${selectedBatchForMoreDetailsObj.title} students.pdf`)
    }
    useEffect(() => {
        if (notificationForAllProjectMemberStatus == "success") {
            toast("SUCCESSFULLLY SEND!");
            setIsShowNotificationDialog(false);
            setIsShowNotificationDialogStaff(false);
            setIsShowNotificationStaffSearch(false);
            setIsShowNotificationStudentSearch(false);
            dispatch(emptyNotificationForAllProjectMemberStatus());

        } else if (notificationForAllProjectMemberStatus == "failed") {
            toast("FAILED TO SEND");
            dispatch(emptyNotificationForAllProjectMemberStatus());

        }
    }, [
        notificationForAllProjectMemberStatus
    ]);
    const sendNotificationStudentALL = () => {
        if (messageContent && messageTitle) {
            dispatch(sendNotificationForParticularBatch({
                "message": messageContent,
                "emails": selectedProjectMember.student,
                "subject": messageTitle
            }))
        } else {
            toast("Empty field found!")
        }
    }

    const sendNotificationStaffALL = () => {
        if (messageContentStaff && messageTitleStaff) {
            dispatch(sendNotificationForParticularBatch({
                "message": messageContentStaff,
                "emails": selectedProjectMember.staff,
                "subject": messageTitleStaff
            }))
        } else {
            toast("Empty field found!")
        }
    }

    const sendNotificationStaffALLFiletered = () => {
        if (messageContentStaffSearch && messageTitleStaffSearch && staffSelectedList.length) {
            dispatch(sendNotificationForParticularBatch({
                "message": messageContentStaffSearch,
                "emails": staffSelectedList,
                "subject": messageTitleStaffSearch
            }))
        } else {
            toast("Empty field found!")
        }
    }

    const sendNotificationStudentALLFiletered = () => {
        if (messageContentStudentSearch && messageTitleStudentSearch && selectedStudentList.length) {
            dispatch(sendNotificationForParticularBatch({
                "message": messageContentStudentSearch,
                "emails": selectedStudentList,
                "subject": messageTitleStudentSearch
            }))
        } else {
            toast("Empty field found!")
        }
    }
    const handleFilter = (e) => {
        let lowerCaseText = e.toLowerCase();
        let newFilter = [];
        // setShowSearch(true)
        setShowStaffSearchResultList(true);

        for (let obj of selectedProjectMember.staff) {
            let nameLowerCase = obj.username.toLowerCase();
            let n = nameLowerCase.search(lowerCaseText);
            if (n >= 0) {
                newFilter.push(obj);
            }
        }
        setSearchFielteredList(newFilter);
    }
    const handleFilterStudent = (e) => {
        let lowerCaseText = e.toLowerCase();
        let newFilter = [];
        // setShowSearch(true)
        setShowStudentSearchResultList(true);

        for (let obj of selectedProjectMember.student) {
            let nameLowerCase = obj.username.toLowerCase();
            let n = nameLowerCase.search(lowerCaseText);
            if (n >= 0) {
                newFilter.push(obj);
            }
        }
        setStudentSearchFielteredList(newFilter);
    }
    return (
        <center>
            <div class="height-100 bg-light" style={{ width: "95%", backgroundColor: "red" }}>
                <center><label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>PROJECT MEMBER</label></center>
                <div class="d-flex flex-row-reverse bd-highlight">
                    <div class="p-2 bd-highlight"><button
                        style={{ marginRight: 20 }}
                        onClick={() => {
                            // props.setProjectFlowNo(6);
                            // exportStundet()
                            setIsShowNotificationStudentSearch(true);
                        }}
                        type="button" class="btn btn-success">SEND NOTIFICATION STUDENT</button>

                        <button
                            onClick={() => {
                                // props.setProjectFlowNo(6);
                                // exportStundet()
                                setIsShowNotificationStaffSearch(true);
                            }}
                            type="button" class="btn btn-warning">SEND NOTIFICATION STAFF </button>
                    </div>
                    <div class="p-2 bd-highlight">
                        <button
                            onClick={() => {
                                props.setProjectFlowNo(6);
                                // exportStundet()
                            }}
                            type="button" class="btn btn-secondary">BACK</button>
                    </div>
                </div>
                <div style={{ overflow: "auto", height: "75vh" }}>
                    {/* <div style={{ width: "100%", textAlign: "start" }}>
                        <label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20, marginRight: 30 }}>Panel members</label>
          
                    </div> */}
                    <div style={{ width: "100%", textAlign: "start" }}>
                        <label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20, marginRight: 30 }}>Panel members</label>
                        <button
                            onClick={() => {
                                // props.setProjectFlowNo(6);
                                // exportStundet()
                                setIsShowNotificationDialogStaff(true);
                            }}
                            type="button" class="btn btn-warning">SEND NOTIFICATION ALL STAFF </button>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Sno</th>
                                <th scope="col">uuid</th>
                                <th scope="col">Staff id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProjectMember.staff.map((item, i) => {
                                return (
                                    <tr>
                                        <th scope="col">{i + 1}</th>
                                        <th scope="col" >{item.uuid}</th>
                                        <th scope="col" >{item.staffid}</th>
                                        <th scope="col">{item.username}</th>
                                        <th scope="col" >{item.email}</th>

                                    </tr>
                                )
                            })}



                        </tbody>
                    </table>
                    <div style={{ width: "100%", textAlign: "start" }}>
                        <label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20, marginRight: 30 }}>Student</label>
                        <button
                            onClick={() => {
                                // props.setProjectFlowNo(6);
                                // exportStundet()
                                setIsShowNotificationDialog(true);
                            }}
                            type="button" class="btn btn-warning">SEND NOTIFICATION ALL STUDENT </button>
                    </div>
                    <div class="d-flex flex-row-reverse bd-highlight">


                        <div class="p-2 bd-highlight">
                            <button
                                onClick={() => {
                                    //  props.setProjectFlowNo(6);
                                    exportStundet()
                                }}
                                type="button" class="btn btn-link">Download Student List</button>
                        </div>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Sno</th>
                                <th scope="col">uuid</th>
                                <th scope="col">Roll no</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>

                            </tr>
                        </thead>
                        <tbody>
                            {selectedProjectMember.student.map((item, i) => {
                                return (
                                    <tr>
                                        <th scope="col">{i + 1}</th>
                                        <th scope="col" >{item.uuid}</th>
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
                                        sendNotificationStudentALL()

                                    }}

                                    type="button" class="btn btn-warning">SEND</button>
                            </div>

                        </center>




                    </Card.Body>
                </Card>
            </Drawer>

            <Drawer

                open={isShowNotificationDialogStaff}
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
                                        value={messageTitleStaff}
                                        onChange={(e) => {
                                            setMessageTitleStaff(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "80%" }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter message title"
                                    />
                                    <div></div>
                                    <textarea
                                        value={messageContentStaff}
                                        onChange={(e) => {
                                            setMessageContentStaff(e.target.value);
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
                                        setIsShowNotificationDialogStaff(false)
                                    }}

                                    type="button" class="btn btn-info">CANCEL</button>
                                <button
                                    style={{ marginLeft: 55, width: 100, height: 40 }}
                                    onClick={() => {
                                        //  createProjectFunc()
                                        sendNotificationStaffALL()

                                    }}

                                    type="button" class="btn btn-warning">SEND</button>
                            </div>

                        </center>




                    </Card.Body>
                </Card>

            </Drawer>



            <Drawer

                open={isShowNotificationStaffSearch}
                // onRequestClose={this.toggle}
                direction='left'
            >

                <Card style={{ backgroundColor: "white", height: 500, width: 800 }}>


                    <Card.Body className="pl-3 " style={{ backgroundColor: "white" }}>
                        <center>
                            <label style={{ fontWeight: "bold" }}>NOTIFICATION TITLE</label>
                            <form >
                                <div style={{ marginTop: 28 }}>
                                    <input
                                        value={staffSearchText}
                                        onChange={(e) => {
                                            setStaffSearchText(e.target.value);
                                            handleFilter(e.target.value);

                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "80%" }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter search staff name"
                                    />
                                    {showStaffSearchResultList && <div style={{ position: "absolute", backgroundColor: "white", alignSelf: "center", marginLeft: 100, width: "80%" }}>
                                        <label style={{ alignSelf: "center", marginTop: 20 }}
                                            onClick={() => { setShowStaffSearchResultList(false) }}
                                        >X close</label>
                                        {searchFielteredList.map((item, i) => {
                                            return (
                                                <div style={{ marginBottom: 20 }}>
                                                    <label
                                                        onClick={() => {
                                                            let flag = true;
                                                            for (let obj of staffSelectedList) {
                                                                if (obj.uuid == item.uuid) {
                                                                    flag = false;
                                                                }
                                                            }
                                                            if (flag) {
                                                                setStaffSelectedList([...staffSelectedList, item])
                                                                setStaffSearchText("");
                                                                setShowStaffSearchResultList(false)
                                                            }

                                                        }}
                                                        style={{ marginTop: 15 }}>{item.username}</label>
                                                </div>
                                            )
                                        })}
                                    </div>}
                                    <input
                                        value={messageTitleStaffSearch}
                                        onChange={(e) => {
                                            setMessageTitleStaffSearch(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "80%", marginTop: 20 }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter message title"
                                    />
                                    <div></div>
                                    <textarea
                                        value={messageContentStaffSearch}
                                        onChange={(e) => {
                                            setMessageContentStaffSearch(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", width: "80%", marginTop: 25 }}
                                        rows="5" cols="60" name="description">
                                    </textarea>
                                </div>
                            </form>

                            <div style={{ height: 400, overflow: "auto", marginTop: 20 }}>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sno</th>

                                            <th scope="col">Staff id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffSelectedList.map((item, i) => {
                                            return (
                                                <tr>
                                                    <th scope="col">{i + 1}</th>

                                                    <th scope="col" >{item.staffid}</th>
                                                    <th scope="col">{item.username}</th>
                                                    <th scope="col" >{item.email}</th>
                                                    <th scope="col" >
                                                        <button
                                                            style={{ width: 100, height: 40 }}
                                                            onClick={() => {
                                                                let newObj = staffSelectedList;
                                                                newObj.splice(i, 1)
                                                                setStaffSelectedList([...newObj]);
                                                            }}

                                                            type="button" class="btn btn-info">REMOVE</button>
                                                    </th>

                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div style={{ marginTop: 24 }}>
                                <button
                                    style={{ width: 100, height: 40 }}
                                    onClick={() => {
                                        setIsShowNotificationStaffSearch(false)
                                    }}

                                    type="button" class="btn btn-info">CANCEL</button>
                                <button
                                    style={{ marginLeft: 55, width: 100, height: 40 }}
                                    onClick={() => {
                                        //  createProjectFunc()
                                        sendNotificationStaffALLFiletered()
                                    }}

                                    type="button" class="btn btn-warning">SEND</button>
                            </div>

                        </center>
                    </Card.Body>
                </Card>
            </Drawer>


            <Drawer

                open={isShowNotificationStudentSearch}
                // onRequestClose={this.toggle}
                direction='left'
            >

                <Card style={{ backgroundColor: "white", height: 500, width: 800 }}>


                    <Card.Body className="pl-3 " style={{ backgroundColor: "white" }}>
                        <center>
                            <label style={{ fontWeight: "bold" }}>NOTIFICATION 1</label>
                            <form >
                                <div style={{ marginTop: 28 }}>
                                    <input
                                        value={studentSearchText}
                                        onChange={(e) => {
                                            setStudentSearchText(e.target.value);
                                            handleFilterStudent(e.target.value);

                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "80%" }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter search staff name"
                                    />
                                    {showStudentSearchResultList && <div style={{ position: "absolute", backgroundColor: "white", alignSelf: "center", marginLeft: 100, width: "80%" }}>
                                        <label style={{ alignSelf: "center", marginTop: 20 }}
                                            onClick={() => { setShowStudentSearchResultList(false) }}
                                        >X close</label>
                                        {studentSearchFielteredList.map((item, i) => {
                                            return (
                                                <div style={{ marginBottom: 20 }}>
                                                    <label
                                                        onClick={() => {
                                                            let flag = true;
                                                            for (let obj of selectedStudentList) {
                                                                if (obj.uuid == item.uuid) {
                                                                    flag = false;
                                                                }
                                                            }
                                                            if (flag) {
                                                                setSelectedStudentList([...selectedStudentList, item])
                                                                setStaffSearchText("");
                                                                setShowStudentSearchResultList(false)
                                                            }

                                                        }}
                                                        style={{ marginTop: 15 }}>{item.username}</label>
                                                </div>
                                            )
                                        })}
                                    </div>}
                                    <input
                                        value={messageTitleStudentSearch}
                                        onChange={(e) => {
                                            setMessageTitleStudentSearch(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "80%", marginTop: 20 }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter message title"
                                    />
                                    <div></div>
                                    <textarea
                                        value={messageContentStudentSearch}
                                        onChange={(e) => {
                                            setMessageContentStudentSearch(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", width: "80%", marginTop: 25 }}
                                        rows="5" cols="60" name="description">
                                    </textarea>
                                </div>
                            </form>

                            <div style={{ height: 400, overflow: "auto", marginTop: 20 }}>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sno</th>

                                            <th scope="col">Roll no</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedStudentList.map((item, i) => {
                                            return (
                                                <tr>
                                                    <th scope="col">{i + 1}</th>
                                                    <th scope="col" >{item.rollno}</th>
                                                    <th scope="col">{item.username}</th>
                                                    <th scope="col" >{item.email}</th>
                                                    <th scope="col" >
                                                        <button
                                                            style={{ width: 100, height: 40 }}
                                                            onClick={() => {
                                                                let newObj = selectedStudentList;
                                                                newObj.splice(i, 1)
                                                                setSelectedStudentList([...newObj]);
                                                            }}

                                                            type="button" class="btn btn-info">REMOVE</button>
                                                    </th>

                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div style={{ marginTop: 24 }}>
                                <button
                                    style={{ width: 100, height: 40 }}
                                    onClick={() => {
                                        setIsShowNotificationStudentSearch(false)
                                    }}
                                    type="button" class="btn btn-info">CANCEL</button>
                                <button
                                    style={{ marginLeft: 55, width: 100, height: 40 }}
                                    onClick={() => {
                                        //  createProjectFunc()
                                        // sendNotificationStaffALLFiletered()
                                        sendNotificationStudentALLFiletered()
                                    }}

                                    type="button" class="btn btn-warning">SEND</button>
                            </div>

                        </center>
                    </Card.Body>
                </Card>
            </Drawer>

            <ToastContainer />
        </center >
    )
}

export default ProjectMember;