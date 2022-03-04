import { useState } from "react";
import { FormControl, Modal, Button } from "react-bootstrap";
import { addFolder } from "../../api";

export default function NewFolder(props) {
    const [name, setName] = useState("");
    return (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>New Folder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Enter Name for the New Folder:
                <FormControl
                    className="my-2"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button 
                variant="dark"
                type="submit"
                onClick={async ()=>{
                    await addFolder(name, props.userId, props.rank);
                    props.updateFolders();
                    props.setShow(false);
                }}
                >
                Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}