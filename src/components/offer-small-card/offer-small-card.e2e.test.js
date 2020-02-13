import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OfferSmallCard from "./offer-small-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const place = {
  id: 0,
  image: `img/apartment-01.jpg`,
  priceValue: 120,
  priceText: `night`,
  name: `Beautiful &amp; luxurious apartment at great location`,
  type: `Apartment`,
  isPremium: true
};

it(`Should name be pressed`, () => {
  const onNameClick = jest.fn();
  const setSelectedCard = jest.fn();

  const cardaElement = shallow(
      <OfferSmallCard
        place={place}
        onNameClick={onNameClick}
        setSelectedCard = {setSelectedCard}
      />
  );

  const cardElement = cardaElement.find(`.place-card`);
  const cardName = cardaElement.find(`.place-card__name`);

  cardName.props().onClick();
  cardElement.props().onMouseEnter();
  cardElement.props().onMouseLeave();

  expect(onNameClick).toHaveBeenCalledTimes(1);
  expect(setSelectedCard).toHaveBeenCalledTimes(2);
});
