import React, { useState } from 'react';
import { Space, Button, Drawer } from 'antd';
import UpdateCustomer from './UpdateCustomer';
import { FormInstance } from 'antd/lib/form';
import axios from '../../core/axios';
import moment from 'moment';
interface Props {
  onSuccess: () => void;
  id: number
}
const ListOperation: React.FC<Props> = (props) => {

  const [visible, setVisible] = useState(false);

  const create = () => {
    setVisible(true);
  }

  const save = async () => {
    const value = await formRef.validateFields();
    if (value) {
      value.birthday = moment(value.birthday).format('yyyy-MM-DD');
      const result: any = await axios.post('/member/modifyMember', { paramJson: JSON.stringify(value) });
      if (result.code === '1000') {
        setVisible(false);
        props.onSuccess()
      }
    }
  }
  let formRef: FormInstance;

  return (
    <>
      <Space style={{ marginBottom: '16px' }}>
        <Button type="primary" onClick={create}>新建客户</Button>
        <Button onClick={() => setVisible(true)}>编辑</Button>
        <Button>导入</Button>
      </Space>

      <Drawer
        title="新建用户"
        width={720}
        visible={visible}
        onClose={() => { setVisible(false) }}
        destroyOnClose
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={() => { setVisible(false)}} style={{ marginRight: 8 }}>取消</Button>
            <Button onClick={save} type="primary">保存</Button>
          </div>
        }
      >
        <UpdateCustomer id={props.id} onFormRef={(form) => { formRef = form }} />
      </Drawer>
    </>
  )
}


export default ListOperation