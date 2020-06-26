import React from 'react';
import { Form, Input, Select, InputNumber, DatePicker } from 'antd';


const QuerySimpUI = (props) => {
  const [form] = Form.useForm();

  const keyup = (e) => {
    e.keyCode === 13 && submit();
  }
  const submit = () => {
    props.onFinish(form.getFieldsValue());
  }
  return (
    <Form layout='inline' form={form} onFinish={props.onFinish} className='query-form'>
      {props.nodes.map(node => {
        return (
          <Form.Item
            key={node.type === 'between' || node.type === 'rangepicker' ? node.keys[0] : node.key}
            {...(node.type === 'between' ? {} : { name: node.key || node.keys[0] })}
          >
            {(() => {
              switch (node.type) {
                case 'input': {
                  return <Input onKeyUp={keyup} allowClear style={{ width: '200px' }} placeholder={node.placeholder || `请输入${node.label}`} />
                }
                case 'select': {
                  return (
                    <Select onChange={submit} allowClear style={{ width: '200px' }} placeholder={node.placeholder || `请选择${node.label}`}>
                      {
                        node.options.map((option) => (
                          <Select.Option
                            disabled={option?.disabled}
                            value={option[node.optionKey.value]}
                            key={option[node.optionKey.value]}>
                            {option[node.optionKey.label]}
                          </Select.Option>
                        ))
                      }
                    </Select>
                  )
                }
                case 'between': {
                  return (
                    <Input.Group style={{ width: '200px' }}>
                      <Form.Item noStyle name={node.keys[0]}>
                        <InputNumber onKeyUp={keyup} style={{ width: 'calc(50% - 15px)', float: 'left', borderRight: 0 }} min={0} placeholder="最小值" />
                      </Form.Item>
                      <Input style={{ width: '30px', background: '#fff' }} disabled placeholder="~" />
                      <Form.Item noStyle name={node.keys[1]}>
                        <InputNumber onKeyUp={keyup} style={{ width: 'calc(50% - 15px)', borderLeft: 0 }} min={0} placeholder="最大值" />
                      </Form.Item>
                    </Input.Group>
                  )
                }
                case 'datepicker': {
                  return (<DatePicker onChange={submit} style={{ width: '200px' }} placeholder={node.placeholder || `请选择${node.label}`} />);
                }
                case 'rangepicker': {
                  return (<DatePicker.RangePicker onChange={submit} style={{ width: '200px' }} placeholder={[node.placeholder ? node.placeholder[0] : '开始日期', node.placeholder ? node.placeholder[1] : '结束日期']} />);
                }
                default: {
                  return <Input onKeyUp={keyup} allowClear style={{ width: '200px' }} placeholder={node.placeholder || `请输入${node.label}`} />
                }
              }
            })()}

          </Form.Item>
        )
      })}
    </Form>
  )
}

export default QuerySimpUI;