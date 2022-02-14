import React, { FC } from 'react';
import styled from 'styled-components';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #3a3a3c;
  height: 50px;
`;
const Logo = styled.p`
  font-weight: 700;
  font-size: 37px;
  color: #ffffff;
`;

const Header: FC = () => (
  <Wrapper>
    <HelpOutlineIcon sx={{ color: '#ffffff' }} />
    <Logo>Wordle-Reproduce</Logo>
    <SettingsIcon sx={{ color: '#ffffff' }} />
  </Wrapper>
);

export default Header;
