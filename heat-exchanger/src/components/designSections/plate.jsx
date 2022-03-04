import {
    Card,
    Container,
    Form,
    FormControl,
    InputGroup,
    FloatingLabel
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import DataInput from "./steps/dataInput.jsx";

export default function Plate(props) {
    return (
        <Form className="input-container">
            <Card className="steps">
                <Card.Header>Plate Material</Card.Header>
                <Card.Body>
                    <Form.Select className="form-item"
                        value={props.input.plateMat}
                        onChange={(event) => {
                            props.setInput((prevInput) => ({
                                ...prevInput,
                                plate: {
                                    ...prevInput.plate,
                                    plateMat: event.target.value
                                }
                            }))
                        }}>
                        <option value="">Select plate material</option>
                        {props.avail.map((value) => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </Form.Select>
                    <DataInput
                        classes="form-item-last"
                        name="plateCond"
                        label="Plate Thermal Conductivity"
                        placeholder="(Optional)"
                        unit="W/m∙K"
                        input={props.input}
                        setInput={props.setInput}
                        valid={props.valid}
                        setValid={props.setValid}
                    />
                </Card.Body>
            </Card>
            <Card className="steps">
                <Card.Header>Plate Geometry</Card.Header>
                <Card.Body>
                    <Container className="plate-geo1">
                        <div className="img-input-parent">
                            <DataInput classes="img-input-child input-port-dia"
                                name="platePortDia"
                                unit="m"
                                size="sm"
                                input={props.input}
                                setInput={props.setInput}
                                valid={props.valid}
                                setValid={props.setValid}
                            />
                            <DataInput classes="img-input-child input-width"
                                name="plateWidth"
                                unit="m"
                                size="sm"
                                input={props.input}
                                setInput={props.setInput}
                                valid={props.valid}
                                setValid={props.setValid}
                            />
                            <DataInput classes="img-input-child input-port-dis-h"
                                name="platePortDisH"
                                unit="m"
                                size="sm"
                                input={props.input}
                                setInput={props.setInput}
                                valid={props.valid}
                                setValid={props.setValid}
                            />
                            <DataInput classes="img-input-child input-port-dis-v"
                                name="platePortDisV"
                                unit="m"
                                size="sm"
                                input={props.input}
                                setInput={props.setInput}
                                valid={props.valid}
                                setValid={props.setValid}
                            />
                            <DataInput classes="img-input-child input-port-dis-v"
                                name="platePortDisV"
                                unit="m"
                                size="sm"
                                input={props.input}
                                setInput={props.setInput}
                                valid={props.valid}
                                setValid={props.setValid}
                            />
                            <DataInput classes="img-input-child input-length"
                                name="plateLength"
                                unit="m"
                                size="sm"
                                input={props.input}
                                setInput={props.setInput}
                                valid={props.valid}
                                setValid={props.setValid}
                            />
                            <DataInput classes="img-input-child input-beta"
                                name="plateBeta"
                                unit="&#176;"
                                size="sm"
                                input={props.input}
                                setInput={props.setInput}
                                valid={props.valid}
                                setValid={props.setValid}
                            />
                            <DataInput classes="img-input-child input-thickness"
                                name="plateThick"
                                unit="mm"
                                size="sm"
                                input={props.input}
                                setInput={props.setInput}
                                valid={props.valid}
                                setValid={props.setValid}
                            />
                            <DataInput classes="img-input-child input-pitch"
                                name="platePitch"
                                unit="mm"
                                size="sm"
                                input={props.input}
                                setInput={props.setInput}
                                valid={props.valid}
                                setValid={props.setValid}
                            />
                        </div>
                        <img className="plate-img1" src="https://i.ibb.co/7ybjkZN/Picture-1.png" />
                        <img className="plate-img1" src="https://i.ibb.co/Xydb3fL/Picture-2.png" />

                    </Container>
                    <DataInput
                        classes="form-item-last"
                        name="plateEnlarge"
                        label="Enlargement Fatcor"
                        input={props.input}
                        setInput={props.setInput}
                        valid={props.valid}
                        setValid={props.setValid}
                    />

                </Card.Body>
            </Card>
            {props.type == "rating" &&
                <Card className="steps">
                    <Card.Header>Arrangement</Card.Header>
                    <Card.Body>
                        <DataInput
                            classes="form-item-last"
                            name="plateNum"
                            label="Number of Plates"
                            input={props.input}
                            setInput={props.setInput}
                            valid={props.valid}
                            setValid={props.setValid}
                        />
                    </Card.Body>
                </Card>
            }
        </Form>

    )
}