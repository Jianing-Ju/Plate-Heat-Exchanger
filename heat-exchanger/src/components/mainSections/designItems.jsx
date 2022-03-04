import { useContext, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
    FaCopy,
    FaFileExport,
    FaTrash,
    FaFolderPlus
} from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap"
import { deleteDesign, exportCharts } from "../../api";
import { MainContext } from "../main";
import AddToFolder from "./addToFolder";
import CopyDesign from "./copyDesign";
import DeleteDesign from "./deleteDesign";
import download from "downloadjs";
import ErrorMessage from "./errorMessage";

export default function DesignItems(props) {
    const { designType, id, name, lastModified } = props.design;
    const [showAddTo, setShowAddTo] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const { updateDesigns } = useContext(MainContext);
    const [showDelete, setShowDelete] = useState(false);
    const [exportError, setExportError] = useState(false);
    return (
        <tr>
            <td>
                <LinkContainer to={`/design/${designType}?userId=${props.userId}&designId=${id}`}>
                    <a className="text-dark">{name}</a>
                </LinkContainer>
            </td>
            <td>{designType.charAt(0).toUpperCase() + designType.slice(1)}</td>
            <td>{new Date(lastModified).toLocaleString()}</td>
            <td>
                <OverlayTrigger placement="top" overlay={<Tooltip>Copy</Tooltip>}>
                    <span><FaCopy className="me-1 clickable" onClick={() => setShowCopy(true)} /></span>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Export</Tooltip>}>
                    <span><FaFileExport className="me-1 clickable" onClick={async () => {
                        const blob = await exportCharts(id);
                        if (!blob) setExportError(true);
                        else download(blob, `deisgn-${new Date().toLocaleString()}.csv`);
                    }} /></span>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                    <span><FaTrash className="me-1 clickable" onClick={() => setShowDelete(true)} /></span>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Add To Folder</Tooltip>}>
                    <span><FaFolderPlus className="clickable" onClick={() => setShowAddTo(true)} /></span>
                </OverlayTrigger>
            </td>
            <AddToFolder show={showAddTo} setShow={setShowAddTo} designId={id} />
            <CopyDesign show={showCopy} setShow={setShowCopy} design={props.design} />
            <DeleteDesign show={showDelete} setShow={setShowDelete} design={props.design} />
            <ErrorMessage
                show={exportError} setShow={setExportError}
                title={"Unable to Export"} message={"This design is not completed, it cannot be exported at the moment."}
            />
        </tr>
    )
}