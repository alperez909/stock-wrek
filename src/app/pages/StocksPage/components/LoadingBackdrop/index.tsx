import * as React from 'react';
import styled from 'styled-components/macro';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import Backdrop from '@material-ui/core/Backdrop';
import { request } from 'utils/request';
import { Delayed } from 'app/components/Delayed';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';

const PageBackdrop = styled(Backdrop)`
  &.MuiBackdrop-root {
    z-index: 9999;
    flex-direction: column;
    font-size: 1.5rem;
    color: ${p => p.theme.palette.grey[50]};
  }
`;

interface Props {}

export function LoadingBackdrop(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const [isBackdropOpen, setIsBackdropOpen] = React.useState(true);
  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(effect, []);
  };

  useEffectOnMount(() => {
    request(`${process.env.REACT_APP_API_URI}system/ping`).finally(() =>
      setIsBackdropOpen(false),
    );
  });

  return (
    <>
      <Delayed timeout={450}>
        <PageBackdrop open={isBackdropOpen}>
          <LoadingIndicator loading={isBackdropOpen} />
          <p>{t(messages.startingWebServer())}</p>
        </PageBackdrop>
      </Delayed>
    </>
  );
}
