import React from 'react';
import renderer from 'react-test-renderer';
import Card from "./card.jsx";

const place = {
  image: `img/apartment-01.jpg`,
  priceValue: 120,
  priceText: `night`,
  name: `Beautiful &amp; luxurious apartment at great location`,
  type: `Apartment`
};

it(`Render card`, () => {
  const onNameClick = jest.fn();

  const tree = renderer
    .create(
        <Card
          place={place}
          onNameClick={onNameClick}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
