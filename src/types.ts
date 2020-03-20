export type LocationType = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type CityType = {
  location: LocationType;
  name: string;
}

export type HostType = {
  id: number;
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type CardType = {
  id: number;
  city: CityType;
  bedrooms: number;
  images: string[];
  description: string;
  goods: string[];
  host: HostType;
  isFavorite: boolean;
  isPremium: boolean;
  location: LocationType;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export type FavoritesForCityType = {
  city: string;
  cards: CardType[];
}

export type UserInfoType = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  isPro: boolean;
}

export type ClassNameType = {
  ARTICLE: string;
  IMAGE: string;
}

export type ReviewType = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: HostType;
}

export type CommentPostType = {
  rating: number;
  comment: string;
};

export type AuthDataType = {
  email: string;
  password: string;
};

