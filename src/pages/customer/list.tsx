import React from 'react';
import { Tag } from 'antd';
import Query from '../../common/Query';
import Table from '../../common/Table';
import ListOperation from './ListOperation';

const nodes = [
  { label: '手机号', key: 'mobilePhone', type: 'input' },
  {
    label: '婴儿类型',
    key: 'babyType',
    type: 'select',
    options: [{ name: '婴儿', id: '婴儿' }, { name: '幼儿', id: '幼儿' }],
  },
  {
    label: '宝宝月龄',
    keys: ['startMonthAge', 'endMonthAge'],
    type: 'between',
  },
  {
    label: '宝宝生日',
    keys: ['startBirthday', 'endBirthday'],
    type: 'rangepicker',
    isHide: true
  },
  {
    label       : '所属社区',
    key         : 'communityId',
    type        : 'select',
    optionsUrl  : '/member/communityList'
  },
];
const columns = [
  { title: '卡号', dataIndex: 'memberCard' },
  { title: '姓名', dataIndex: 'name' },
  { title: '性别', dataIndex: 'sex' },
  { title: '多胞', dataIndex: 'babyNumber' },
  { title: '月龄', dataIndex: 'monthAge' },
  { title: '家长姓名', dataIndex: 'parentName' },
  { title: '手机号', dataIndex: 'mobilePhone' },
  { title: '婴儿类型', dataIndex: 'babyType' },
  { title: '积分', dataIndex: 'memberPoint' },
  { title: '有效期', dataIndex: 'expireDays', render: (e: number) => (<Tag color={e > 0 ? '#2db7f5' : '#f50'}>{e > 0 ? e + '天' : '已过期'}</Tag>) },
  { title: '测量', dataIndex: 'weighRemind', render: (e: boolean) => (<span>{e ? '需要' : '不需要'}</span>) },
  { title: '拍照', dataIndex: 'photoRemind', render: (e: boolean) => (<span>{e ? '需要' : '不需要'}</span>) },
  { title: '登录次数', dataIndex: 'loginTimes' },
  { title: '建档时间', dataIndex: 'createDate' },
  { title: '备注', dataIndex: 'comment' },
]
class CustomerList extends React.Component {
  state = {
    selected: []
  }
  selectChange = (id, row) => {
    this.setState({ selected: id });
  }
  render() {
    return (
      <div>
        <Query nodes={nodes} onSubmit={(e) => { this.refs.table['request'](e) }} />

        <ListOperation id={this.state.selected[0]} onSuccess={() => { this.refs.table['request']() }} />

        <Table rowSelection={{ type: 'radio', selectedRowKeys: this.state.selected, onChange: this.selectChange }} url="/member/list" ref="table" columns={columns} />
      </div>
    )
  }
}

export default CustomerList;