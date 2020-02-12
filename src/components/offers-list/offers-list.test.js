import React from 'react';
import renderer from 'react-test-renderer';
import OffersList from "./offers-list.jsx";

const places = [
  {
    id: 0,
    image: `img/apartment-01.jpg`,
    priceValue: 120,
    priceText: `night`,
    name: `Beautiful &amp; luxurious apartment at great location`,
    type: `Apartment`,
    isPremium: true
  },
  {
    id: 1,
    image: `img/room.jpg`,
    priceValue: 80,
    priceText: `night`,
    name: `Wood and stone place`,
    type: `Private room`,
    isPremium: false
  },
  {
    id: 2,
    image: `img/apartment-02.jpg`,
    priceValue: 132,
    priceText: `night`,
    name: `Canal View Prinsengracht`,
    type: `Apartment`,
    isPremium: false
  },
  {
    id: 3,
    image: `img/apartment-03.jpg`,
    priceValue: 180,
    priceText: `night`,
    name: `Nice, cozy, warm big bed apartment`,
    type: `Apartment`,
    isPremium: true
  },
  {
    id: 4,
    image: `img/room.jpg`,
    priceValue: 80,
    priceText: `night`,
    name: `Wood and stone place`,
    type: `Private room`,
    isPremium: false
  }
];

it(`Render main`, () => {
  const onNameClick = jest.fn();

  const tree = renderer
    .create(
        <OffersList
          places={places}
          onNameClick={onNameClick}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
