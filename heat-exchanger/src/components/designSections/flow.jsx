import {
    Card,
    Form,
    InputGroup,
    FormControl
} from "react-bootstrap"
import DataInput from "./steps/dataInput.jsx"

export default function Flow(props) {
    return (
        <Form className="input-container">
            <Card className="steps">
                <Card.Header>Number of Pass</Card.Header>
                <Card.Body>
                    <DataInput
                        name="flowPassC"
                        label="Cold Fluid"
                        input={props.input}
                        setInput={props.setInput}
                        valid={props.valid}
                        setValid={props.setValid}
                    />
                    <DataInput
                    classes="form-item-last"
                        name="flowPassH"
                        label="Hot Fluid"
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