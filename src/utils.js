export const getCard = (id, cards) => {
  return cards.find((card) => card.id === id);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const parseUrl = () => {
  return window.location.pathname.slice(1).split(`/`);
};
