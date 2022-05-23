import React, { useState, useEffect } from 'react';
import './index.css';
import { setSelectedBatchForMoreDetails, getReviewList, getFirstReviewMarks, getFinalReviewMarks } from '../../../redux/reducer/projectlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-drag-drawer';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Container, ButtonToolbar, Jumbotron, Card } from 'react-bootstrap';
import jsPDF from "jspdf";
import "jspdf-autotable";
const FinalReview = (props) => {
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
        reviewList,
        firstReviewMarkList,
        selectedBatchForMoreDetailsObj,
        secondReviewMarkList,
        thirdReviewMarkList,
        finalReviewMarkList
    } = projectlistStore;
    const [isShowCreateProject, setIsShowCreateProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [projectCreateError, setProjectCreateError] = useState("");
    const [noOfBatch, setNoOfBatch] = useState(1);
    const [isShowBatch, setIsShowBatch] = useState(false);
    const [batchCreateError, setBatchCreateError] = useState("");


    useEffect(() => {
        dispatch(getFinalReviewMarks(selectedBatchForMoreDetailsObj.uuid));
    }, [])



    const getTotalMark = (item) => {
        return parseFloat(item.internal) + parseFloat(item.external) + parseFloat(item.guidemark);

    }

    const exportMarkWithOutDetails = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = `${selectedBatchForMoreDetailsObj.title} final review  marks`;
        const headers = [["ROLL", "Name", "Mark"]];

        const data = finalReviewMarkList.map(elt => [elt.rollno, elt.name, getTotalMark(elt)]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save(`${selectedBatchForMoreDetailsObj.title} final review .pdf`)
    }

    const exportMarkWithDetails = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = `${selectedBatchForMoreDetailsObj.title} final Review  Marks`;
        const headers = [["ROLL", "Name", "Internal", "External", "Report", "Total"]];

        const data = finalReviewMarkList.map(elt => [
            elt.name,
            elt.rollno,
            parseFloat(elt.internal).toFixed(1),
            parseFloat(elt.external).toFixed(1),
            parseFloat(elt.guidemark).toFixed(1),
            getTotalMark(elt)]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save(`${selectedBatchForMoreDetailsObj.title} Review 3 Details.pdf`)
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
                                exportMarkWithDetails()
                            }}
                            type="button" class="btn btn-secondary">Download with details</button>
                    </div>
                    <div class="p-2 bd-highlight">

                        <button
                            onClick={() => {
                                // setIsShowCreateProject(true)
                                exportMarkWithOutDetails()
                            }}
                            type="button" class="btn btn-secondary">Download without details</button>
                    </div>
                    <div class="p-2 bd-highlight">

                        <button
                            onClick={() => {
                                // setIsShowCreateProject(true)
                                props.setProjectFlowNo(3);
                            }}
                            type="button" class="btn btn-secondary">BACK</button>
                    </div>



                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Sno</th>
                            <th scope="col">Roll no</th>
                            <th scope="col">Name</th>
                            <th scope="col">Internal</th>
                            <th scope="col">External</th>
                            <th scope="col">Report</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {finalReviewMarkList.map((item, i) => {
                            return (
                                <tr>
                                    <th scope="col">{i + 1}</th>
                                    <th scope="col">{item.rollno}</th>
                                    <th scope="col" >{item.name}</th>
                                    <th scope="col" >{parseFloat(item.internal).toFixed(1)}</th>
                                    <th scope="col" >{parseFloat(item.external).toFixed(1)}</th>
                                    <th scope="col" >{parseFloat(item.guidemark).toFixed(1)}</th>
                                    <th scope="col" >{getTotalMark(item)}</th>
                                </tr>
                            )
                        })}



                    </tbody>
                </table>




            </div>

        </center >
    )
}

export default FinalReview;