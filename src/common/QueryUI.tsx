import React from 'react';
import { Form, Input, Button, Select, InputNumber, DatePicker, Space } from 'antd';


const QueryUI = (props) => {
  const [ form ] = Form.useForm()
  return (
    <Form layout='inline' form={form} onFinish={props.onFinish} className='query-form'>
      {props.nodes.map(node => {
        return (
          <Form.Item 
            label={node.label}
            key={node.type === 'between' || node.type === 'rangepicker' ? node.keys[0] : node.key}
            {...(node.type === 'between' ? {} : { name: node.key || node.keys[0] })}
          >
            {(() => {
              switch (node.type) {
                case 'input': {
                  return <Input allowClear style={{ width: '200px' }} placeholder={node.placeholder || `请输入${node.label}`} />
                }
                case 'select': {
                  return (
                    <Select allowClear style={{ width: '200px' }} placeholder={node.placeholder || `请选择${node.label}`}>
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
                        <InputNumber style={{ width: 'calc(50% - 15px)', float: 'left', borderRight: 0 }} min={0} placeholder="最小值" />
                      </Form.Item>
                      <Input style={{ width: '30px', background: '#fff' }} disabled placeholder="~" />
                      <Form.Item noStyle name={node.keys[1]}>
                        <InputNumber style={{ width: 'calc(50% - 15px)', borderLeft: 0 }} min={0} placeholder="最大值" />
                      </Form.Item>
                    </Input.Group>
                  )
                }
                case 'datepicker': {
                  return (<DatePicker style={{ width: '200px' }} placeholder={node.placeholder || `请选择${node.label}`} />);
                }
                case 'rangepicker': {
                  return (<DatePicker.RangePicker style={{ width: '200px' }} placeholder={[node.placeholder ? node.placeholder[0] : '开始日期', node.placeholder ? node.placeholder[1] : '结束日期']} />);
                }
                default: {
                  return <Input allowClear style={{ width: '200px' }} placeholder={node.placeholder || `请输入${node.label}`} />
                }
              }
            })()}

          </Form.Item>
        )
      })}

      <Form.Item style={{ paddingLeft: '86px' }}>
        <Space>
          <Button type="primary" htmlType="submit">查询</Button>
          <Button htmlType="reset" onClick={() => { form.resetFields() }}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default QueryUI;