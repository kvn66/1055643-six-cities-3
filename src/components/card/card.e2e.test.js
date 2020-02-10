import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const place = {
  image: `img/apartment-01.jpg`,
  priceValue: 120,
  priceText: `night`,
  name: `Beautiful &amp; luxurious apartment at great location`,
  type: `Apartment`
};

it(`Should name be pressed`, () => {
  const onNameClick = jest.fn();

  const cardaElement = shallow(
      <Card
        place={place}
        onNameClick={onNameClick}
      />
  );

  const cardName = cardaElement.find(`.place-card__name`);

  cardName.props().onClick();

  expect(onNameClick.mock.calls.length).toBe(1);
});
