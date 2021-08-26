import * as React from 'react';
import styled from 'styled-components/macro';
import IconButton from '@material-ui/core/IconButton';
import MenuButton from '@material-ui/icons/Menu';
import { messages } from './messages';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@material-ui/core';

interface Props {
  onNavDrawerToggleClick?: () => void;
  open?: boolean;
}

export function Logo(props: Props) {
  const handleNavDrawerToggleClick = () => {
    props.onNavDrawerToggleClick?.();
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const m = props.open ? messages.collapse() : messages.expand();

  return (
    <Wrapper>
      <Tooltip title={t(m) as string}>
        <MaterialIconButton onClick={handleNavDrawerToggleClick}>
          <MenuButton />
        </MaterialIconButton>
      </Tooltip>
      <Title>Stock Wrek</Title>
      <Description>The Final Frontier</Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.25rem;
  color: ${p => p.theme.palette.text.primary};
  font-weight: bold;
  margin-right: 1rem;
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: ${p => p.theme.palette.text.secondary};
  font-weight: normal;
`;

const MaterialIconButton = styled(IconButton)`
  color: ${p => p.theme.palette.text.primary} !important;
`;
