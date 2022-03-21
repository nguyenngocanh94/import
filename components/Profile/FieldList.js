import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import FieldForm from "./FieldForm";
import Field from "./Field";

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


    console.log(fieldTypes)
    console.log(dateFormats)

    return (
        <>
            <FieldForm onSave={onSave} dateFormats={dateFormats} typesOfField={fieldTypes} groups={groups} setGroups={setGroups} />
            <Field
                fields={fields}
            />
        </>
    );
}

export default FieldList;