import {getNetErrorStatus, getNetError} from "./selectors";
import {NameSpace} from "../name-space";
import {NetErrorStatus} from "../../const";

const store = {
  [NameSpace.NET_ERROR]: {
    isError: NetErrorStatus.NO_ERROR,
    netError: ``,
  },
};

it(`getNetErrorStatus should return isError`, () => {
  expect(getNetErrorStatus(store)).toEqual(NetErrorStatus.NO_ERROR);
});

it(`getNetError should return netError`, () => {
  expect(getNetError(store)).toEqual(``);
});
