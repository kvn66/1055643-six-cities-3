const SHIFT = 1;

export const getCard = (id, cards) => {
  return cards.find((card) => card.id === id);
};

export const getCardIndex = (id, cards) => {
  return cards.findIndex((card) => card.id === id);
};

export const replaceCardInArray = (card, cards) => {
  const index = getCardIndex(card.id, cards);
  return [].concat(cards.slice(0, index), card, cards.slice(index + 1, cards.length));
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const parseUrl = () => {
  return window.location.pathname.slice(SHIFT).split(`/`);
};
