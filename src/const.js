export const UNSELECTED_CARD_ID = -1;
export const NetworkError = {
  UNAUTHORIZED: 401
};

export const SORTING_METHODS = [
  `Popular`,
  `Price: low to high`,
  `Price: high to low`,
  `Top rated first`
];

export const HotelType = {
  apartment: `Apartment`,
  room: `Private Room`,
  house: `House`,
  hotel: `Hotel`
};

export const AppRoute = {
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer`,
  ROOT: `/`,
};

export const LockState = {
  LOCK: true,
  UNLOCK: false,
};

export const CardClassName = {
  CITY: {
    ARTICLE: `cities__place-card`,
    IMAGE: `cities__image-wrapper`
  },
  DETAIL: {
    ARTICLE: `near-places__card`,
    IMAGE: `near-places__image-wrapper`
  },
  FAVORITES: {
    ARTICLE: `favorites__card`,
    IMAGE: `favorites__image-wrapper`
  },
};

