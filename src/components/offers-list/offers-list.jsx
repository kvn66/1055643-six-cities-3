import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import OfferSmallCard from "../offer-small-card/offer-small-card.jsx";

class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this._onMouseOverCard = this._onMouseOverCard.bind(this);
  }

  _onMouseOverCard(evt) {
    evt.preventDefault();
    console.log(evt.target.dataset);
  }

  render() {
    const {places, onNameClick} = this.props;
    const cards = places.map((place, index) =>
      <OfferSmallCard key={index} place={place} onNameClick = {onNameClick} onMouseOverCard = {this._onMouseOverCard} />
    );

    return (
      <React.Fragment>
        {cards}
      </React.Fragment>
    );
  }
}

OffersList.propTypes = {
  place: PropTypes.exact({
    image: PropTypes.string.isRequired,
    priceValue: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  onNameClick: PropTypes.func.isRequired,
};


export default OffersList;
