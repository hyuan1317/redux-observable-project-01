import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import 'reset-css';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import GameArea from './components/GameArea';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 100%; 
    font-family: 'HelveticaNeue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const Wrapper = styled.div`
  background-color: #121213;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Provider store={store}>
      <Wrapper>
        <GlobalStyle />
        <Header />
        <GameArea />
      </Wrapper>
    </Provider>
  );
}

export default App;
