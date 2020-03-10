import {getSelectedCardId} from "./selectors";
import NameSpace from "../name-space";

it(`getSelectedCardId should return cardId`, () => {
  expect(getSelectedCardId({
    [NameSpace.CARD_SELECT]: {
      cardId: 0
    }
  })).toEqual(0);
});
