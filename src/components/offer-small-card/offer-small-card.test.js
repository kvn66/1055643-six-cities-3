import React from 'react';
import renderer from 'react-test-renderer';
import OfferSmallCard from "./offer-small-card.jsx";

const place = {
  id: 0,
  image: `img/apartment-01.jpg`,
  priceValue: 120,
  priceText: `night`,
  name: `Beautiful &amp; luxurious apartment at great location`,
  type: `Apartment`,
  isPremium: true
};

it(`Render card`, () => {
  const onNameClick = jest.fn();
  const setSelectedCard = jest.fn();

  const tree = renderer
    .create(
        <OfferSmallCard
          place={place}
          onNameClick={onNameClick}
          setSelectedCard = {setSelectedCard}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
