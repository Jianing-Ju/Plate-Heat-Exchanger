import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { Alert } from "react-bootstrap";
export default function InvalidTag(props) {
    return (
        <div>
            {props.valid || props.range.length &&
                <Alert className="input-invalid" variant="danger">
                    <FontAwesomeIcon icon={faTimesCircle} /> Invalid Input. {" "}
                    {props.message ? props.message :
                    `Valid range: ${props.range[0]} to ${props.range[1]}`}
                </Alert>
            }
        </div>

    )

}