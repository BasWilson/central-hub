import {
  BrowserRouter as Router,
} from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react";
import styled from 'styled-components';
import { Navbar } from './components/navbar';
import { Routes } from './pages/routes';
import { stores } from './stores/stores';
import accountService from './services/account.service';
import { AuthScreen } from './components/auth.screen';
import "toastify-js/src/toastify.css";
import { Page } from './components/page';

export default observer(() => {

  const userStore = useContext(stores.userStore);
  const [showLogin, SetShowLogin] = useState(false);

  useEffect(() => {
    initialActions();
  }, []);

  const initialActions = async () => {

    const authenticated = await accountService.authenticate(userStore);
    if (authenticated === true) {
      userStore.setAuthenticated(true);
    } else {
      SetShowLogin(true);
    }
  }

  if (!userStore.authenticated) {
    return (
      <Router>
        <Container>
          {
            showLogin ? <AuthScreen /> : <Page><h2>Contacting endpoint...</h2></Page>
          }
        </Container>
      </Router>
    )
  }

  return (
    <>
      <Router>
        <Container>
          <Routes />
          <Navbar />
        </Container>
      </Router>
    </>
  );
})

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #fff;
  justify-content: space-between;
  flex-direction: column;
`;