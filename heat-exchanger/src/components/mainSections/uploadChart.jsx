import { useContext, useState } from "react";
import { FormControl, Modal, Card, Form, Button } from "react-bootstrap";
import { FaFile } from "react-icons/fa";
import { downloadFile, uploadChart } from "../../api";
import { MainContext } from "../main";
import download from "downloadjs";

export default function UploadChart(props) {
    const [file, setFile] = useState();
    const { updateDesigns } = useContext(MainContext);
    return (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Upload New Designs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="mb-1">Download Template:</p>
                <FaFile />
                <a className="text-dark" href={"http://localhost:5000/template.csv"} download="template">
                    Template
                </a> {" "}
                <FaFile />
                <a className="text-dark" href={"http://localhost:5000/available.xlsx"} download="available">
                    Available Fluids and Plate Materials
                </a>
                <hr />
                <p>Upload File:</p>
                <Form className="justify-content-center d-flex">
                    <Form.Control
                        type="file"
                        className="w-75"
                        onChange={(event) => {
                            setFile(event.target.files[0]);
                        }}
                    />
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={async () => {
                    await uploadChart(file, props.userId);
                    updateDesigns();
                    props.setShow(false);
                }}>Upload</Button>
            </Modal.Footer>
        </Modal>
    )
}