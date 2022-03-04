import { useContext, useState } from "react";
import { FormControl, Modal, Button } from "react-bootstrap";
import { saveDesign } from "../../api";
import { UserContext } from "../../App";

export default function NewDeisgn(props) {
    const {show, setShow, designId, input, type, refresh, defaultName} = props;
    const defaultNameUsed = !defaultName? "Untitled": defaultName
    const [name, setName] = useState("");
    const {userId} = useContext(UserContext);
    const onAdd = async()=>{
        const nameSent = name == "" ? defaultNameUsed : name;
        await saveDesign(userId,designId, input, type, nameSent);
        setShow(false);
        if (refresh){
            refresh();
        }
    }
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Save Design</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Enter Design Name:
                <FormControl
                    className="mt-2"
                    placeholder={`(${defaultNameUsed})`}
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Cancel
                </Button>
                <Button variant="dark" type="submit"
                    onClick={onAdd}
                    type="submit"
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}