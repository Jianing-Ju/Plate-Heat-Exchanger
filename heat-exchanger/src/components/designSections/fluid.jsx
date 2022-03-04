import { useState } from "react"
import {
    Card,
    Form,
    InputGroup,
    FormControl
} from "react-bootstrap"
import DataInput from "./steps/dataInput.jsx"

export default function Fluid(props) {
    const [tempRangeC, setTempRangeC] = useState([]);
    const [tempRangeH, setTempRangeH] = useState([]);

    return (
        <Form className="input-container">
            <Card className="steps">
                <Card.Header>Cold Fluid</Card.Header>
                <Card.Body>
                    <Form.Select className="form-item"
                        value={props.input.fluidTypeC}
                        onChange={(event) => {
                            props.setInput((prevInput) => ({
                                ...prevInput,
                                fluid: {
                                    ...prevInput.fluid,
                                    fluidTypeC: event.target.value
                                }
                            }));
                            // get range of that fluid
                            setTempRangeC(props.avail[event.target.value]);
                            // clear in/out temp if fluid type is deselected.
                            const clearTemp = props.type == "sizing" ?
                                {
                                    fluidInTempC: "",
                                    fluidOutTempC: ""
                                } :
                                {
                                    fluidInTempC: ""
                                };
                            props.setInput((prevInput) => ({
                                ...prevInput,
                                fluid: {
                                    ...prevInput.fluid,
                                    ...clearTemp
                                }
                            }))
                        }}>
                        <option value="">Select fluid type</option>
                        {Object.keys(props.avail).map(value => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </Form.Select>
                    <DataInput
                        name="fluidInTempC"
                        label="Inlet Temperature"
                        unit="&#176;C"
                        readOnly={!props.input.fluidTypeC}
                        range={tempRangeC}
                        input={props.input}
                        setInput={props.setInput}
                        valid={props.valid}
                        setValid={props.setValid}
                    />
                    {props.type == "sizing" &&
                        <DataInput
                            name="fluidOutTempC"
                            label="Outlet Temperature"
                            unit="&#176;C"
                            readOnly={!props.input.fluidTypeC}
                            range={tempRangeC}
                            input={props.input}
                            setInput={props.setInput}
                            valid={props.valid}
                            setValid={props.setValid}
                        />
                    }
                    <DataInput
                        name="fluidMRateC"
                        label="Mass Flow Rate"
                        unit="kg/s"
                        input={props.input}
                        setInput={props.setInput}
                        valid={props.valid}
                        setValid={props.setValid}
                    />
                    {props.type == "sizing" &&
                        <DataInput
                            name="fluidMaxPDropC"
                            label="Maximum Allowed Pressure Drop"
                            unit="Pa"
                            input={props.input}
                            setInput={props.setInput}
                            valid={props.valid}
                            setValid={props.setValid}
                        />
                    }
                    <DataInput
                        classes="form-item-last"
                        name="fluidFoulingC"
                        placeholder="(Optional)"
                        label="Fouling Factor"
                        input={props.input}
                        setInput={props.setInput}
                        valid={props.valid}
                        setValid={props.setValid}
                    />
                </Card.Body>
            </Card>

            <Card className="steps">
                <Card.Header>Hot Fluid</Card.Header>
                <Card.Body>
                    <Form.Select className="form-item"
                        value={props.input.fluidTypeH}
                        onChange={(event) => {
                            props.setInput((prevInput) => ({
                                ...prevInput,
                                fluid: {
                                    ...prevInput.fluid,
                                    fluidTypeH: event.target.value
                                }
                            }));
                            // get range of that fluid
                            setTempRangeH(props.avail[event.target.value]);
                            // clear in/out temp if fluid type is deselected.
                            const clearTemp = props.type == "sizing" ?
                                {
                                    fluidInTempH: "",
                                    fluidOutTempH: ""
                                } :
                                {
                                    fluidInTempH: ""
                                };
                            props.setInput((prevInput) => ({
                                ...prevInput,
                                fluid: {
                                    ...prevInput.fluid,
                                    ...clearTemp
                                }
                            }))
                        }}>
                        <option value="">Select fluid type</option>
                        {Object.keys(props.avail).map(value => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </Form.Select>
                    <DataInput
                        name="fluidInTempH"
                        label="Inlet Temperature"
                        unit="&#176;C"
                        readOnly={!props.input.fluidTypeH}
                        range={tempRangeH}
                        input={props.input}
                        setInput={props.setInput}
                        valid={props.valid}
                        setValid={props.setValid}
                    />
                    {props.type == "sizing" &&
                        <DataInput
                            name="fluidOutTempH"
                            label="Outlet Temperature"
                            unit="&#176;C"
                            readOnly={!props.input.fluidTypeH}
                            range={tempRangeH}
                            input={props.input}
                            setInput={props.setInput}
                            valid={props.valid}
                            setValid={props.setValid}
                        />
                    }
                    <DataInput
                        name="fluidMRateH"
                        label="Mass Flow Rate"
                        unit="kg/s"
                        input={props.input}
                        setInput={props.setInput}
                        valid={props.valid}
                        setValid={props.setValid}
                    />
                    {props.type == "sizing" &&
                        <DataInput
                            name="fluidMaxPDropH"
                            label="Maximum Allowed Pressure Drop"
                            unit="Pa"
                            input={props.input}
                            setInput={props.setInput}
                            valid={props.valid}
                            setValid={props.setValid}
                        />
                    }
                    <DataInput
                        classes="form-item-last"
                        name="fluidFoulingH"
                        placeholder="(Optional)"
                        label="Fouling Factor"
                        input={props.input}
                        setInput={props.setInput}
                        valid={props.valid}
                        setValid={props.setValid}
                    />
                </Card.Body>
            </Card>
        </Form>
    )
}