import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Radio, DatePicker, Select } from 'antd';
import moment from 'moment';
import axios from '../../core/axios';

interface Props {
  onFormRef: (form) => void;
  id?: number
}
const UpdateCustomer = (props: Props) => {

  const [form] = Form.useForm();

  props.onFormRef(form);

  const [communityList, setCommunityList] = useState([]);  
  const [sourceList, setSourceList] = useState([]);
  const initialValues = { sex: '男', illHistory: 0, allergieHistory: 0, babyType: '婴儿', babyNumber: 1 }
  useEffect(() => {

    props.id && axios.post('/member/queryMemberById', { id: props.id }).then((res: any) => {
      res.result.birthday = moment(res.result.birthday);
      form.setFieldsValue(res.result);
    })

    axios.post('/member/communityList').then((res: any) => {
      setCommunityList(() => res.result);
      !props.id && form.setFieldsValue({ communityId: res.result[0].id });
    });
    axios.post('/memberSource/getList').then((res: any) => setSourceList(res.result));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validatorPhone = (rule, value) => {
    if (/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(value) || !value) {
      return Promise.resolve();
    }
    return Promise.reject('请输入正确的手机号!');
  }

  return (
    <Form layout='vertical' initialValues={initialValues} form={form}>
      <Form.Item name="id" noStyle><Input type="hidden" /></Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名！' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="nick" label="小名">
            <Input placeholder="请输入小名" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="birthday" label="生日" rules={[{ required: true, message: '请选择宝宝生日！' }]}>
            <DatePicker disabledDate={(current) => current > moment().endOf('day')} style={{width: '100%'}} placeholder="请选择宝宝生日" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="parentName" label="家长姓名" rules={[ { required: true, message: '请输入家长姓名！' } ]}>
            <Input placeholder="请输入家长姓名" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="mobilePhone" label="手机号" rules={[{ required: true, message: '请输入手机号！' }, { validator: validatorPhone} ]}>
            <Input placeholder="请输入手机号" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="communityId" label="所属社区" rules={[{ required: true, message: '请输入所属社区！' }]}>
            <Select placeholder="请输入所属社区">
              { communityList.map((item: any) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>) }
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="sex" label="性别">
            <Radio.Group>
              <Radio value={'男'}>男</Radio>
              <Radio value={'女'}>女</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="illHistory" label="病例">
            <Radio.Group>
              <Radio value={0}>无</Radio>
              <Radio value={1}>有</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="allergieHistory" label="过敏史">
            <Radio.Group>
              <Radio value={0}>无</Radio>
              <Radio value={1}>有</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="babyType" label="婴儿类型">
            <Radio.Group>
              <Radio value={'婴儿'}>婴儿</Radio>
              <Radio value={'幼儿'}>幼儿</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="babyNumber" label="多胞胎">
            <Select placeholder="请选择多胞胎数目">
              {[1,2,3,4,5].map((item, idx) => <Select.Option key={item} value={idx + 1}>{item}</Select.Option>)}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="sourceId" label="客户来源" rules={[{ required: true, message: '请选择客户来源！' }]}>
            <Select placeholder="请选择客户来源">
              {sourceList.map((item: any) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="comment" label="备注">
            <Input.TextArea rows={3} placeholder="请输入备注" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default UpdateCustomer;
