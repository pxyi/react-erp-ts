import React from 'react';

import styles from './Login.module.css';

import { Form, Input, Button, Checkbox } from 'antd';
import Axios from './../../core/axios';
import { connect } from 'react-redux';
import { setUserAction } from '../../store/user/action';
import { Aes } from '../../core/encrypt';

interface Props {
  history: any;
  setUser: (user: object) => void
}
interface State {
  initialValues: object;
}

class Login extends React.Component<Props, State> {

  componentWillMount() {
    window.localStorage.removeItem('user');
    const initialValues = JSON.parse(Aes._decrypt_(window.localStorage.getItem('erp-login')) || '{"remember": true}');
    this.setState({ initialValues });
  }
  onFinish(values: any) {
    if (values.remember) {
      window.localStorage.setItem('erp-login', Aes._encrypt_(JSON.stringify(values)));
    }
    values.password = Aes.encrypt(values.password);
    Axios.post('/auth/login', values).then((res: any) => {
      this.props.setUser(res.result);
      this.props.history.push('/home');
    });
  };

  render () {
    return (
      <div className={styles.container}>
        <Form initialValues={this.state.initialValues} onFinish={this.onFinish.bind(this)} >
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]} >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]} >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>登录</Button>
          </Form.Item>
        </Form>
      </div>
    )
  };
};
const mapDispatch = (dispatch: (action: object) => void): object => ({
  setUser(user: object) {
    dispatch(setUserAction(user));
  }
})
export default connect(null, mapDispatch)(Login);