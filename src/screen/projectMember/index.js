import React, { useState, useEffect } from 'react';
import './index.css';
import { getProjectList, createNewProject, createBatch, setSelectedBatchData, getBatchByProject, getProjectMember } from '../../redux/reducer/projectlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-drag-drawer';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Container, ButtonToolbar, Jumbotron, Card } from 'react-bootstrap';
import jsPDF from "jspdf";
import "jspdf-autotable";
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
        selectedBatchForMoreDetailsObj
    } = projectlistStore;
    const [isShowCreateProject, setIsShowCreateProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [projectCreateError, setProjectCreateError] = useState("");
    const [noOfBatch, setNoOfBatch] = useState(1);
    const [isShowBatch, setIsShowBatch] = useState(false);
    const [batchCreateError, setBatchCreateError] = useState("");


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

    return (
        <center>
            <div class="height-100 bg-light" style={{ width: "95%", backgroundColor: "red" }}>
                <center><label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>PROJECT MEMBER</label></center>
                <div class="d-flex flex-row-reverse bd-highlight">


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
                    <div style={{ width: "100%", textAlign: "start" }}>
                        <label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>Panel members</label>
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
                        <label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>Student</label>
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


        </center >
    )
}

export default ProjectMember;