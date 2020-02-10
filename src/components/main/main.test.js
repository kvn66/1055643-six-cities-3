import React from 'react';
import renderer from 'react-test-renderer';
import Main from "./main.jsx";

const location = {
  city: `Amsterdam`,
  places: [
    {
      image: `img/apartment-01.jpg`,
      priceValue: 120,
      priceText: `night`,
      name: `Beautiful &amp; luxurious apartment at great location`,
      type: `Apartment`
    },
    {
      image: `img/room.jpg`,
      priceValue: 80,
      priceText: `night`,
      name: `Wood and stone place`,
      type: `Private room`
    },
    {
      image: `img/apartment-02.jpg`,
      priceValue: 132,
      priceText: `night`,
      name: `Canal View Prinsengracht`,
      type: `Apartment`
    },
    {
      image: `img/apartment-03.jpg`,
      priceValue: 180,
      priceText: `night`,
      name: `Nice, cozy, warm big bed apartment`,
      type: `Apartment`
    },
    {
      image: `img/room.jpg`,
      priceValue: 80,
      priceText: `night`,
      name: `Wood and stone place`,
      type: `Private room`
    }
  ]
};

it(`Render main`, () => {
  const onNameClick = jest.fn();

  const tree = renderer
    .create(
        <Main
          location={location}
          onNameClick={onNameClick}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
