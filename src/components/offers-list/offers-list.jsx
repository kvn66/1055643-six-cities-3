import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import OfferSmallCard from "../offer-small-card/offer-small-card.jsx";

class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCard: -1,
    };

    this._setSelectedCard = this._setSelectedCard.bind(this);
  }

  _setSelectedCard(id) {
    this.setState({
      selectedCard: id,
    });
  }

  render() {
    const {places} = this.props;
    const cards = places.map((place) =>
      <OfferSmallCard key={place.id} place={place} setSelectedCard = {this._setSelectedCard} />
    );

    return (
      <React.Fragment>
        {cards}
      </React.Fragment>
    );
  }
}

OffersList.propTypes = {
  places: PropTypes.array.isRequired,
};


export default OffersList;
