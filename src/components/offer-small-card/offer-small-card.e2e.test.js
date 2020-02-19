import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OfferSmallCard from "./offer-small-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const place = {
  id: 0,
  coordinates: [52.3909553943508, 4.85309666406198],
  images: [`/img/apartment-01.jpg`, `/img/room.jpg`],
  priceValue: 120,
  priceText: `night`,
  name: `Beautiful &amp; luxurious apartment at great location`,
  descriptions: [
    `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`
  ],
  type: `Apartment`,
  bedrooms: 2,
  adults: 3,
  rating: 4.5,
  inside: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
  isPremium: true,
  owner: {
    name: `Angelina`,
    avatar: `/img/avatar-angelina.jpg`,
    isSuper: true
  }
};

it(`Should name be pressed`, () => {
  const setSelectedCard = jest.fn();

  const virtualCardElement = shallow(
      <OfferSmallCard
        place={place}
        setSelectedCard = {setSelectedCard}
      />
  );

  const cardElement = virtualCardElement.find(`.place-card`);

  cardElement.props().onMouseEnter();
  cardElement.props().onMouseLeave();
  expect(setSelectedCard).toHaveBeenCalledTimes(2);
});
