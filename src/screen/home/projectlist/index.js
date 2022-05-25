import React, { useState, useEffect } from 'react';
import './index.css';
import { getProjectList, createNewProject, createBatch, setSelectedProjectForViewMore } from '../../../redux/reducer/projectlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-drag-drawer';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Container, ButtonToolbar, Jumbotron, Card } from 'react-bootstrap';
const ProjectList = (props) => {
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
        projectListData,
        currentProjectDetails
    } = projectlistStore;
    const [isShowCreateProject, setIsShowCreateProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [projectCreateError, setProjectCreateError] = useState("");
    const [noOfBatch, setNoOfBatch] = useState(1);
    const [isShowBatch, setIsShowBatch] = useState(false);
    const [batchCreateError, setBatchCreateError] = useState("");

    useEffect(() => {
        getProjectListFunc()
    }, [])

    const getProjectListFunc = () => {
        dispatch(getProjectList(adminDetails?.uuid ? adminDetails.uuid : "029a62a4-c378-11ec-9d64-0242ac120002"))
    }
    const createProjectFunc = async () => {
        if (newProjectName) {
            setProjectCreateError("");

            await dispatch(createNewProject(
                {
                    uuid: uuidv4(),
                    title: newProjectName,
                    adminid: adminDetails?.uuid ? adminDetails.uuid : "029a62a4-c378-11ec-9d64-0242ac120002"
                }
            ));
            setIsShowCreateProject(false);
            getProjectListFunc();
            // props.setProjectFlowNo(2);
            setIsShowBatch(true);
        } else {
            setProjectCreateError("Empty Field Found!");
        }
    }
    const creatBatchFunc = () => {

        if (noOfBatch) {
            let bodyArray = [];
            for (let i = 0; i < noOfBatch; i++) {
                bodyArray.push({
                    "uuid": uuidv4(),
                    "title": `Batch ${i + 1}`,
                    "adminid": adminDetails?.uuid ? adminDetails.uuid : "029a62a4-c378-11ec-9d64-0242ac120002",
                    "projectid": currentProjectDetails?.uuid ? currentProjectDetails.uuid : "029a62a4-c378-11ec-9d64-0242ac120002"
                })
            }
            dispatch(createBatch(bodyArray));
            setIsShowBatch(false);
            props.setProjectFlowNo(8);
        } else {
            setBatchCreateError("Empty Field Found!")
        }
    }


    return (
        <center>
            <div class="height-100 bg-light" style={{ width: "95%", backgroundColor: "red" }}>
                <center><label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>PROJECT</label></center>
                <div class="d-flex flex-row-reverse bd-highlight">


                    <div class="p-2 bd-highlight">
                        <button
                            onClick={() => {
                                setIsShowCreateProject(true)
                            }}
                            type="button" class="btn btn-warning">CREATE PROJECT</button>
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
                                <th scope="col">Title</th>
                                <th scope="col"></th>

                            </tr>
                        </thead>
                        <tbody>
                            {projectListData.map((item, i) => {
                                return (
                                    <tr>
                                        <th scope="col">{i + 1}</th>
                                        <th scope="col">{item.uuid}</th>
                                        <th scope="col" >{item.title}</th>

                                        <th scope="col" >
                                            <button
                                                style={{ width: 100, height: 40 }}
                                                onClick={() => {
                                                    dispatch(setSelectedProjectForViewMore(item));
                                                    props.setProjectFlowNo(6);
                                                }}

                                                type="button" class="btn btn-info">INFO</button>
                                        </th>
                                    </tr>
                                )
                            })}



                        </tbody>
                    </table>
                </div>

            </div>
            <Drawer

                open={isShowCreateProject}
                // onRequestClose={this.toggle}
                direction='left'
            >

                <Card style={{ backgroundColor: "white", height: 280, width: 400 }}>


                    <Card.Body className="pl-3 " style={{ backgroundColor: "white" }}>
                        <center>
                            <label style={{ fontWeight: "bold" }}>CREATE PROJECT </label>
                            <form >
                                <div style={{ marginTop: 28 }}>

                                    <div></div>
                                    <input
                                        value={newProjectName}
                                        onChange={(e) => {
                                            setNewProjectName(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "80%" }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter project name"
                                    />
                                </div>



                            </form>
                            <center><label style={{ color: "red", marginTop: 10 }}>{projectCreateError}</label></center>
                            <div style={{ marginTop: 24 }}>
                                <button
                                    style={{ width: 100, height: 40 }}
                                    onClick={() => {
                                        setIsShowCreateProject(false)
                                    }}

                                    type="button" class="btn btn-info">CANCEL</button>
                                <button
                                    style={{ marginLeft: 55, width: 100, height: 40 }}
                                    onClick={() => {
                                        createProjectFunc()
                                    }}

                                    type="button" class="btn btn-warning">CREATE</button>
                            </div>

                        </center>




                    </Card.Body>
                </Card>

            </Drawer>


            <Drawer

                open={isShowBatch}
                // onRequestClose={this.toggle}
                direction='left'

            >

                <Card style={{ backgroundColor: "white", height: 280, width: 400 }}>


                    <Card.Body className="pl-3 " style={{ backgroundColor: "white" }}>
                        <center>
                            <label style={{ fontWeight: "bold" }}>CREATE BATCH </label>
                            <form >
                                <div style={{ marginTop: 28 }}>

                                    <div></div>
                                    <input
                                        value={noOfBatch}
                                        onChange={(e) => {
                                            setNoOfBatch(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "80%" }}
                                        type="number" id="fname" name="fname"
                                        placeholder="Enter number of batch"
                                    />
                                </div>



                            </form>
                            <center><label style={{ color: "red", marginTop: 10 }}>{batchCreateError}</label></center>
                            <div style={{ marginTop: 24 }}>
                                <button
                                    style={{ width: 100, height: 40 }}
                                    onClick={() => {
                                        setIsShowBatch(false)
                                    }}

                                    type="button" class="btn btn-info">CANCEL</button>
                                <button
                                    style={{ marginLeft: 55, width: 100, height: 40 }}
                                    onClick={() => {
                                        creatBatchFunc()
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

export default ProjectList;