import {Button, Divider, Input, Select, Space, Switch, Typography} from "antd";
import {textToContest} from "../../functions/input";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import React from "react";

const Field = ({ fields }) => {

    return fields.map((field, index) => (
        <div
            className=""
            key={index}
        >
            <div className="field-container">
                <div className="field-child">
                    <label>Name ✍️</label>
                    <Input disabled value={field.name} />
                </div>
                <div className="field-child">
                    <label>Static 👇</label>
                    <div><Switch defaultChecked={field.isStatic} /></div>
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
            </div>
            <div className='icons'>
                <EditOutlined />
                <DeleteOutlined />
            </div>
        </div>
    ));
}

export default Field;