import React,{useState} from 'react';
import { Modal, Button,Timeline } from 'antd';
import Payments2 from './Payments2';
import {Link} from 'react-router-dom';


const Payments = () => {
    const [visible, setVisible] = useState(false);
    return (
        <>
        <Button type="primary" onClick={() => setVisible(true)}>
        Payments
        </Button>
        <Modal
          title="Payments"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1000}
            footer={null}

        >
            <Timeline >
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        </Timeline>
        <Payments2 />
        
        </Modal>
        </>
    );
}

export default Payments;
