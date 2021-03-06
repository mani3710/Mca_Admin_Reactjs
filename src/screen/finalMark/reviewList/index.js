import React, { useState, useEffect } from 'react';
import './index.css';
import { getProjectList, createNewProject, createBatch, setSelectedBatchData, getBatchByProject, setSelectedBatchForMoreDetails, getReviewList } from '../../../redux/reducer/projectlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-drag-drawer';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Container, ButtonToolbar, Jumbotron, Card } from 'react-bootstrap';
import { setSelectedReview } from '../../../redux/reducer/review';
const ReviewList = (props) => {
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
        reviewList
    } = projectlistStore;
    const [isShowCreateProject, setIsShowCreateProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [projectCreateError, setProjectCreateError] = useState("");
    const [noOfBatch, setNoOfBatch] = useState(1);
    const [isShowBatch, setIsShowBatch] = useState(false);
    const [batchCreateError, setBatchCreateError] = useState("");


    useEffect(() => {
        dispatch(getReviewList(selectedProjectForViewMore.uuid));
    }, [])

    const setSelectedBatchForMoreDetailsFunc = (item) => {
        dispatch(setSelectedBatchForMoreDetails(item));
    }


    return (
        <center>
            <div class="height-100 bg-light" style={{ width: "95%", backgroundColor: "red" }}>
                <center><label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>REVIEWS</label></center>
                <div class="d-flex flex-row-reverse bd-highlight">


                    <div class="p-2 bd-highlight">
                        <button
                            onClick={() => {
                                // setIsShowCreateProject(true)
                                props.setProjectFlowNo(1);
                            }}
                            type="button" class="btn btn-secondary">BACK</button>
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
                        {reviewList.map((item, i) => {
                            return (
                                <tr>
                                    <th scope="col">{i + 1}</th>
                                    <th scope="col">{item.uuid}</th>
                                    <th scope="col" >{item.reviewname}</th>
                                    <th scope="col" >
                                        <button
                                            style={{}}
                                            onClick={() => {
                                                dispatch(setSelectedReview(item));
                                                props.setProjectFlowNo(4);
                                                // setSelectedBatchForMoreDetailsFunc(item)
                                                // if (item.uuid == "70a36fa4-befd-11ec-9d64-0242ac120002") {
                                                //     props.setProjectFlowNo(4);
                                                // } else if (item.uuid == "8b6c6372-befd-11ec-9d64-0242ac120002") {
                                                //     props.setProjectFlowNo(5);
                                                // } else if (item.uuid == "a053ae58-befd-11ec-9d64-0242ac120002") {
                                                //     props.setProjectFlowNo(6);
                                                // } else if (item.uuid == "b9eb59c4-befd-11ec-9d64-0242ac120002") {
                                                //     props.setProjectFlowNo(7);
                                                // }

                                            }}

                                            type="button" class="btn btn-info">Mark</button>
                                    </th>

                                </tr>
                            )
                        })}



                    </tbody>
                </table>




            </div>

        </center >
    )
}

export default ReviewList;