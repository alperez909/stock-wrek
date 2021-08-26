/**
 *
 * TrackVisibility
 *
 */
import * as React from 'react';

interface Props {
  onIntersectionChange: (entry: IntersectionObserverEntry) => void;
  rootSelector?: string;
  rootMargin?: string;
  threshold: number | number[];
  children: JSX.Element;
}

export function TrackVisibility(props: Props) {
  const ref = React.createRef<HTMLDivElement>();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(effect, []);
  };

  useEffectOnMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        props.onIntersectionChange(entry);
      },
      {
        root:
          props.rootSelector != null
            ? document.querySelector(props.rootSelector)
            : null,
        rootMargin: props.rootMargin,
        threshold: props.threshold,
      },
    );

    if (ref.current) observer.observe(ref.current);
  });

  return <div ref={ref}>{props.children}</div>;
}
