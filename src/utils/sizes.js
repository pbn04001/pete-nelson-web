export const getBaseFontSize = () => parseInt(window.getComputedStyle(document.documentElement)['font-size'], 10);

export const getSpacingUnit = () => getBaseFontSize() / 2;

export const SCREEN_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
});

export const getScreenSizeMax = (size) => {
  switch (size) {
    case SCREEN_SIZE.SM : {
      return getBaseFontSize() * 48;
    }
    case SCREEN_SIZE.MD : {
      return getBaseFontSize() * 64;
    }
    case SCREEN_SIZE.LG : {
      return getBaseFontSize() * 90;
    }
    default: {
      return getBaseFontSize() * 90;
    }
  }
};
