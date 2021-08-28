import * as React from 'react';
import styled, { CSSObject } from 'styled-components/macro';
import { Logo } from './Logo';
import { Nav } from './Nav';
import { PageWrapper } from '../PageWrapper';

interface Props {
  onNavDrawerToggleClick?: () => void;
  open?: boolean;
}

export function NavBar(props: Props) {
  const handleNavDrawerToggleClick = () => {
    props.onNavDrawerToggleClick?.();
  };

  return (
    <Wrapper>
      <PageWrapper>
        <Logo
          open={props.open}
          onNavDrawerToggleClick={handleNavDrawerToggleClick}
        />
        <Nav />
      </PageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  box-shadow: 0 1px 0 0 ${p => p.theme.palette.divider};
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${p => p.theme.palette.background.default};
  z-index: 9999;
  ${p => ({ ...p.theme.mixins.toolbar } as CSSObject)};

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    background-color: ${p =>
      p.theme.palette.background.default.replace(
        /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
        'rgba$1,0.75)',
      )};
  }

  ${PageWrapper} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;
