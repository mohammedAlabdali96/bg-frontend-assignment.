import React from "react";
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

import "../styles/unit.css";



const Unit = ({ data }) => (
    <Card>
        <Card.Img variant="top" src="dfdf" />
        <Card.Body>
            <Card.Title className="text-bold">name</Card.Title>
            <Card.Text>description</Card.Text>
            <Card.Title className="text-bold">region</Card.Title>
            <Card.Text>description</Card.Text>
            <Card.Text>cancellation</Card.Text>
            <Card.Text>BTC</Card.Text>
            {[1, 2, 3, 4, 5].map(n =>
                <span
                    className={`fa fa-star ${n > data.rating ? "" : "checked"}`}
                    key={`rating-${n}`}
                />
            )}
        </Card.Body>
    </Card>
)


Unit.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        region: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        cancellation: PropTypes.string,
        rating: PropTypes.number.isRequired,
        pictures: PropTypes.array
    })
}

export default Unit;
