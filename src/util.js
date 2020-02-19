export const getPlace = (id, locations) => {
  let out = null;
  locations.forEach((location) => {
    out = location.places.find((place) => {
      return place.id === id;
    });
  });
  return out;
};
