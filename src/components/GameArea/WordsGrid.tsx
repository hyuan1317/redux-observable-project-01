import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: auto;
  display: grid;
  grid-template-columns: repeat(5);
  grid-template-rows: repeat(6);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  padding: 10px;
`;
const WordTile = styled.div`
  border: 2px solid #3a3a3c;
`;

interface WordsRowProps {
  letters: string;
}

const WordsRow: FC<WordsRowProps> = (props) => {
  const { letters } = props;
  return (
    <>
      <WordTile>{letters[0] || ''}</WordTile>
      <WordTile>{letters[1] || ''}</WordTile>
      <WordTile>{letters[2] || ''}</WordTile>
      <WordTile>{letters[3] || ''}</WordTile>
      <WordTile>{letters[4] || ''}</WordTile>
    </>
  );
};

const WordsGrid: FC = () => {
  return <Wrapper></Wrapper>;
};

export default WordsGrid;
