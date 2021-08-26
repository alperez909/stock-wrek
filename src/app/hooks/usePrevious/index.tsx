import * as React from 'react';

export function usePrevious(data: any) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = data;
  }, [data]);
  return ref.current;
}
