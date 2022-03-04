import {
    Container,
    Row,
    Col,
    ListGroup,
    Tab,
    Nav,
    Button
} from "react-bootstrap"
import { useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCheckCircle, faSlidersH, faPen } from "@fortawesome/free-solid-svg-icons";
import Plate from "./designSections/plate";
import Fluid from "./designSections/fluid";
import Flow from "./designSections/flow";
import Result from "./designSections/result";
import Save from "./designSections/save";
import { getCalcRes, getAvail, getInput } from "../api";
import { Input } from "./inputs";
import { useEffect, useRef, useState } from "react";
import { validData } from "./designSections/utils/validate.js";
import { nanoid } from "nanoid";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Design(props) {
    const vOptional = ["plateCond", "fluidFoulingH", "fluidFoulingC"];
    const ratingExclude = ["fluidOutTempH", "fluidOutTempC", "fluidMaxPDropH", "fluidMaxPDropC"];
    const sizingExclude = ["plateNum"];
    const type = props.type;

    const query = useQuery();
    const userId = query.get("userId");
    const designId = query.get("designId");
    const [input, setInput] = useState(designId == "demo" ? new Input(true) : new Input());
    const [result, setResult] = useState();
    const [avail, setAvail] = useState({ plates: [], fluids: [] });
    const [valid, setValid] = useState(Object.keys(validData)
        .filter((key) => {
            if (type == "rating") {
                return !ratingExclude.includes(key);
            } else {
                return !sizingExclude.includes(key);
            }
        })
        .reduce((obj, key) => ({
            ...obj,
            [key]: true
        }), {}));
    const [initial, setInitial] = useState(true);


    // console.log(input);
    // console.log("result", result);
    // console.log("valid", valid);

    // fetch result
    const onResult = async () => {
        setResult(await getCalcRes(input, type));
    }

    // get available plates and fluids
    useEffect(() => {
        if (avail.plates.length == 0) {
            const fetchAvail = async () => {
                setAvail(await getAvail());
            }
            fetchAvail();
        }
    }, [avail]);

    useEffect(() => {
        if (designId != "demo" && designId != "new" && initial) {
            setInitial(false);
            // console.log("fetching");
            const fetchInput = async () => {
                setInput(await getInput(designId));
            }
            fetchInput();
        }
    })

    return (
        <Container>
            <Tab.Container defaultActiveKey="plate">
                <Row>
                    <Col sm={3}>
                        <div className="sticky-top">
                            <div className="d-flex my-2">
                                <h5>{type == "rating" ? "Rating" : "Sizing"}</h5>
                                <h5 className="ms-auto">
                                    <FontAwesomeIcon icon={type == "rating" ? faSlidersH : faPen} />
                                </h5>
                            </div>
                            <Nav variant="pills" className="flex-column steps-tab mb-2">

                                <Nav.Item>
                                    <Nav.Link eventKey="plate" >
                                        <div className="d-flex">
                                            Plate
                                            {Object.entries(valid)
                                                .filter(value => value[0].search("plate") == 0 && !vOptional.includes(value[0]))
                                                .every(value => value[1] && input.plate[value[0]]) && input.plate.plateMat ?
                                                <FontAwesomeIcon icon={faCheckCircle}
                                                    className="ms-auto align-self-center text-success"
                                                /> :
                                                <FontAwesomeIcon icon={faClock}
                                                    className="ms-auto align-self-center text-warning"
                                                />
                                            }
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fluid">
                                        <div className="d-flex">
                                            Fluid
                                            {Object.entries(valid)
                                                .filter(value => value[0].search("fluid") == 0
                                                    && !vOptional.includes(value[0]))
                                                .every(value => value[1] && input.fluid[value[0]]) ?
                                                <FontAwesomeIcon icon={faCheckCircle}
                                                    className="ms-auto align-self-center text-success"
                                                /> :
                                                <FontAwesomeIcon icon={faClock}
                                                    className="ms-auto align-self-center text-warning"
                                                />
                                            }
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="flow">
                                        <div className="d-flex">
                                            Flow
                                            {Object.entries(valid)
                                                .filter(value => value[0].search("flow") == 0)
                                                .every(value => value[1] && input.flow[value[0]]) ?
                                                <FontAwesomeIcon icon={faCheckCircle}
                                                    className="ms-auto align-self-center text-success"
                                                /> :
                                                <FontAwesomeIcon icon={faClock}
                                                    className="ms-auto align-self-center text-warning"
                                                />
                                            }
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="results"
                                        disabled={!Object.entries(valid)
                                            .filter(value => !vOptional.includes(value[0]))
                                            .every(value => value[1]) // have invalid
                                            || !Object.entries(Object.values(input).reduce((type, obj)=>({
                                                ...obj,
                                                ...type
                                            }), {}))
                                            .every(pair => !(pair[0] in valid) || vOptional.includes(pair[0]) || pair[1])
                                            }
                                        onClick={onResult}
                                    >Results</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            {designId == "demo" ||
                                <Save
                                    userId={userId}
                                    designId={designId == "new" ? nanoid() : designId}
                                    type={type}
                                    input={input}
                                />
                            }

                        </div>

                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="plate">
                                <Plate
                                    input={input.plate}
                                    setInput={setInput}
                                    valid={valid}
                                    setValid={setValid}
                                    avail={avail.plates}
                                    type={type}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fluid">
                                <Fluid
                                    input={input.fluid}
                                    setInput={setInput}
                                    valid={valid}
                                    setValid={setValid}
                                    avail={avail.fluids}
                                    type={type}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="flow">
                                <Flow
                                    input={input.flow}
                                    setInput={setInput}
                                    valid={valid}
                                    setValid={setValid}
                                    type={type}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="results">
                                {result && <Result result={result} type={type} designId={designId}/>}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}