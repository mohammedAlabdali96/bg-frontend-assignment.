import React, { useContext } from "react";
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'

import "../styles/unit.css";
import UnitContext from "../contexts/unit.context.";
import UnitConstant from "../constants/unit.constants";


const Title = () => {
    const { data, mode } = useContext(UnitContext);
    return <Card.Title className="bold-text">{`${data.name} - ${data.region}`}</Card.Title>
}
const Description = () => {
    const { data, mode } = useContext(UnitContext);
    return (
        <Card.Text
            className={mode === UnitConstant.LIST_UNIT ? "truncated" : ""}
        >
            {data.description}
        </Card.Text>
    )
}
const Cancellation = () => {
    const { data, mode } = useContext(UnitContext);
    return <Card.Text>{data.cancellation}</Card.Text>
}
const Price = () => {
    const { data, mode } = useContext(UnitContext);
    return <Card.Text className="bold-text">{`${data.price} BTC`}</Card.Text>
}
const Rating = () => {
    const { data, mode } = useContext(UnitContext);
    return <Card.Text>
        {[1, 2, 3, 4, 5].map(n =>
            <span
                className={`fa fa-star ${n > data.rating ? "" : "checked"}`}
                key={`rating-${n}`}
            />
        )}
    </Card.Text>
}
const Amenities = () => {
    const { data, mode } = useContext(UnitContext);
    const amenitiesReducer = (accumulator, currentValue) => accumulator + ', ' + currentValue;
    return <Card.Text>
        <span className="bold-text">Amenities: </span>
        {data.amenities ? data.amenities.reduce(amenitiesReducer) : ""}
    </Card.Text>
}
const Unit = ({ data, mode, clickUnit }) => {
    return (
        <UnitContext.Provider value={{ data, mode }}>
            <Card onClick={() => clickUnit(data.id)}>
            <Card.Img variant="top" src={"https://mars.theblueground.net/"+data.pictures[0]} />
                <Card.Body>
                    <Title />
                    <Description />
                    <Cancellation />
                    <Price />
                    <Rating />
                    <Amenities />
                </Card.Body>
            </Card>
        </UnitContext.Provider>
    )
}

Unit.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        mode: PropTypes.string,
        name: PropTypes.string.isRequired,
        region: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        cancellation: PropTypes.string,
        rating: PropTypes.number.isRequired,
        pictures: PropTypes.array,
        amenities: PropTypes.array,
        availability: PropTypes.array,
    }),
    clickUnit: PropTypes.func
}
Unit.defaultProps = {
    clickUnit: () => void (0),
    mode: UnitConstant.LIST_UNIT,
}
export default Unit;