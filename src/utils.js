const SHAKE_ANIMATION_TIMEOUT = 600;

export const getCard = (id, cards) => {
  return cards.find((card) => card.id === id);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const parseUrl = () => {
  return window.location.pathname.slice(1).split(`/`);
};

export const shakeElement = (element) => {
  element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

  setTimeout(() => {
    element.style.animation = ``;
  }, SHAKE_ANIMATION_TIMEOUT);
};
