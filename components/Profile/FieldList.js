import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import FieldForm from "./FieldForm";
import Field from "./Field";
import NewForm from "./NewForm";

const FieldList = ({dateFormats, fieldTypes }) => {
    const [fields, setFields] = useState([]);
    let groups = [];
    const setGroups = (grs) =>{
        groups = grs;
    }
    const onSave = (e) =>{
        const newFields = [e, ...fields];
        setFields(newFields)
    };


    return (
        <>
            <NewForm onSave={onSave} dateFormats={dateFormats} fieldTypes={fieldTypes} propsGroups={groups} setPropsGroups={setGroups} />
            <Field
                fields={fields}
            />
        </>
    );
}

export default FieldList;