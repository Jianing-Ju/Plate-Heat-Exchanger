import { useState } from "react";
import { Modal, Button, FormControl } from "react-bootstrap";
import { saveDesign, designExists, updateDesign } from "../../api.js";
import NewDeisgn from "../commonSections/newDesign.jsx";

export default function Save(props) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [inputId, setInputId] = useState();
    const onSave = async () => {
        if (inputId) {
            // prev saved. Update.
            const { success } = await updateDesign(inputId, props.input);
        } else {
            // first time. Check whether in DB.
            const { exists, inputId: newId } = await designExists(props.designId);
            if (exists) {
                const { success } = await updateDesign(newId, props.input);
                setInputId(newId);
            } else {
                setShow(true);
            }
        }
    }
    return (
        <>
            <div className="d-grid">
                <Button variant="dark" onClick={onSave}>
                    Save
                </Button>
            </div>
            <NewDeisgn
                show={show}
                setShow={setShow}
                userId={props.userId}
                designId={props.designId}
                input={props.input}
                type={props.type}
            />
        </>

    )
}