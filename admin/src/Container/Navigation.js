import React from "react";
import {  Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
const { SubMenu } = Menu;
const Navigation = () => {
    const link = useHistory();
    const linkto = (e)=>{
        link.push(`/${e.key}`)
    }
    let result =JSON.parse(localStorage.getItem('user'))  
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
                                {result.maquyen===1?(<Menu.Item key="Themsanpham">Thêm sản phẩm</Menu.Item>):(<p/>)}
                                <Menu.Item key="DMsanpham">Danh mục sản phẩm</Menu.Item>
                                <Menu.Item key="Danhsachloai">Danh sách loại</Menu.Item>
                                {result.maquyen===1?(<Menu.Item key="Themloai">Thêm loại</Menu.Item>):(<p/>)}
                                
                                <Menu.Item key ="Danhsachnhasx">Danh sách nhà sản xuất</Menu.Item>
                                
                                {result.maquyen===1?(<Menu.Item key ="Themnsx">Thêm nhà sản xuất</Menu.Item>):(<p/>)}
                            </SubMenu>
                            <SubMenu key="sub3" title=" Quản lý tài khoản">
                                <Menu.Item key="Danhsachkhachhang">Khách hàng</Menu.Item>
                                <Menu.Item key="DanhsachAdmin">Nhân viên</Menu.Item>
                               
                                {result.maquyen===1?( <Menu.Item key="Themnhanvien">Thêm nhân viên</Menu.Item>):(<p/>)}
                            </SubMenu>
                            <SubMenu key="sub4" icon={<SettingOutlined />} title="Quản lý đơn hàng">
                                <Menu.Item key="Danhsachdonhang">Danh sách đơn hàng</Menu.Item>
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