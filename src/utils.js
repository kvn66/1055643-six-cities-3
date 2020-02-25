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

export const getPlace = (id, locations) => {
  let out = {};
  out.place = null;
  out.cityId = locations.findIndex((location) => {
    out.place = location.places.find((place) => {
      return place.id === id;
    });
    return (out.place !== undefined);
  });
  return out;
};

export const getSimilarOffers = (cityId, locations, placeId, all) => {
  if (all) {
    return locations[cityId].places.map((place) => place.id).filter((item) => item !== placeId);
  }

  const currentPlace = getPlace(placeId, locations);
  const similarOffers = locations[cityId].places.filter((place) => place.type === currentPlace.place.type).map((place) => place.id).filter((item) => item !== placeId);
  return getRandomArray(similarOffers);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};
