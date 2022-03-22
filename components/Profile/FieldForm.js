import React, {useState} from "react";
import {Button, Divider, Input, Select, Space, Switch, Typography} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {textToContest} from "../../functions/input";


const FieldForm = ({onSave, groups, typesOfField, setGroups, dateFormats}) => {
    const [isStatic, setIsStatic] = useState(true);
    const [isShowDateFormat, setIsShowDateFormat] = useState(false);
    let index = 0;
    const [items, setItems] = useState(groups);
    const [typeOfField, setTypeOfField] = useState();
    const [dateFormat, setDateFormat] = useState();
    const [groupId, setGroupId] = useState();
    const [name, setName] = useState('');
    const [nameOfField, setNameOfField] = useState('');
    const onChangeStaticFieldHandler = (e) => {
        console.log(e)
        setIsStatic(e);
    };
    const onNameChange = event => {
        setName(textToContest(event.target.value));
    };
    const onChangeTypeFieldHandler = (e) => {
        setTypeOfField(e);
        if (e === 'Datetime'){
            setIsShowDateFormat(true);
        }else{
            setIsShowDateFormat(false);
        }
    }
    const onChangeGroupIdFieldHandler = (e) => {
        setGroupId(e);
    }
    const onChangeDateFormatFieldHandler = (e) => {
        setDateFormat(e);
    }
    const addItem = e => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setGroups(items);
        setName('');
    };

    const [nameOfFieldObject, setNameOfFieldObject] = useState({
        placeholder : "write the name of field",
        error: '',
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        if (nameOfField===''){
            setNameOfFieldObject({
                placeholder : "name of field can not be empty",
                error: 'error',
            })
            return;
        }
        onSave({
            name: nameOfField,
            type: typeOfField,
            static: isStatic,
            date_format: dateFormat,
            group_id: groupId,
        });
        setNameOfField('');
        setTypeOfField('');
        setDateFormat('');
        setGroupId('')
        setIsStatic(true)
    }

    return (
        <>
            <div className="field-container-parent">
                <div className="field-container">
                    <div className="field-child">
                        <label>Name ✍️</label>
                        <Input status={nameOfFieldObject.error} value={nameOfField} onChange={(event) => setNameOfField(textToContest(event.target.value))} placeholder={nameOfFieldObject.placeholder} />
                    </div>
                    <div className="field-child">
                        <label>Static 👇</label>
                        <div><Switch defaultChecked onChange={onChangeStaticFieldHandler} /></div>
                    </div>
                    <div className="field-child">
                        <label>Type 🚴‍♀️</label>
                        <div>
                            <Select style={{'width':'200px'}}
                                    showSearch
                                    placeholder="Select type of field"
                                    optionFilterProp="children"
                                    onChange={onChangeTypeFieldHandler}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                            >
                                {
                                    typesOfField.filter(item => {
                                        if (isStatic) return item !== 'array';
                                        return true
                                    }).map((item, key)=>{

                                        return <Select.Option key={key} value={item}>{item}</Select.Option>
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                    {isShowDateFormat && <div className="field-child">
                        <label>Date Format ⏳</label>
                        <div>
                            <Select style={{'width':'200px'}}
                                    showSearch
                                    onChange={onChangeDateFormatFieldHandler}
                                    placeholder="Select a format"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                            >
                                {
                                    dateFormats.map((item, key)=>{
                                        return <Select.Option key={key} value={item}>{item}</Select.Option>
                                    })
                                }
                            </Select>
                        </div>
                    </div>}
                    {!isStatic && <div className="field-child">
                        <label>Group Id 👨‍👩‍👧‍👧</label>
                        <div>
                            <Select
                                style={{'width':'300px'}}
                                onChange={onChangeGroupIdFieldHandler}
                                placeholder="add the group for field 👨‍👩‍👧‍👧"
                                dropdownRender={menu => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Space align="center" style={{ padding: '0 8px 4px' }}>
                                            <Input  placeholder="group name 👨‍👩‍👦" value={name} onChange={onNameChange}/>
                                            <Typography.Link onClick={addItem} style={{ whiteSpace: 'nowrap' }}>
                                                <PlusOutlined /> Add item
                                            </Typography.Link>
                                        </Space>
                                    </>
                                )}
                            >
                                {items.map(item => (
                                    <Select.Option key={item}>{item}</Select.Option>
                                ))}
                            </Select>
                        </div>
                    </div>}
                </div>
                <div className="field-action">
                    <PlusOutlined style={{ fontSize: '20px', color: '#08c' }} onClick={handleSubmit} />
                </div>
            </div>
        </>
    )
}

export default FieldForm;