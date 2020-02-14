import React from 'react';
import renderer from 'react-test-renderer';
import OfferSmallCard from "./offer-small-card.jsx";

const place = {
  id: 0,
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

it(`Render card`, () => {
  const setSelectedCard = jest.fn();

  const tree = renderer
    .create(
        <OfferSmallCard
          place={place}
          setSelectedCard = {setSelectedCard}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
