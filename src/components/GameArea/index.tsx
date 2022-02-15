import React, { FC } from 'react';
import styled from 'styled-components';
import WordsGrid from './WordsGrid';
import KeyboardArea from './KeyboardArea';

const Wrapper = styled.div`
  flex: auto;
  margin: 0 auto;
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
