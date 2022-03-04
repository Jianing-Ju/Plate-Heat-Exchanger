import { useContext, useEffect, useState } from "react";
import NewDeisgn from "../commonSections/newDesign";
import { nanoid } from "nanoid";
import { getInput } from "../../api";
import { MainContext } from "../main";

export default function CopyDesign(props){
    // get input(from DB), type
    const {id: designId, designType: type, name} = props.design;
    const [initial, setInitial] = useState(true);
    const [input, setInput] = useState();
    const {updateDesigns} = useContext(MainContext);

    useEffect(async ()=>{
        if (initial){
            setInitial(false);
            setInput(await getInput(designId));
        }
    })
    return (
        <NewDeisgn
            show={props.show}
            setShow={props.setShow}
            designId={nanoid()}
            type={type}
            input={input}
            refresh={updateDesigns}
            defaultName={name+" Copy"}
        />
    )
}