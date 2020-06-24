import React from 'react';
import { withRouter } from 'react-router-dom';

import MenuConfig from './../../../core/menu';

import { Menu } from 'antd';
import styles from './Nav.module.css';
import Logo from './../../../statics/images/logo.png';

interface Props {
  history: any
}
class Nav extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }
  redirect(key: string) {
    this.props.history.push(key);
  }
  render () {
    return (
      <React.Fragment>
        <div className={styles.logo}>
          <img src={Logo} alt="logo"/>
        </div>
        <div className={styles.sider}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {
              MenuConfig.map(menu => {
                if (menu.isLeaf) {
                  return (
                    <Menu.Item key={menu.key} icon={menu.icon} onClick={() => { this.redirect(menu.key) }}>{menu.title}</Menu.Item>
                  )
                } else {
                  return (
                    <Menu.SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
                      {menu.children?.map((cm) => (<Menu.Item key={cm.key} onClick={() => { this.redirect(cm.key) }}>{cm.title}</Menu.Item>))}
                    </Menu.SubMenu>
                  )
                }
              })
            }
          </Menu>
        </div>
      </React.Fragment>
    )
  }
}

// @ts-ignore
export default withRouter(Nav);