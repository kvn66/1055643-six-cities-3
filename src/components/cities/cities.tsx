import * as React from "react";
import {getSelectedCityId} from "../../reducers/city-select/selectors";
import {getCityNames, getCardsCount} from "../../reducers/cards/selectors";
import {ActionCreator} from "../../reducers/city-select/city-select";
import City from "../city/city";
import {MemoizedCityNavItem} from "../city-nav-item/city-nav-item";
import {connect} from "react-redux";

type cityNames = string[];

type Props = {
  cardsCount: number;
  cityNames: cityNames;
  selectedCityId: number;
  setSelectedCity: (id: number) => void;
}

const Cities: React.FunctionComponent<Props> = (props: Props) => {
  const {cardsCount, cityNames, selectedCityId, setSelectedCity} = props;

  const cityNav = cityNames.map((cityName, index) =>
    <MemoizedCityNavItem key={index} city={cityName} setSelectedCity={setSelectedCity} cityId={index} selectedCityId={selectedCityId} />
  );

  return (
    <main className={`page__main page__main--index ${cardsCount ? `` : `page__main--index-empty`}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cityNav}
          </ul>
        </section>
      </div>
      <City />
    </main>
  );
};

const mapStateToProps = (store) => {
  return {
    cardsCount: getCardsCount(store),
    cityNames: getCityNames(store),
    selectedCityId: getSelectedCityId(store),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCity: (id: number) => dispatch(ActionCreator.setSelectedCityId(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
