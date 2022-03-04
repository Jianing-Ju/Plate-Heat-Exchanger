import InvalidTag from "./invalidTag.jsx";
import { validData, validate, updateGeo } from "../utils/validate.js";
import {
    FormControl,
    InputGroup
} from "react-bootstrap";
import { useEffect, useState } from "react";

export default function DataInput(props) {
    const [message, setMessage] = useState();
    const [empty, setEmpty] = useState(true);
    const name = props.name;
    const type = name.search("fluid") == 0 ? "fluid" : name.search("flow") == 0 ? "flow" : "plate";
    const range = props.range ? props.range : validData[name];
    const geoNames = ["platePortDia", "plateWidth", "platePortDisH", "platePortDisV", "plateLength"];
    return (
        <div className={props.classes + " form-item"}>
            <InputGroup size={props.size} >
                {props.label && <InputGroup.Text>{props.label}</InputGroup.Text>}
                <FormControl aria-label={name}
                    value={props.input[name]}
                    placeholder={props.placeholder}
                    readOnly={props.readOnly}
                    onChange={(event) => {
                        const value = event.target.value;
                        props.setInput((prevInput) => ({
                            ...prevInput,
                            [type]: {
                                ...prevInput[type],
                                [name]: value
                            }
                        }));
                        setEmpty(value == "");
                        // validate
                        // range
                        let valid = validate(value, range)
                        // special
                        
                        if (valid) {
                            // 1. flow pass: cannot have 2-3 2-4 3-4
                            if (type == "flow") {
                                const otherName = name == "flowPassC" ? "flowPassH" : "flowPassC";
                                const flow1 = value;
                                const flow2 = props.input[otherName];
                                const [flowLarge, flowSmall] = flow1 > flow2 ?
                                    [flow1, flow2] : [flow2, flow1];
                                if ((flowLarge == 3 && flowSmall == 2) ||
                                    (flowLarge == 4 && flowSmall == 2) ||
                                    (flowLarge == 4 && flowSmall == 3)) {
                                    valid = false;
                                    setMessage("Pass configuration 2-3, 2-4 or 3-4 is invalid");
                                } else {
                                    // set other to be valid also
                                    props.setValid((prevValid) => ({
                                        ...prevValid,
                                        [otherName]: validate(flow2, range)
                                    }))
                                    setMessage("");
                                }
                            }
                            // 2. Plate geometries: 
                            if (geoNames.includes(name)) {
                                // gather all 5 data
                                const otherNames = geoNames.filter(value => value != name);
                                const geoData = otherNames.reduce((obj, key) => ({
                                    ...obj,
                                    [key]: Number(props.input[key])
                                }), { [name]: Number(value) })
                                updateGeo(name, geoData);
                                // update valid
                                const updateData = {};
                                const validateData = {}
                                for (const [key, value] of Object.entries(geoData)) {
                                    if (value && key != name) {
                                        updateData[key] = Number(value).toFixed(2);
                                        validateData[key] = validate(updateData[key], validData[key])
                                    }
                                }
                                props.setInput((prevInput) => ({
                                    ...prevInput,
                                    [type]: {
                                        ...prevInput[type],
                                        ...updateData
                                    }
                                }));
                                props.setValid((prevValid) => ({
                                    ...prevValid,
                                    ...validateData
                                }))

                            }
                        }

                        props.setValid((prevValid) => ({
                            ...prevValid,
                            [name]: valid
                        }))
                    }}
                />
                {props.unit && <InputGroup.Text>{props.unit}</InputGroup.Text>}
            </InputGroup>
            <InvalidTag range={range} valid={empty || props.valid[name]} message={message} />
        </div>

    )
}