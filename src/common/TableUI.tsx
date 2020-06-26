import React from 'react';
import { Table } from 'antd';

const TableUI = props => {
  const rowSelection = props.rowSelection ? {
    rowSelection: props.rowSelection
  } : {}
  return (
    <Table
      {...rowSelection}
      rowKey="id"
      dataSource={props.dataSource}
      columns={props.columns}
      size="middle"
      loading={props.loading}
      pagination={props.pagination}
      onChange={props.pageChange}
    />
  )
}

export default TableUI;