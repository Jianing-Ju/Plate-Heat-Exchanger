import {
    Button,
    Card,
    Container,
    Row,
    Col,
    ListGroup,
    Table,
    Dropdown
} from "react-bootstrap"
import DesignItems from "./mainSections/designItems.jsx";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { getDesigns, getFolders } from "../api.js";
import { FaPlusCircle } from "react-icons/fa";
import NewFolder from "./mainSections/newFolder.jsx";
import UploadChart from "./mainSections/uploadChart.jsx";

export const MainContext = createContext();

export function Main() {
    const { userId } = useParams();
    const [designs, setDesigns] = useState([]);
    const [initial, setInitial] = useState(true);
    const [showNewFolder, setShowNewFolder] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [folders, setFolders] = useState([]);
    // console.log(designs);
    // console.log(folders);

    // filters
    const typeFilters = {
        all: () => true,
        rating: (design) => design.designType == "rating",
        sizing: (design) => design.designType == "sizing"
    };
    const folderFilters = (folder) => {
        return (design) => design.folderId == folder;
    }
    const [filter, setFilter] = useState(() => typeFilters.all);

    // fetching
    const getAllDesigns = async () => {
        setDesigns(await getDesigns(userId));
    }
    const getAllFolders = async () => {
        setFolders(await getFolders(userId));
    }
    useEffect(() => {
        if (initial) {
            setInitial(false);
            getAllDesigns();
            getAllFolders();
            // setFilter(()=>typeFilters("all"));
        }
    })
    return (
        <MainContext.Provider value={{ folders: folders, updateDesigns: getAllDesigns }}>
            <Container>
                <Row>
                    <Col xs={3} className="folder-col">
                        <ListGroup variant="flush">
                            <ListGroup.Item
                                className="main-tab"
                                onClick={() => setFilter(() => typeFilters.all)}
                            >All</ListGroup.Item>
                            <ListGroup.Item
                                className="main-tab"
                                onClick={() => setFilter(() => typeFilters.rating)}
                            >Rating</ListGroup.Item>
                            <ListGroup.Item
                                className="main-tab"
                                onClick={() => setFilter(() => typeFilters.sizing)}
                            >Sizing</ListGroup.Item>
                        </ListGroup>
                        <div className="d-flex">
                            <h5>Folders</h5>
                            <h5 className="ms-auto" onClick={() => setShowNewFolder(true)}>
                                <FaPlusCircle className="clickable" />
                            </h5>
                        </div>
                        <NewFolder
                            show={showNewFolder}
                            setShow={setShowNewFolder}
                            userId={userId}
                            rank={folders.length + 1}
                            updateFolders={getAllFolders}
                        />

                        <ListGroup variant="flush">
                            {
                                folders.sort((a, b) => a.folderRank - b.folderRank).map((folder) =>
                                    <ListGroup.Item
                                        key={folder.id}
                                        className="main-tab"
                                        onClick={() => setFilter(() => folderFilters(folder.id))}
                                    >{folder.folderName}</ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Col>

                    <Col className="designs_col">
                        <h3 className="mt-1">Designs</h3>
                        <Table hover>
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Type</td>
                                    <td>Last Modified</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    designs.filter((design) => filter(design)).map((design) =>
                                        <DesignItems
                                            key={design.id}
                                            design={design}
                                            userId={userId}
                                            folders={folders}
                                        />
                                    )
                                }
                            </tbody>
                        </Table>
                        <Dropdown className="d-inline">
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                New
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/design/rating?userId=${userId}&designId=new`}>
                                    Rating
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to={`/design/sizing?userId=${userId}&designId=new`}>
                                    Sizing
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>{" "}
                        <Button variant="dark">Select</Button> {" "}
                        <Button variant="dark" onClick={() => setShowUpload(true)}>Import</Button>
                        <UploadChart show={showUpload} setShow={setShowUpload} userId={userId} />
                        {/* <NewFolder
                            show={showNewFolder}
                            setShow={setShowNewFolder}
                            userId={userId}
                            rank={folderCount + 1}
                            updateFolders={getAllFolders}
                        /> */}

                    </Col>
                </Row>
            </Container>

        </MainContext.Provider>

    )
}