import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Image, Space, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Link_Page from "../components/Link_Page";
const { TextArea } = Input;

const user = JSON.parse(localStorage.getItem("user"));
const UserInfo = (props) => {

    return (
        <Container style={{ textAlign: "center", border: "1px solid black" }}>
            <Row>
                <Col>
                    <Link_Page />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Image
                        width={200}
                        src="https://scontent-xsp1-3.xx.fbcdn.net/v/t1.18169-9/17342794_1215476828566870_3634296409254903556_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=174925&_nc_ohc=fN0GXU9ktnsAX_-LHYQ&_nc_ht=scontent-xsp1-3.xx&oh=a449cbd37dd62653a8f0c4b3ea8a81d1&oe=60B55CB8"
                    />
                </Col>
                <Col>
                    <Form className="form">
                        <Space direction="vertical">
                            <Form.Group controlId="formCategory4">
                                <Form.Label>Profile Image</Form.Label>
                                <Form.Control type="file" name="profileImage" />
                            </Form.Group>
                            <Input placeholder="User name" value={user.username} />
                            <Input.Password
                                placeholder="Password"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                value={user.matkhau}
                            />
                            <Input placeholder="E-mail" value={user.email} />
                            <Input value={user.sdt}></Input>
                            <TextArea value={user.diachi} />
                            <Button type="primary">Update Profile</Button>
                        </Space>,
                </Form>
                </Col>

            </Row>

        </Container>

    );
}

export default UserInfo;
