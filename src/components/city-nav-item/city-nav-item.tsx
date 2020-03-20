import * as React from "react";

type Props = {
  city: string;
  setSelectedCity: (cityId: number) => void;
  cityId: number;
  selectedCityId: number;
}

const CityNavItem: React.FunctionComponent<Props> = (props: Props) => {
  const {city, setSelectedCity, cityId, selectedCityId} = props;

  const mouseClickHandler: (evt: { preventDefault: () => void }) => void = (evt) => {
    evt.preventDefault();
    setSelectedCity(cityId);
  };

  return (
    <li className="locations__item">
      <a onClick={mouseClickHandler} className={`locations__item-link tabs__item ${selectedCityId === cityId ? `tabs__item--active` : ``}`} href="#">
        <span>{city}</span>
      </a>
    </li>
  );
};

export const MemoizedCityNavItem = React.memo(CityNavItem);

export default CityNavItem;
