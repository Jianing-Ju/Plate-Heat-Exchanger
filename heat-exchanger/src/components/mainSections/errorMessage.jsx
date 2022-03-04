import { Modal, Button } from "react-bootstrap";

export default function ErrorMessage(props){
    const {title, message, show, setShow} = props;
    return (
        <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={()=>setShow(false)}>OK</Button>
            </Modal.Footer>
        </Modal>
    )
}