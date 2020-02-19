export const getPlace = (id, locations) => {
  let out = {};
  out.place = null;
  out.cityId = locations.findIndex((location) => {
    out.place = location.places.find((place) => {
      return place.id === id;
    });
    return out.place;
  });
  return out;
};
