import React, { useState, useEffect } from 'react';
import './index.css';
import { getProjectList, createNewProject } from '../../../redux/reducer/projectlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-drag-drawer';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Container, ButtonToolbar, Jumbotron, Card } from 'react-bootstrap';
import { getStaffList } from '../../../redux/reducer/staff';
const SelectStaff = () => {
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
        projectListData
    } = projectlistStore;
    const {
        staffLoader,
        staffListData
    } = staffStore;

    const [staffSearchText, setStaffSearchText] = useState("");
    const [filetedDataList, setFiletedDataList] = useState([]);
    const [seletedStaffList, setSeletedStaffList] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    useEffect(() => {
        getStaffListFunc()
    }, []);
    const getStaffListFunc = () => {
        dispatch(getStaffList());
    }

    const handleFilter = (e) => {
        let lowerCaseText = e.toLowerCase();
        let newFilter = [];
        setShowSearch(true)

        for (let obj of staffListData) {
            let nameLowerCase = obj.username.toLowerCase();
            let n = nameLowerCase.search(lowerCaseText);
            if (n >= 0) {
                newFilter.push(obj);
            }
        }
        setFiletedDataList(newFilter);
    }

    const removeItem = (index) => {
        let newObj = seletedStaffList.splice(index, 1);
        newObj.splice(index, 1)
        setSeletedStaffList(newObj);

    }


    return (
        <center>
            <div class="height-100 bg-light" style={{ width: "95%", backgroundColor: "red" }}>
                <center><label style={{ marginTop: 20, fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>Selecte Staff</label></center>

                <center>
                    <input
                        value={staffSearchText}
                        onChange={(e) => {
                            setStaffSearchText(e.target.value);
                            handleFilter(e.target.value)
                        }}
                        style={{
                            marginLeft: 10,
                            borderColor: "transparent",
                            borderBottomColor: "gray",
                            textAlign: "center", width: "50%",
                            backgroundColor: "transparent",
                            fontSize: 18, marginBottom: 20
                        }}
                        type="text" id="fname" name="fname"
                        placeholder="Search staff name"
                    />
                </center>

                <div style={{ position: "absolute", width: "100%" }}>

                    <center>

                        <div style={{ width: "50%", backgroundColor: "white", marginLeft: -250, maxHeight: 300, overflow: "auto" }}>
                            {showSearch && <div class="d-flex flex-row-reverse bd-highlight" style={{ display: showSearch ? "block" : "none" }}>


                                <div class="p-2 bd-highlight">
                                    <label
                                        onClick={() => { setFiletedDataList([]); setShowSearch(false); setStaffSearchText(""); }}
                                        style={{ marginRight: 15, fontWeight: "bold" }}>X</label>
                                </div>
                            </div>}

                            {filetedDataList.map((item, i) => {
                                return (
                                    <div style={{ marginBottom: 20 }}>
                                        <label
                                            onClick={() => {
                                                let flag = true;
                                                for (let obj of seletedStaffList) {
                                                    if (obj.uuid == item.uuid) {
                                                        flag = false;
                                                    }
                                                }
                                                if (flag) {
                                                    setSeletedStaffList([...seletedStaffList, item]);
                                                    setFiletedDataList([]);
                                                    setShowSearch(false)
                                                    setStaffSearchText("");
                                                }

                                            }}
                                            style={{ marginTop: 15 }}>{item.username}</label>
                                    </div>
                                )
                            })}
                        </div>

                    </center>
                </div>
                {seletedStaffList.length != 0 && <div class="d-flex flex-row-reverse bd-highlight">


                    <div class="p-2 bd-highlight">
                        <button
                            onClick={() => {
                                //setIsShowCreateProject(true)
                            }}
                            type="button" class="btn btn-warning">NEXT</button>
                    </div>

                </div>}
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Sno</th>
                            <th scope="col">User Name</th>
                            <th scope="col">staffid</th>
                            <th scope="col">Email</th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {seletedStaffList.map((item, i) => {
                            return (
                                <tr>
                                    <th scope="col">{i + 1}</th>
                                    <th scope="col">{item.username}</th>
                                    <th scope="col" >{item.staffid}</th>
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



        </center >
    )
}

export default SelectStaff;