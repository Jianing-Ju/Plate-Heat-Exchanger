import { ListGroup } from "react-bootstrap";
export default function ResultItem(props){
    return (
        <ListGroup.Item className="d-flex">
            <i>{props.data.symbol[0]}<sub>{props.data.symbol[1]}</sub></i>
            &nbsp;{" - "}
            {props.data.name}
            <p className="ms-auto m-0">
                {props.data.value > 0.001? Number(props.data.value).toFixed(3):
                    Number(props.data.value).toFixed(6)}
            </p>
        </ListGroup.Item>
    )
}