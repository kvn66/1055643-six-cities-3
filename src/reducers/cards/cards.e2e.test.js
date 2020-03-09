import cardsReducer from "./cards";


it(`Reducer without additional parameters should return initial state`, () => {
  expect(cardsReducer(void 0, {})).toEqual({
    cards: [],
  });
});
