import React,{useState} from 'react';
import { Modal, Button } from 'antd';



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
        
        
        </Modal>
        </>
    );
}

export default Payments;
