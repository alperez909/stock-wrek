import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
  loading: boolean;
}

export const LoadingIndicator = (props: Props) => {
  if (!props.loading) return <></>;

  return <CircularProgress></CircularProgress>;
};
