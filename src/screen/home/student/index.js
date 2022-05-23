import React, { useState, useEffect } from 'react';
import './index.css';
import { getProjectList, createNewProject } from '../../../redux/reducer/projectlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-drag-drawer';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Container, ButtonToolbar, Jumbotron, Card } from 'react-bootstrap';
import { getStudentList, setSelectedstudentDataList, removeSelectedStudentList } from '../../../redux/reducer/student';
const SelectStudent = (props) => {
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

    const [studentSearchText, setStudentSearchText] = useState("");
    const [filetedDataList, setFiletedDataList] = useState([]);
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

    return (
        <center>
            <div class="height-100 bg-light" style={{ width: "95%", backgroundColor: "red" }}>
                <center><label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>Selecte Student</label></center>

                <center>
                    <input
                        value={studentSearchText}
                        onChange={(e) => {


                            if (!e.target.value) {
                                setFiletedDataList([]);
                                setShowSearch(false)
                            } else {
                                handleFilter(e.target.value)
                            }
                            setStudentSearchText(e.target.value);
                        }}
                        style={{
                            marginLeft: 10,
                            borderColor: "transparent",
                            borderBottomColor: "gray",
                            textAlign: "center", width: "50%",
                            backgroundColor: "transparent",
                            fontSize: 18, marginBottom: 20
                        }}
                        type="number" id="fname" name="fname"
                        placeholder="Search student roll no"
                    />
                </center>

                <div style={{ position: "absolute", width: "100%" }}>

                    <center>

                        <div style={{ width: "50%", backgroundColor: "white", marginLeft: -250, maxHeight: 300, overflow: "auto" }}>
                            {showSearch && <div class="d-flex flex-row-reverse bd-highlight" style={{ display: showSearch ? "block" : "none" }}>


                                <div class="p-2 bd-highlight">
                                    <label
                                        onClick={() => { setFiletedDataList([]); setShowSearch(false); setStudentSearchText(""); }}
                                        style={{ marginRight: 15, fontWeight: "bold" }}>X</label>
                                </div>


                            </div>}

                            {filetedDataList.map((item, i) => {
                                return (
                                    <div style={{ marginBottom: 20 }}>
                                        <label
                                            onClick={() => {
                                                let flag = true;
                                                for (let obj of selectedstudentDataList) {
                                                    if (obj.uuid == item.uuid) {
                                                        flag = false;
                                                    }
                                                }
                                                if (flag) {
                                                    // setSeletedStudentList([...seletedStudentList, item]);
                                                    dispatch(setSelectedstudentDataList(item))
                                                    setFiletedDataList([]);
                                                    setShowSearch(false)
                                                    setStudentSearchText("");
                                                }

                                            }}
                                            style={{ marginTop: 15 }}>{item.rollno}, {item.username}</label>
                                    </div>
                                )
                            })}
                        </div>

                    </center>
                </div>
                {selectedstudentDataList.length != 0 && <div class="d-flex flex-row-reverse bd-highlight">


                    <div class="p-2 bd-highlight">
                        <button
                            onClick={() => {
                                //setIsShowCreateProject(true)
                                setSelectedStudentListFunc();
                            }}
                            type="button" class="btn btn-warning">NEXT</button>
                    </div>
                    <div class="p-2 bd-highlight">
                        <button
                            onClick={() => {
                                //setIsShowCreateProject(true)
                                props.setProjectFlowNo(3);
                            }}
                            type="button" class="btn btn-secondary">Back</button>
                    </div>

                </div>}
                <div style={{ overflow: "auto", height: "75vh" }}>
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
                            {selectedstudentDataList.map((item, i) => {
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
                                                    removeItem(i);
                                                }}

                                                type="button" class="btn btn-info">REMOVE</button>
                                        </th>
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

export default SelectStudent;