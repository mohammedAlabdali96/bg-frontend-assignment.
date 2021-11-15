import React, { useContext } from "react";
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'

import "../styles/unit.css";
import UnitContext from "../contexts/unit.context.";
import UnitConstants from "../constants/unit.constants";


const Title = () => {
    const { data, mode } = useContext(UnitContext);
    return <Card.Title className="bold-text">{`${data.name} - ${data.region}`}</Card.Title>
}
const Description = () => {
    const { data, mode } = useContext(UnitContext);
    return (
        <Card.Text
            className={mode === UnitConstants.LIST_UNIT ? "truncated" : ""}
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
        {[...Array(5)].map((n, i) =>
            <span
                className={`fa fa-star ${i + 1 ? "" : "checked"}`}
                key={`rating-${i}`}
            />
        )}
    </Card.Text>
}
const Amenities = () => {
    const baseYear = 2080;
    const { data, mode } = useContext(UnitContext);
    const amenitiesReducer = (accumulator, currentValue) => accumulator + ', ' + currentValue;
    return <Card.Text className="availability">
        <span className="bold-text">Amenities: </span>
        {data.amenities ? data.amenities.reduce(amenitiesReducer) : ""}
    </Card.Text>
}
const Availability = () => {
    const { data, mode } = useContext(UnitContext);
    const [availability, setAvailability] = useState(null);
    const arrayOfYears = data.availability ? data.availability : [];
    return <Card.Text>
        {[...Array(8)].map((n, i) =>
            <button
                disabled={arrayOfYears.includes(baseYear + (i + 1))}
                key={`availability-${i}`}
                onClick={() => setAvailability(baseYear + (i + 1))}
                className={baseYear + (i + 1) === availability ? "selected" : ""}
            >
                {baseYear + (i + 1)}
            </button>)}
    </Card.Text>
}
const Unit = ({ data, mode, clickUnit }) => {
    return (
        <UnitContext.Provider value={{ data, mode }} className={mode}>
            <Card onClick={() => clickUnit(data.id)}>
                <Card.Img variant="top" src={"https://mars.theblueground.net/" + data.pictures[0]} />
                <Card.Body>
                    <Title />
                    <Description />
                    <Cancellation />
                    <Price />
                    <Rating />
                    <Amenities />
                    <Availability />
                </Card.Body>
            </Card>
        </UnitContext.Provider>
    )
}

Unit.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
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
    clickUnit: PropTypes.func,
    mode: PropTypes.string.isRequired,
}
Unit.defaultProps = {
    clickUnit: () => void (0)
}
export default Unit;