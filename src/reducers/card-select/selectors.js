import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.CARD_SELECT;

export const getSelectedCardId = (state) => {
  return state[NAME_SPACE].cardId;
};
