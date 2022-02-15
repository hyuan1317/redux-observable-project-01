import React, { FC } from 'react';
import styled from 'styled-components';
import WordsGrid from './WordsGrid';
import KeyboardArea from './KeyboardArea';

const Wrapper = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  align-items: center;
  min-height: 0;
`;

const GameArea: FC = () => {
  return (
    <Wrapper>
      <WordsGrid />
      <KeyboardArea />
    </Wrapper>
  );
};

export default GameArea;
