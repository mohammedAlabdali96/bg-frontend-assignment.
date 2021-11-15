import React, { useContext, useState } from "react";
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'

import "../styles/unit.css";
import UnitContext from "../contexts/unit.context.";
import UnitConstants from "../constants/unit.constants";


const Title = () => {
    const { data, mode } = useContext(UnitContext);
    return <>
        {mode === UnitConstants.LIST_UNIT && <Card.Text className={`bold-text title ${data.isBooked ? "booked" : ""}`}>
            {`${data.name} - ${data.region}`}
        </Card.Text>}
        {mode === UnitConstants.BOOK_UNIT && <Card.Text className="bold-text title">
            <span>{`${data.name} - ${data.region}`}</span>
            <span>{`${data.price} BTC`}</span>
        </Card.Text>}

    </>

}
const Description = () => {
    const { data, mode } = useContext(UnitContext);
    return (
        <>
            {mode === UnitConstants.LIST_UNIT && <Card.Text className={"truncated"}>
                {data.description}
            </Card.Text>}

            {mode === UnitConstants.BOOK_UNIT && <Card.Text
                dangerouslySetInnerHTML={{ __html: data.description }}
            />}
        </>
    )
}
const Cancellation = () => {
    const { data, mode } = useContext(UnitContext);
    return <Card.Text>{data.cancellation}</Card.Text>
}
const Price = () => {
    const { data, mode } = useContext(UnitContext);
    return <Card.Text className={`bold-text ${mode === UnitConstants.LIST_UNIT ? "" : "highlighted"}`}>
        {`${data.price} BTC`}
    </Card.Text>
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
    return <Card.Text className="amenities">
        <span className="bold-text">Amenities: </span>
        {data.amenities ? data.amenities.reduce(amenitiesReducer) : ""}
    </Card.Text>
}
const Availability = ({ availability, setAvailability }) => {
    console.log(Availability)
    const baseYear = 2080;
    const { data, mode } = useContext(UnitContext);
    const arrayOfYears = data.availability ? data.availability : [];

    return <Card.Text className="availability">
        {[...Array(8)].map((n, i) =>
            <button
                disabled={arrayOfYears.includes(baseYear + (i + 1))}
                key={`availability-${i}`}
                onClick={() => setAvailability(baseYear + (i + 1))}
                className={baseYear + (i + 1) === availability ? "selected" : ""}
            >
                {baseYear + (i + 1)}
            </button>
        )}
    </Card.Text>
}
const Unit = ({ data, mode, clickUnit }) => {


    const unitLayout = {
        [UnitConstants.BOOK_UNIT]: [
            Title,
            Rating,
            Description,
            Amenities,
            Availability,
            Price,
        ],
        [UnitConstants.LIST_UNIT]: [
            Title,
            Description,
            Cancellation,
            Price,
            Rating,
        ],
    }
    return (
        <UnitContext.Provider value={{ data, mode }} className={mode}>
            <Card onClick={() => clickUnit(data.id)}>
                <Card.Img variant="top" src={"https://mars.theblueground.net/" + data.pictures[0]} />
                <Card.Body>
                    {/* <Title />
                    <Description />
                    <Cancellation />
                    <Price />
                    <Rating />
                    <Amenities />
                    <Availability /> */}
                    {unitLayout[mode].map(sub => {
                        const Sub = sub;
                        return <Sub key={sub} />
                    })}
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
        isBooked: PropTypes.bool,
    }),
    clickUnit: PropTypes.func,
    mode: PropTypes.string.isRequired,
}
Unit.defaultProps = {
    clickUnit: () => void (0)
}
export default Unit;