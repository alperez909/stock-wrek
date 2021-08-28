import { createGlobalStyle, CSSObject, CSSProperties } from 'styled-components';

const renameMarginToPadding = (
  toolbar: CSSProperties,
  cssObject: CSSObject,
): CSSObject => {
  for (let property in toolbar) {
    if (typeof toolbar[property] === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cssObject[property] = {};
      renameMarginToPadding(
        toolbar[property],
        cssObject[property] as CSSObject,
      );
    } else if (property === 'minHeight') {
      cssObject['paddingTop'] = toolbar[property];
    } else {
      cssObject[property] = toolbar[property];
    }
  }

  return cssObject;
};

/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: ${p => p.theme.palette.background.paper};
    ${p => renameMarginToPadding(p.theme.mixins.toolbar, {})};
  }

  body.fontLoaded {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  p,
  label {
    line-height: 1.5em;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
