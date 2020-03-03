import cardSelectReducer, {SET_CARD_ID, setSelectedCardIdAction} from "./card-select";
import {UNSELECTED_CARD_ID} from "../../const";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(cardSelectReducer(void 0, {})).toEqual({
    cardId: UNSELECTED_CARD_ID,
  });
});

it(`Reducer should save cardId`, () => {
  expect(cardSelectReducer({
    cardId: 0,
  }, {
    type: SET_CARD_ID,
    payload: 1,
  })).toEqual({
    cardId: 1,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setSelectedCardIdAction step returns correct action`, () => {
    expect(setSelectedCardIdAction(2)).toEqual({
      type: SET_CARD_ID,
      payload: 2,
    });
  });
});
