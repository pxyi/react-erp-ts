import React from 'react';

import { Menu, Dropdown } from 'antd';

import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const menu = (<Menu>
  <Menu.Item>
    <Link to="/login">退出</Link>
  </Menu.Item>
</Menu>)
interface Props {
  user?: any
}
class Header extends React.Component<Props> {
  render() {
    return (
      <div className={styles.user_cell}>
        <Dropdown overlay={menu}>
          <div>{this.props.user.getIn(['store', 'shopName'])} {this.props.user.get('name')}</div>
        </Dropdown>
      </div>
    );
  }
}
const mapState = (state: any) => ({
  user: state.get('user')
})
export default connect(mapState, null)(Header);
