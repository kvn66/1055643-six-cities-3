const SIMILAR_OFFERS_COUNT = 3;

const getRandomFloat = (min, max) => {
  return (min + Math.random() * (max - min));
};

const getRandomInt = (min, max) => {
  return Math.floor(getRandomFloat(min, max));
};

const getRandomArray = (initArray) => {
  const count = SIMILAR_OFFERS_COUNT;
  if (initArray.length <= count) {
    return initArray;
  }

  const maxCount = initArray.length;
  const set = new Set();
  while (set.size < count) {
    set.add(getRandomInt(0, maxCount));
  }
  return Array.from(set).map((item) => initArray[item]);
};

export const getCard = (id, cards) => {
  return cards.find((card) => card.id === id);
};

export const getSimilarOffers = (cards, cardId, all) => {
  if (all) {
    return cards.filter((card) => card.id !== cardId);
  }

  const currentCard = cards.find((card) => card.id === cardId);
  const similarOffers = cards.filter((card) => card.type === currentCard.type).filter((card) => card.id !== cardId);
  return getRandomArray(similarOffers);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

