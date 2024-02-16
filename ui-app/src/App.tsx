import { ConfigProvider } from 'antd';
import './App.css';
import AppRouter from './app-router.component';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { UserActions } from './user/store/user.action.types';
import { useEffect } from 'react';
import { userActions } from './user/store/user.actions';

function App() {
  const dispatch = useDispatch<Dispatch<UserActions>>();

  const componentSize = 'large'

  const refreshUserData = () => dispatch(userActions.getUserByToken());

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      refreshUserData();
    }
  }, [])

  return (
    <ConfigProvider componentSize={componentSize}>
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;
