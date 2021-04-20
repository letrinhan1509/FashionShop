import React from "react";
import {  Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
const { SubMenu } = Menu;
const Navigation = (props) => {
    const link = useHistory();
    const linkto = (e)=>{
        link.push(`/${e.key}`)
    }
   
    return (
        <>    
            <Router>
                        <Menu
                            /* onClick={this.handleClick} */
                            style={{ width: 256, height: '100%' }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub3', 'sub2']}
                            mode="inline"
                            onClick={linkto}

                            forceSubMenuRender="true">
                            <Menu.Item key="Dashboard">Dashboard</Menu.Item>
                            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Quản lý sản phẩm">
                                <Menu.Item key="all">Tất cả sản phẩm</Menu.Item>
                                <Menu.Item key="Themsanpham">Thêm sản phẩm</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title=" Quản lý tài khoảng">
                                <Menu.Item key="Danhsachkhachhang">Khách hàng</Menu.Item>
                                <Menu.Item key="DanhsachAdmin">Nhân viên</Menu.Item>
                                <Menu.Item key="Themnhanvien">Thêm nhân viên</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                                <Menu.Item key="13">Option 13</Menu.Item>
                            </SubMenu>
                        </Menu>
            </Router>
        </>
    )
}

export default Navigation;