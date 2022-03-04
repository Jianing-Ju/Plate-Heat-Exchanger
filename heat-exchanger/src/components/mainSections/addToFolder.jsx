import { useContext, useState } from "react";
import { FormSelect, Modal, Button } from "react-bootstrap";
import { MainContext } from "../main"
import { setFolder } from "../../api";

export default function AddToFolder(props) {
    const { folders, userId, updateDesigns } = useContext(MainContext);
    const [folderSelected, setFolderSelected] = useState("");
    return (
        <>
            <Modal show={props.show} onHide={() => props.setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Design to Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Select a Folder:
                    <FormSelect
                        value={folderSelected}
                        onChange={(event) => setFolderSelected(event.target.value)}
                    >
                        <option value="">...</option>
                        {
                            folders.sort((a, b) => a.folderRank - b.folderRank).map((folder) =>
                                <option
                                    key={folder.id}
                                    value={folder.id}
                                >{folder.folderName}</option>
                            )
                        }
                    </FormSelect>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        disabled={folderSelected == ""}
                        variant="dark"
                        onClick={async() => {
                            await setFolder(props.designId,folderSelected);
                            await updateDesigns();
                            props.setShow(false);
                        }}
                    >Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}