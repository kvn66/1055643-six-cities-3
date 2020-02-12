const locations = [
  {
    city: `Amsterdam`,
    places: [
      {
        id: 0,
        images: [`./img/apartment-01.jpg`, `img/room.jpg`],
        priceValue: 120,
        priceText: `night`,
        name: `Beautiful &amp; luxurious apartment at great location`,
        description: ``,
        type: `Apartment`,
        bedrooms: 2,
        adults: 3,
        rating: 4.5,
        inside: [`Wi-Fi`, `Washing machine`],
        isPremium: true,
        owner: {
          name: `Angelina`,
          avatar: `img/avatar-angelina.jpg`,
          isSuper: true
        }
      },
      {
        id: 1,
        images: [`img/room.jpg`, `img/apartment-02.jpg`],
        priceValue: 80,
        priceText: `night`,
        name: `Wood and stone place`,
        description: ``,
        type: `Private room`,
        bedrooms: 2,
        adults: 3,
        rating: 4.5,
        inside: [`Wi-Fi`, `Washing machine`],
        isPremium: false,
        owner: {
          name: `Angelina`,
          avatar: `img/avatar-angelina.jpg`,
          isSuper: false
        }
      },
      {
        id: 2,
        images: [`img/apartment-02.jpg`, `img/apartment-03.jpg`],
        priceValue: 132,
        priceText: `night`,
        name: `Canal View Prinsengracht`,
        description: ``,
        type: `Apartment`,
        bedrooms: 2,
        adults: 3,
        rating: 4.5,
        inside: [`Wi-Fi`, `Washing machine`],
        isPremium: false,
        owner: {
          name: `Angelina`,
          avatar: `img/avatar-angelina.jpg`,
          isSuper: false
        }
      },
      {
        id: 3,
        images: [`img/apartment-03.jpg`, `img/studio-01.jpg`],
        priceValue: 180,
        priceText: `night`,
        name: `Nice, cozy, warm big bed apartment`,
        description: ``,
        type: `Apartment`,
        bedrooms: 2,
        adults: 3,
        rating: 4.5,
        inside: [`Wi-Fi`, `Washing machine`],
        isPremium: true,
        owner: {
          name: `Angelina`,
          avatar: `img/avatar-angelina.jpg`,
          isSuper: true
        }
      },
      {
        id: 4,
        images: [`img/room.jpg`, `img/apartment-01.jpg`],
        priceValue: 80,
        priceText: `night`,
        name: `Wood and stone place`,
        description: ``,
        type: `Private room`,
        bedrooms: 2,
        adults: 3,
        rating: 4.5,
        inside: [`Wi-Fi`, `Washing machine`],
        isPremium: false,
        owner: {
          name: `Angelina`,
          avatar: `img/avatar-angelina.jpg`,
          isSuper: false
        }
      }
    ]
  }
];

export default locations;
