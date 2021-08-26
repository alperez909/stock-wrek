import * as React from 'react';
import styled from 'styled-components/macro';
import GitHubIcon from '@material-ui/icons/GitHub';
import { IconButton } from '@material-ui/core';
import { ThemeSwitch } from '../ThemeSwitch';
import Tooltip from '@material-ui/core/Tooltip';

export function Nav() {
  return (
    <Wrapper>
      <ThemeSwitch />
      <Tooltip title="Github">
        <IconButton
          href="https://github.com/ap-t/stock-wrek"
          target="_blank"
          aria-label="github"
          color="primary"
        >
          <GitHubIcon />
        </IconButton>
      </Tooltip>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;
