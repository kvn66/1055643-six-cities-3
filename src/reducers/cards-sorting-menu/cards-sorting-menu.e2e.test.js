import cardsSortingMenuReducer, {ActionType, InitValue, ActionCreator} from "./cards-sorting-menu";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(cardsSortingMenuReducer(void 0, {})).toEqual({
    sortingMethodId: InitValue.INITIAL_SORTING_METHOD_ID,
    menuState: InitValue.INITIAL_MENU_STATE
  });
});

it(`Reducer should save sortingMethodId`, () => {
  expect(cardsSortingMenuReducer({
    sortingMethodId: InitValue.INITIAL_SORTING_METHOD_ID,
    menuState: InitValue.INITIAL_MENU_STATE
  }, {
    type: ActionType.SET_SORTING_METHOD,
    payload: 1,
  })).toEqual({
    sortingMethodId: 1,
    menuState: InitValue.INITIAL_MENU_STATE
  });
});

it(`Reducer should save menuState`, () => {
  expect(cardsSortingMenuReducer({
    sortingMethodId: InitValue.INITIAL_SORTING_METHOD_ID,
    menuState: InitValue.INITIAL_MENU_STATE
  }, {
    type: ActionType.SET_MENU_STATE,
    payload: true,
  })).toEqual({
    sortingMethodId: InitValue.INITIAL_SORTING_METHOD_ID,
    menuState: true
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setSortingCardsMethodAction step returns correct action`, () => {
    expect(ActionCreator.setSortingCardsMethod(2)).toEqual({
      type: ActionType.SET_SORTING_METHOD,
      payload: 2,
    });
  });
  it(`Action creator for setMenuStateAction step returns correct action`, () => {
    expect(ActionCreator.setMenuState(true)).toEqual({
      type: ActionType.SET_MENU_STATE,
      payload: true,
    });
  });
});
