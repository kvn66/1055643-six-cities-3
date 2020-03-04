import React from 'react';
import renderer from 'react-test-renderer';
import City from "./city.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {InitValue} from "../../reducers/cards-sorting-menu/cards-sorting-menu";

const CITY_ID = 0;
const CARD_ID = 0;

const mockStore = configureStore([]);

const locations = [
  {
    city: `Amsterdam`,
    cityCoordinates: [52.38333, 4.9],
    places: [
      {
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
        goods: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
        isPremium: true,
        owner: {
          name: `Angelina`,
          avatar: `/img/avatar-angelina.jpg`,
          isSuper: true
        },
        reviews: [0, 1]
      },
      {
        id: 1,
        coordinates: [52.369553943508, 4.85309666406198],
        images: [`/img/room.jpg`, `/img/apartment-02.jpg`],
        priceValue: 80,
        priceText: `night`,
        name: `Wood and stone place`,
        descriptions: [
          `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
          `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`
        ],
        type: `Private room`,
        bedrooms: 2,
        adults: 3,
        rating: 4.5,
        goods: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
        isPremium: false,
        owner: {
          name: `Angelina`,
          avatar: `/img/avatar-angelina.jpg`,
          isSuper: false
        },
        reviews: [0]
      },
      {
        id: 2,
        coordinates: [52.3909553943508, 4.929309666406198],
        images: [`/img/apartment-02.jpg`, `/img/apartment-03.jpg`],
        priceValue: 132,
        priceText: `night`,
        name: `Canal View Prinsengracht`,
        descriptions: [
          `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
          `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`
        ],
        type: `Apartment`,
        bedrooms: 2,
        adults: 3,
        rating: 4.5,
        goods: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`],
        isPremium: false,
        owner: {
          name: `Angelina`,
          avatar: `/img/avatar-angelina.jpg`,
          isSuper: false
        },
        reviews: [1]
      },
      {
        id: 3,
        coordinates: [52.3809553943508, 4.939309666406198],
        images: [`/img/apartment-03.jpg`, `/img/studio-01.jpg`],
        priceValue: 180,
        priceText: `night`,
        name: `Nice, cozy, warm big bed apartment`,
        descriptions: [
          `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
          `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`
        ],
        type: `Apartment`,
        bedrooms: 2,
        adults: 3,
        rating: 4.5,
        goods: [`Wi-Fi`, `Towels`, `Heating`, `Coffee machine`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
        isPremium: true,
        owner: {
          name: `Angelina`,
          avatar: `/img/avatar-angelina.jpg`,
          isSuper: true
        },
        reviews: [0, 1]
      }
    ]
  }
];

it(`Render Cities`, () => {
  const store = mockStore({
    cards: {
      locations: cards
    },
    citySelect: {
      cityName: CITY_ID
    },
    cardsSortingMenu: {
      sortingMethodId: InitValue.INITIAL_SORTING_METHOD_ID,
      menuState: InitValue.INITIAL_MENU_STATE
    },
    cardSelect: {
      cardId: CARD_ID
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <City
            setSelectedCard={() => {}}
          />
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
