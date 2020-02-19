export const locations = [
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
        inside: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
        isPremium: true,
        owner: {
          name: `Angelina`,
          avatar: `/img/avatar-angelina.jpg`,
          isSuper: true
        }
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
        inside: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
        isPremium: false,
        owner: {
          name: `Angelina`,
          avatar: `/img/avatar-angelina.jpg`,
          isSuper: false
        }
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
        inside: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`],
        isPremium: false,
        owner: {
          name: `Angelina`,
          avatar: `/img/avatar-angelina.jpg`,
          isSuper: false
        }
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
        inside: [`Wi-Fi`, `Towels`, `Heating`, `Coffee machine`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
        isPremium: true,
        owner: {
          name: `Angelina`,
          avatar: `/img/avatar-angelina.jpg`,
          isSuper: true
        }
      }
    ]
  }
];