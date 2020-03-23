import * as React from "react";
import {getCityNames, getCardsCount} from "../../reducers/cards/selectors";
import City from "../city/city";
import {MemoizedCityNavItem} from "../city-nav-item/city-nav-item";
import {connect} from "react-redux";

type Props = {
  cardsCount: number;
  cityNames: string[];
}

const Cities: React.FunctionComponent<Props> = (props: Props) => {
  const {cardsCount, cityNames} = props;

  const cityNav = cityNames.map((cityName, index) =>
    <MemoizedCityNavItem key={index} city={cityName} cityId={index} />
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
  };
};

export default connect(mapStateToProps)(Cities);
