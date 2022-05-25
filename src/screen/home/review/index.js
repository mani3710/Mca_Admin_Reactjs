import React, { useState, useEffect } from 'react';
import './index.css';
import { getProjectList, createNewProject } from '../../../redux/reducer/projectlist';
import { updateReviewInfo, removeReviewInfo, createReviewAndTopic } from '../../../redux/reducer/review';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-drag-drawer';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Container, ButtonToolbar, Jumbotron, Card } from 'react-bootstrap';
import { getStudentList, setSelectedstudentDataList, removeSelectedStudentList } from '../../../redux/reducer/student';
const Review = (props) => {
    const dispatch = useDispatch();
    //Store 
    const authStore = useSelector(state => state.auth);
    const projectlistStore = useSelector(state => state.projectlist);
    const staffStore = useSelector(state => state.staff);
    const studentStore = useSelector(state => state.student);
    const reviewStore = useSelector(state => state.review);
    const {
        authLoader,
        adminDetails
    } = authStore;
    const {
        projectLoader,
        projectListData,
        selectedBatchData,
        currentProjectDetails
    } = projectlistStore;
    const {
        studentLoader,
        studentListData,
        selectedstudentDataList
    } = studentStore;
    const {
        reviewLoader,
        reviewInfo
    } = reviewStore;

    const [studentSearchText, setStudentSearchText] = useState("");
    const [filetedDataList, setFiletedDataList] = useState([]);
    const [reviewObject, setReviewObject] = useState({ name: "", uuid: "324323423", topic: [] });
    const [isShowReviewCreation, setIsShowReviewCreation] = useState(false);
    const [reviewError, setReviewError] = useState("");
    //  const [seletedStudentList, setSeletedStudentList] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    useEffect(() => {
        getStudentListFunc()
    }, []);
    const getStudentListFunc = () => {
        dispatch(getStudentList());
    }

    const handleFilter = (e) => {
        let lowerCaseText = e.toLowerCase();
        let newFilter = [];
        setShowSearch(true)
        console.log(studentListData);
        for (let obj of studentListData) {
            let nameLowerCase = obj.rollno.toLowerCase();
            let n = nameLowerCase.search(lowerCaseText);
            if (n >= 0) {
                newFilter.push(obj);
            }
        }
        setFiletedDataList(newFilter);
    }

    const removeItem = (index) => {
        dispatch(removeSelectedStudentList(index));

    }

    const setSelectedStudentListFunc = () => {
        //dispatch(setSelectedstudentDataList(seletedStudentList));
        props.setProjectFlowNo(5);
    }
    const submitData = async () => {
        let reviewList = [];
        let reviewTopicList = [];
        for (let obj of reviewInfo) {
            let reviewObj = {
                "uuid": obj.uuid,
                "title": obj.name,
                "projectid": currentProjectDetails?.uuid ? currentProjectDetails.uuid : "bc7dfca5-de72-4320-a7e1-47213467eed1"
            }
            reviewList.push(reviewObj);
            for (let topic of obj.topic) {
                let reviewTopicObj = {
                    "uuid": uuidv4(),
                    "reviewid": obj.uuid,
                    "maxmark": topic.mark,
                    "title": topic.topic
                }
                reviewTopicList.push(reviewTopicObj);
            }
        }
        console.log("reviewList", reviewList);
        console.log("reviewTopicList", reviewTopicList);
        await dispatch(createReviewAndTopic({ reviewList: reviewList, reviewTopicList: reviewTopicList }))
        props.setProjectFlowNo(2);
    }
    const getReviewTotalMax = () => {
        if (reviewObject.topic) {
            let total = 0;
            for (let markObj of reviewObject.topic) {
                if (markObj.mark) {
                    total += parseInt(markObj.mark);
                }


            }
            return total;
        }
        return 10;

    }
    const checkValidation = () => {
        if (reviewObject.topic) {

            for (let markObj of reviewObject.topic) {
                console.log("88", markObj);
                if (!markObj.topic && !markObj.mark) {
                    return false;
                }
            }
            console.log("93");
            if (!reviewObject.name || (getReviewTotalMax() != 50)) {
                return false;
            }
            console.log("97");
            return true;
        }
        if (!reviewObject.name || (getReviewTotalMax() != 50)) {
            return false;
        }
        console.log("104");
        return false;
    }
    return (
        <center>
            <div class="height-100 bg-light" style={{ width: "95%", backgroundColor: "red" }}>
                <center><label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>Review</label></center>


                {reviewInfo.length != 0 && <div class="d-flex flex-row-reverse bd-highlight">


                    <div class="p-2 bd-highlight">
                        <button
                            onClick={() => {
                                //setIsShowCreateProject(true)
                                // setSelectedStudentListFunc();
                                submitData();
                            }}
                            type="button" class="btn btn-warning">CONFIRM REVIEW & MOVE TO NEXT</button>
                    </div>


                </div>}
                <div style={{ overflow: "auto", height: "75vh" }}>
                    {reviewInfo.map((item, index) => {
                        return (
                            <div style={{ width: "100%", textAlign: "left" }}>
                                <label>Name : </label>
                                <label style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}>{item.name} </label>
                                <label
                                    onClick={() => {
                                        dispatch(removeReviewInfo(index))
                                    }}
                                    style={{ fontSize: 15, marginLeft: 10, textDecorationLine: "underline", color: "blue" }}>Delete </label>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sno</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Max Mark</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.topic.map((value, i) => {
                                            return (
                                                <tr>
                                                    <th scope="col">{i + 1}</th>
                                                    <th scope="col">{value.topic}</th>
                                                    <th scope="col" >{value.mark}</th>

                                                </tr>
                                            )
                                        })}



                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                    <button
                        onClick={() => {
                            //setIsShowCreateProject(true) 
                            // props.setProjectFlowNo(3);
                            setReviewObject({ ...reviewObject, name: "", uuid: uuidv4(), topic: [] });
                            setIsShowReviewCreation(true);
                        }}
                        type="button" class="btn btn-secondary">Add review</button>
                </div>

            </div>
            <Drawer

                open={isShowReviewCreation}
                // onRequestClose={this.toggle}
                direction='left'
            >

                <Card style={{ backgroundColor: "white", height: 280, width: 400, marginTop: -300 }}>


                    <Card.Body className="pl-3 " style={{ backgroundColor: "white" }}>
                        <center>
                            <label style={{ fontWeight: "bold" }}>Review Details</label>
                            <form >
                                <div style={{ marginTop: 28, maxHeight: "50vh", overflow: "auto" }}>

                                    <div></div>
                                    <input
                                        value={reviewObject.name}
                                        onChange={(e) => {
                                            // setNewProjectName(e.target.value);
                                            setReviewObject({ ...reviewObject, name: e.target.value })
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "80%" }}
                                        type="text" id="fname" name="fname"
                                        placeholder="Enter review name"
                                    />



                                    {reviewObject.topic.map((item, index) => {
                                        return (
                                            <div style={{ marginTop: 20 }}>
                                                <label style={{ fontWeight: "bold" }}>Topic {index + 1}</label>
                                                <div style={{ marginTop: 15 }}>
                                                    <label>Name :</label>
                                                    <input
                                                        value={item.topic}
                                                        onChange={(e) => {
                                                            let newArr = reviewObject.topic;
                                                            newArr[index].topic = e.target.value

                                                            setReviewObject({ ...reviewObject, topic: newArr });
                                                        }}
                                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "50%" }}
                                                        type="text" id="fname" name="fname"
                                                        placeholder="Enter topic name"
                                                    />
                                                </div>
                                                <div style={{ marginTop: 20 }}>
                                                    <label>Mark :</label>
                                                    <input
                                                        value={item.mark}
                                                        onChange={(e) => {
                                                            let newArr = reviewObject.topic;
                                                            newArr[index].mark = e.target.value

                                                            setReviewObject({ ...reviewObject, topic: newArr });
                                                        }}
                                                        style={{ marginLeft: 20, borderColor: "transparent", borderBottomColor: "gray", textAlign: "center", width: "50%" }}
                                                        type="number" id="fname" name="fname"
                                                        placeholder="Enter topic mark"
                                                        max={50}
                                                        maxLength={2}
                                                        min={1}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <button
                                        onClick={() => {
                                            //setIsShowCreateProject(true) 
                                            // props.setProjectFlowNo(3);
                                            let newArr = reviewObject.topic;
                                            newArr.push({ topic: "", mark: "" });
                                            setReviewObject({ ...reviewObject, topic: newArr });

                                        }}
                                        style={{ marginTop: 20, marginBottom: 20 }}
                                        type="button" class="btn btn-secondary">Add Topic</button>
                                </div>
                            </form>
                            <label>Total Mark : </label><label style={{ color: getReviewTotalMax() == 50 ? "green" : "red", fontWeight: "bold", marginLeft: 10, fontSize: 20 }}>{getReviewTotalMax()}</label>
                            <div></div>
                            <label style={{ color: "gray", opacity: 0.6, fontSize: 12 }}> Total must equal to 50</label>
                            <div></div>
                            <label style={{ color: "red", opacity: 0.6, fontSize: 15 }}>{reviewError}</label>
                            {/* <center><label style={{ color: "red", marginTop: 10 }}>{projectCreateError}</label></center> */}
                            <div style={{ marginTop: 24 }}>
                                <button
                                    style={{ width: 100, height: 40 }}
                                    onClick={() => {
                                        setIsShowReviewCreation(false)
                                    }}

                                    type="button" class="btn btn-info">CANCEL</button>
                                <button
                                    style={{ marginLeft: 55, width: 100, height: 40 }}
                                    onClick={() => {
                                        // createProjectFunc()
                                        if (checkValidation()) {
                                            setReviewError("");
                                            dispatch(updateReviewInfo(reviewObject));
                                            setIsShowReviewCreation(false)
                                        } else {
                                            setReviewError("Empty Field found/check max mark");
                                        }
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

export default Review;