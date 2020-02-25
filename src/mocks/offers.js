const STORE_PREFIX = `sinemaddict-movies-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const IMAGES = [`/img/apartment-01.jpg`, `/img/apartment-02.jpg`, `/img/apartment-03.jpg`, `/img/room.jpg`];
const INSIDE = [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`];
const NAMES = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`
];
const TYPES = [`Apartment`, `Private room`, `House`, `Hotel`];
const CITIES = [
  {
    name: `Paris`,
    coordinates: [48.8534100, 2.3488000]
  },
  {
    name: `Cologne`,
    coordinates: [50.9333300, 6.9500000]
  },
  {
    name: `Brussels`,
    coordinates: [50.8504500, 4.3487800]
  },
  {
    name: `Amsterdam`,
    coordinates: [52.3740300, 4.8896900]
  },
  {
    name: `Hamburg`,
    coordinates: [53.5753200, 10.0153400]
  },
  {
    name: `Dusseldorf`,
    coordinates: [51.2217200, 6.7761600]
  }
];

const getRandomFloat = (min, max) => {
  return (min + Math.random() * (max - min));
};

const getRandomInt = (min, max) => {
  return Math.floor(getRandomFloat(min, max));
};

const getRandomBool = () => {
  return (Math.random() > 0.5);
};

const getRandomShift = () => {
  const sign = getRandomBool() ? -1.0 : 1.0;
  return (sign * getRandomFloat(0.01, 0.06));
};

const getRandomAngle = () => {
  const angle = getRandomFloat(0.0, 90.0);
  return (Math.PI / 180.0 * angle);
};

const getRandomCoordinates = (initCoordinates) => {
  const shiftX = getRandomShift() * Math.cos(getRandomAngle());
  const shiftY = getRandomShift() * Math.sin(getRandomAngle());
  let out = [0, 0];
  out[0] = initCoordinates[0] + shiftX;
  out[1] = initCoordinates[1] + shiftY;
  return out;
};

const getRandomArray = (initArray) => {
  const maxCount = initArray.length;
  const set = new Set();
  const count = getRandomInt(1, maxCount);
  while (set.size < count) {
    set.add(getRandomInt(0, maxCount));
  }
  return Array.from(set).map((item) => initArray[item]);
};

const getPlace = (placeId, initCoordinates) => {
  const out = {
    id: placeId.id,
    coordinates: getRandomCoordinates(initCoordinates),
    images: getRandomArray(IMAGES),
    priceValue: getRandomInt(50, 250),
    priceText: `night`,
    name: NAMES[placeId.id % 5],
    descriptions: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`
    ],
    type: TYPES[getRandomInt(0, 4)],
    bedrooms: getRandomInt(1, 5),
    adults: getRandomInt(1, 5),
    rating: getRandomFloat(0, 5),
    inside: getRandomArray(INSIDE),
    isPremium: getRandomBool(),
    owner: {
      name: `Angelina`,
      avatar: `/img/avatar-angelina.jpg`,
      isSuper: getRandomBool()
    },
    reviews: getRandomArray([0, 1])
  };
  placeId.id++;
  return out;
};

const getPlaces = (initCoordinates, placeId) => {
  return new Array(getRandomInt(15, 25)).fill(``).map(() => getPlace(placeId, initCoordinates));
};

const getLocation = (city, placeId, index) => {
  if (index === 5) {
    return {
      city: city.name,
      cityCoordinates: city.coordinates,
      places: []
    };
  }

  return {
    city: city.name,
    cityCoordinates: city.coordinates,
    places: getPlaces(city.coordinates, placeId)
  };
};

const generateLocations = () => {
  let placeId = {id: 0};
  return CITIES.map((city, index) => getLocation(city, placeId, index));
};

class Store {
  constructor(storeName, storage) {
    this._storage = storage;
    this._storeName = storeName;
  }

  clear() {
    this._storage.setItem(
        this._storeName,
        JSON.stringify({})
    );
  }

  getAll() {
    try {
      return JSON.parse(this._storage.getItem(this._storeName));
    } catch (err) {
      return {};
    }
  }

  getItem(key) {
    const store = this.getAll();
    return store[key];
  }

  setItem(key, value) {
    const store = this.getAll();

    this._storage.setItem(
        this._storeName,
        JSON.stringify(
            Object.assign({}, store, {[key]: value})
        )
    );
  }
}

const store = new Store(STORE_NAME, window.localStorage);

const getLocations = (rewrite) => {
  if (!store.getAll() || rewrite) {
    store.setItem(`locations`, generateLocations());
  }

  return store.getItem(`locations`);
};

export const locations = getLocations(false);
