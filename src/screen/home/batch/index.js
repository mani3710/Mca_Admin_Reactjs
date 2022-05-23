import React, { useState, useEffect } from 'react';
import './index.css';
import { getProjectList, createNewProject, createBatch } from '../../../redux/reducer/projectlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-drag-drawer';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Container, ButtonToolbar, Jumbotron, Card } from 'react-bootstrap';
import { setSelectedBatchData } from '../../../redux/reducer/projectlist'
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
        batchListData
    } = projectlistStore;
    const [isShowCreateProject, setIsShowCreateProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [projectCreateError, setProjectCreateError] = useState("");
    const [noOfBatch, setNoOfBatch] = useState(1);
    const [isShowBatch, setIsShowBatch] = useState(false);
    const [batchCreateError, setBatchCreateError] = useState("");

    const showCompleteButton = () => {
        let flag = true;
        for (let obj of batchListData) {
            if (obj.status == "Pending") {
                flag = false;
                break;
            }
        }
        return flag;
    }




    return (
        <center>
            <div class="height-100 bg-light" style={{ width: "95%", backgroundColor: "red" }}>
                <center><label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>BATCH</label></center>
                <div class="d-flex flex-row-reverse bd-highlight">



                    {/* <div class="p-2 bd-highlight">
                        <label style={{ fontWeight: "bold", marginTop: 5 }}>{adminData.username}</label>
                    </div>
                    <div class="p-2 bd-highlight">
                        <label style={{ marginTop: 5 }}>User :</label>
                    </div> */}
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
                        {batchListData.map((item, i) => {
                            return (
                                <tr>
                                    <th scope="col">{i + 1}</th>
                                    <th scope="col">{item.uuid}</th>
                                    <th scope="col" >{item.title}</th>
                                    {item.status == "Pending" ? <th scope="col" >
                                        <button
                                            style={{}}
                                            onClick={() => {
                                                dispatch(setSelectedBatchData(item))
                                                props.setProjectFlowNo(3);
                                            }}

                                            type="button" class="btn btn-info">ADD STAFF & STUDENT</button>
                                    </th> : <th scope="col" style={{ fontWeight: "bold", color: "green" }}>{item.status}</th>}

                                </tr>
                            )
                        })}



                    </tbody>
                </table>
                {showCompleteButton() && <button
                    style={{}}
                    onClick={() => {

                        props.setProjectFlowNo(1);
                    }}

                    type="button" class="btn btn-info">COMPLETED</button>}

            </div>

        </center >
    )
}

export default Batch;