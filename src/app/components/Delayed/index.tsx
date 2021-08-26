import * as React from 'react';
import Fade from '@material-ui/core/Fade';

interface Props {
  timeout: number;
  children: React.ReactNode;
}

export const Delayed = ({ children, timeout }: Props) => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(true);
    }, timeout);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fade
      in={loading}
      style={{
        transitionDelay: loading ? '800ms' : '0ms',
      }}
      unmountOnExit
    >
      <>{children}</>
    </Fade>
  );
};
