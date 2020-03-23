import * as React from "react";
import {getSelectedCityId} from "../../reducers/city-select/selectors";
import {ActionCreator} from "../../reducers/city-select/city-select";
import {connect} from "react-redux";

type Props = {
  city: string;
  setSelectedCityId: (cityId: number) => void;
  cityId: number;
  selectedCityId: number;
}

const CityNavItem: React.FunctionComponent<Props> = (props: Props) => {
  const {city, setSelectedCityId, cityId, selectedCityId} = props;

  const mouseClickHandler: (evt: { preventDefault: () => void }) => void = (evt) => {
    evt.preventDefault();
    setSelectedCityId(cityId);
  };

  return (
    <li className="locations__item">
      <a onClick={mouseClickHandler} className={`locations__item-link tabs__item ${selectedCityId === cityId ? `tabs__item--active` : ``}`} href="#">
        <span>{city}</span>
      </a>
    </li>
  );
};

const mapStateToProps = (store) => {
  return {
    selectedCityId: getSelectedCityId(store),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCityId: (id: number) => dispatch(ActionCreator.setSelectedCityId(id))
  };
};

export const MemoizedCityNavItem = connect(mapStateToProps, mapDispatchToProps)(React.memo(CityNavItem));

export default connect(mapStateToProps, mapDispatchToProps)(CityNavItem);
