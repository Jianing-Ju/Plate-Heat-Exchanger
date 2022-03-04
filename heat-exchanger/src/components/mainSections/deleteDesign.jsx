import { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteDesign } from "../../api";
import { MainContext } from "../main";

export default function DeleteDesign(props) {
    const { show, setShow, design } = props;
    const { updateDesigns } = useContext(MainContext);
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header>
                <Modal.Title>Delete Design</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Deleting the Design "{design.name}"?
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => setShow(false)}
                >Cancel</Button>
                <Button
                    variant="dark"
                    onClick={async () => {
                        await deleteDesign(design.id);
                        updateDesigns();
                        setShow(false);
                    }}
                >Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}