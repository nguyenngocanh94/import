import {Button, Divider, Input, Select, Space, Switch, Typography} from "antd";
import {textToContest} from "../../functions/input";
import {DeleteTwoTone,EditTwoTone} from "@ant-design/icons";
import React from "react";

const Field = ({ fields }) => {

    return (
        <div className='container-fluid'>
            <div className="field-list">
                {fields.map((field, index) => (

                    <div key={index} className="field-container">
                        <div className="field-child">
                            <label>Name ✍️</label>
                            <Input disabled value={field.name} />
                        </div>
                        <div className="field-child">
                            <label>Static 👇</label>
                            <div><Switch disable={true} checked={field.static} /></div>
                        </div>
                        <div className="field-child">
                            <label>Type 🚴‍♀</label>
                            <Input disabled value={field.type} />
                        </div>
                        {field.date_format && <div className="field-child">
                            <label>Date Format ⏳</label>
                            <Input disabled value={field.date_format} />
                        </div>}
                        {field.group_id && <div className="field-child">
                            <label>Group Id 👨‍👩‍👧‍👧</label>
                            <Input disabled value={field.group_id} />
                        </div>}

                        <div className="field-action">
                            <DeleteTwoTone style={{ fontSize: '20px', color: '#08c' }} />
                            <EditTwoTone  style={{ fontSize: '20px', color: '#08c' }}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Field;