import netErrorReducer, {ActionType, ActionCreator} from "./net-error";
import {NetErrorStatus} from "../../const.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(netErrorReducer(void 0, {})).toEqual({
    isError: NetErrorStatus.NO_ERROR,
    netError: ``,
  });
});

it(`Reducer should save isError`, () => {
  expect(netErrorReducer({
    isError: NetErrorStatus.NO_ERROR,
    netError: ``,
  }, {
    type: ActionType.SET_ERROR_STATUS,
    payload: NetErrorStatus.ERROR,
  })).toEqual({
    isError: NetErrorStatus.ERROR,
    netError: ``,
  });
});

it(`Reducer should save netError`, () => {
  expect(netErrorReducer({
    isError: NetErrorStatus.NO_ERROR,
    netError: ``,
  }, {
    type: ActionType.SAVE_ERROR,
    payload: `ERROR`,
  })).toEqual({
    isError: NetErrorStatus.NO_ERROR,
    netError: `ERROR`,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setNetErrorStatus step returns correct action`, () => {
    expect(ActionCreator.setNetErrorStatus(NetErrorStatus.ERROR)).toEqual({
      type: ActionType.SET_ERROR_STATUS,
      payload: NetErrorStatus.ERROR,
    });
  });
  it(`Action creator for saveNetError step returns correct action`, () => {
    expect(ActionCreator.saveNetError(`ERROR`)).toEqual({
      type: ActionType.SAVE_ERROR,
      payload: `ERROR`,
    });
  });
});
