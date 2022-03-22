import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Switch, Select, Divider, Space, Typography} from 'antd';
import {UserOutlined, LockOutlined, PlusOutlined} from '@ant-design/icons';
import {textToContest} from "../../functions/input";

const NewForm = ({fieldTypes, dateFormats, propsGroups, setPropsGroups, onSave}) => {
    const [form] = Form.useForm();
    const [isStatic, setIsStatic] = useState(true);
    const [, forceUpdate] = useState({}); // To disable submit button at the beginning.
    const [nameOfField, setNameOfField] = useState('');
    const [name, setName] = useState('');
    const [dateFormat, setDateFormat] = useState('');
    const [groupId, setGroupId] = useState('');
    const [isShowDateFormat, setIsShowDateFormat] = useState(false);
    const [groups, setGroups] = useState(propsGroups);

    useEffect(() => {
        forceUpdate({});
    }, []);
    const [typeOfField, setTypeOfField] = useState();
    const onFinish = (values) => {
        values.static = isStatic;
        onSave(values);
        form.resetFields()
    };
    const onNameChange = event => {
        setName(textToContest(event.target.value));
    };
    const onChangeStaticFieldHandler = (e) => {
        console.log(e)
        setIsStatic(e);
    };
    const onChangeTypeFieldHandler = (e) => {
        setTypeOfField(e);
        if (e === 'Datetime') {
            setIsShowDateFormat(true);
        } else {
            setIsShowDateFormat(false);
        }
    }
    let index = 0;
    const addGroupId = e => {
        e.preventDefault();
        setGroups([...groups, name || `New item ${index++}`]);
        setPropsGroups(groups);
        setName('');
    };



    return (
        <Form className="container-new-form" form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
            <div className="field-child">
                <label>Name ✍️</label>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your field name!',
                        },
                    ]}
                >
                    <Input value={nameOfField} onChange={(event) => setNameOfField(textToContest(event.target.value))}/>
                </Form.Item>
            </div>
            <div className="field-child static">
                <label>Static 👇</label>
                <Form.Item valuePropName="checked"
                    name="static"
                >
                    <Switch defaultChecked checked={isStatic} onChange={onChangeStaticFieldHandler}/>
                </Form.Item>

            </div>

            <div className="field-child">
                <label>Type 🚴‍♀️</label>
                <div>
                    <Form.Item name="type"
                               rules={[{required: true, message: 'Please select type'}]}>
                        <Select style={{'width': '200px'}}
                                showSearch
                                placeholder="Select type of field"
                                optionFilterProp="children"
                                onChange={onChangeTypeFieldHandler}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                        >
                            {
                                fieldTypes.filter(item => {
                                    if (isStatic) return item !== 'array';
                                    return true
                                }).map((item, key) => {

                                    return <Select.Option key={key} value={item}>{item}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </div>
            </div>

            {isShowDateFormat && <div className="field-child">
                <label>Date Format ⏳</label>
                <Form.Item name="date_format"
                           rules={[{required: true, message: 'Please select dateformat'}]}>
                    <Select style={{'width': '200px'}}
                            showSearch
                            placeholder="Select a format"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                    >
                        {
                            dateFormats.map((item, key) => {
                                return <Select.Option key={key} value={item}>{item}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
            </div>}

            {!isStatic && <div className="field-child">
                <label>Group Id 👨‍👩‍👧‍👧</label>
                <Form.Item  name="group_id">
                    <Select
                        style={{'width': '300px'}}
                        placeholder="add the group for field 👨‍👩‍👧‍👧"
                        dropdownRender={menu => (
                            <>
                                {menu}
                                <Divider style={{margin: '8px 0'}}/>
                                <Space align="center" style={{padding: '0 8px 4px'}}>
                                    <Input placeholder="group name 👨‍👩‍👦" value={name} onChange={onNameChange}/>
                                    <Typography.Link onClick={addGroupId} style={{whiteSpace: 'nowrap'}}>
                                        <PlusOutlined/> Add item
                                    </Typography.Link>
                                </Space>
                            </>
                        )}
                    >
                        {groups.map(item => (
                            <Select.Option key={item}>{item}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>}

            <Form.Item shouldUpdate>
                {() => (
                    <div className="field-action">
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                !!form.getFieldsError().filter(({errors}) => errors.length).length
                            }
                        >
                            Add
                        </Button>
                    </div>
                )}
            </Form.Item>
        </Form>
    );
}

export default NewForm;