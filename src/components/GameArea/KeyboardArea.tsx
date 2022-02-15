import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { RootState } from '../../reducers';
import {
  insertLetter,
  validatingWord,
  backspaceLetter,
  LetterHitStatus,
} from '../../actions/app';

interface LetterKeyProps {
  letter: string;
  hitStatus: LetterHitStatus;
}

const Wrapper = styled.div`
  height: 200px;
  max-width: 500px;
  margin: 0 auto 8px;
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 8px;
`;
const KeyButton = styled.button<{ reveal?: LetterHitStatus }>`
  display: flex;
  border-radius: 4px;
  height: 58px;
  width: 40px;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  font-weight: bold;
  flex: 1;
  color: #ffffff;
  outline: none;
  border: none;
  background-color: ${({ reveal }) => {
    switch (reveal) {
      case 'absent':
        return '#3a3a3c';
      case 'present':
        return '#b59f3b';
      case 'correct':
        return '#538d4e';
      default:
        return '#818384';
    }
  }};

  &:last-child {
    margin-right: 0;
  }
`;
const FuncButton = styled.button`
  display: flex;
  border-radius: 4px;
  height: 58px;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  font-weight: bold;
  flex: 1.5;
  color: #ffffff;
  outline: none;
  border: none;
  background-color: #818384;

  &:last-child {
    margin-right: 0;
  }
`;
const HalfSpaceButton = styled.button`
  display: flex;
  border-radius: 4px;
  height: 58px;
  flex: 0.5;
  background-color: transparent;
  outline: none;
  border: none;
`;

const LetterKey: FC<LetterKeyProps> = (props) => {
  const { letter, hitStatus } = props;
  const dispatch = useDispatch();

  const handleOnKeyDown = () => {
    dispatch(insertLetter(letter));
  };

  return (
    <KeyButton reveal={hitStatus} onClick={handleOnKeyDown}>
      {letter}
    </KeyButton>
  );
};

const EnterKey: FC = () => {
  const dispatch = useDispatch();

  const handleOnKeyDown = () => {
    dispatch(validatingWord());
  };

  return <FuncButton onClick={handleOnKeyDown}>Enter</FuncButton>;
};

const BackspaceKey: FC = () => {
  const dispatch = useDispatch();

  const handleOnKeyDown = () => {
    dispatch(backspaceLetter());
  };

  return (
    <FuncButton onClick={handleOnKeyDown}>
      <BackspaceIcon sx={{ color: '#ffffff' }} />
    </FuncButton>
  );
};

const KeyboardArea: FC = () => {
  const dispatch = useDispatch();
  const keyboardLetterHint = useSelector(
    (state: RootState) => state.app.keyboardLetterHint
  );

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      const { key } = event;

      switch (key) {
        case 'Enter':
          dispatch(validatingWord());
          break;
        case 'Backspace':
          dispatch(backspaceLetter());
          break;
        default:
          if (key.length === 1 && key.match(/[a-zA-Z]/i)) {
            const upperCaseKey = key.toUpperCase();
            dispatch(insertLetter(upperCaseKey));
          }
      }
    });
  }, [dispatch]);

  return (
    <Wrapper>
      <Row>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter) => (
          <LetterKey
            key={letter}
            letter={letter}
            hitStatus={keyboardLetterHint[letter]}
          />
        ))}
      </Row>
      <Row>
        <HalfSpaceButton />
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((letter) => (
          <LetterKey
            key={letter}
            letter={letter}
            hitStatus={keyboardLetterHint[letter]}
          />
        ))}
        <HalfSpaceButton />
      </Row>
      <Row>
        <EnterKey />
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter) => (
          <LetterKey
            key={letter}
            letter={letter}
            hitStatus={keyboardLetterHint[letter]}
          />
        ))}
        <BackspaceKey />
      </Row>
    </Wrapper>
  );
};

export default KeyboardArea;
