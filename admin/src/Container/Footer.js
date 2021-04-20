import { Row,Divider } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React from 'react';


const footer = () => {
    return (
        <Footer className="footer" >
            <Row>
                
            <Divider className="driver" />
            <p>Quách Trọng Nhân</p>
            </Row>
            
          
        </Footer>
    );

};
export default footer;