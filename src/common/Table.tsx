import React from 'react';
import TableUI from './TableUI';
import axios from '../core/axios';

interface Props {
  columns: any[];
  url: string;
  default?: object;
  init?: object;
  rowSelection?: { 
    type: 'checkbox' | 'radio',
    onChange: (id, row) => void,
    selectedRowKeys?: any[]
  }
}
interface State {
  dataSource: any[],
  pagination: any,
  loading: boolean
}

class Table extends React.Component<Props, State>  {

  queryCriteria = {};

  constructor(props) {
    super(props);
    
    this.state = {
      dataSource: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10
      },
      loading: false
    }
    // 如果有默认查询条件， 则合并
    this.props.default && Object.assign(this.queryCriteria, this.props.default)
  }

  componentDidMount() {
    this.getList();
  }
  private getList(query = {}) {
    if (this.state.loading) { return; }
    this.setState({ loading: true });
    this.queryCriteria = query;

    const params = {
      paramJson: JSON.stringify({ ...this.queryCriteria, ...(this.props.init || {}) }),
      pageNum: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize
    };

    axios.post(this.props.url, params).then((res: any) => {
      const { list, pageNum, pageSize, totalPage } = res.result;
      this.setState({
        loading: false,
        dataSource: list,
        pagination: { current: pageNum, pageSize, total: totalPage }
      });
    }).catch(err => this.setState({ loading: false }))
  }

  request(e) {
    this.setState((state) => ({ pagination: { current: 1, pageSize: state.pagination.pageSize } }), () => {
      this.getList(e)
    })
  }

  private pageChange = (e) => {
    let { current, pageSize } = e;
    this.setState({ pagination: { current, pageSize } }, () =>{
    this.getList(this.queryCriteria);
    })
  }

  render () {
    return <TableUI rowSelection={this.props.rowSelection} columns={this.props.columns} {...this.state} pageChange={this.pageChange} />
  }
}
export default Table;