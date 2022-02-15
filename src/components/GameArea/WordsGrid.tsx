import React, { FC } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { LetterHitStatus, GuessInfo } from '../../actions/app';

interface WordTileProps {
  active?: boolean;
  reveal?: LetterHitStatus;
}

const Wrapper = styled.div`
  flex: auto;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-row-gap: 5px;
  padding: 10px;
  min-height: 0;
  width: calc((100vh - 50px - 20px - 200px - 25px) * 5 / 6 + 40px);
`;
const TileRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 5px;
  min-height: 0;
`;
const WordTile = styled.div<WordTileProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 24px;
  aspect-ratio: 1;
  height: 100%;

  border: 2px solid #3a3a3c;
  ${({ active }) =>
    active &&
    `
    border: 2px solid #565758;
  `}

  ${({ reveal }) => {
    switch (reveal) {
      case 'absent':
        return `
        background-color: #3a3a3c;
      `;
      case 'present':
        return `
        border: 2px solid #b59f3b;
        background-color: #b59f3b;
        `;
      case 'correct':
        return `
        border: 2px solid #538d4e;
        background-color: #538d4e;
        `;
      default:
    }
  }}
`;

interface RevealWordRowProps {
  guessInfo: GuessInfo;
}
interface WordRowProps {
  letter: string;
}

const RevealWordRow: FC<RevealWordRowProps> = (props) => {
  const { guessInfo } = props;

  return (
    <TileRow>
      <WordTile reveal={guessInfo.hits[0]}>{guessInfo.word[0]}</WordTile>
      <WordTile reveal={guessInfo.hits[1]}>{guessInfo.word[1]}</WordTile>
      <WordTile reveal={guessInfo.hits[2]}>{guessInfo.word[2]}</WordTile>
      <WordTile reveal={guessInfo.hits[3]}>{guessInfo.word[3]}</WordTile>
      <WordTile reveal={guessInfo.hits[4]}>{guessInfo.word[4]}</WordTile>
    </TileRow>
  );
};

const WordRow: FC<WordRowProps> = (props) => {
  const { letter } = props;

  return (
    <TileRow>
      <WordTile active={!!letter[0]}>{letter[0]}</WordTile>
      <WordTile active={!!letter[1]}>{letter[1]}</WordTile>
      <WordTile active={!!letter[2]}>{letter[2]}</WordTile>
      <WordTile active={!!letter[3]}>{letter[3]}</WordTile>
      <WordTile active={!!letter[4]}>{letter[4]}</WordTile>
    </TileRow>
  );
};

const WordsGrid: FC = () => {
  const { guesses, currentlyGuessingLetters } = useSelector(
    (state: RootState) => state.app
  );

  const guessesUsed = guesses.length;
  const guessesRemains = 6 - guessesUsed;

  const generateRemainRows = () => {
    const remainRows = [];

    for (let i = 0; i < guessesRemains; i += 1) {
      remainRows.push(
        <WordRow letter={i === 0 ? currentlyGuessingLetters : ''} />
      );
    }

    return remainRows;
  };

  return (
    <Wrapper>
      {guesses.map((guessInfo) => (
        <RevealWordRow guessInfo={guessInfo} key={guessInfo.word} />
      ))}
      {generateRemainRows()}
    </Wrapper>
  );
};

export default WordsGrid;
