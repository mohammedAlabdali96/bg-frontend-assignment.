import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import UnitsService from "../services/units.service";


const UnitModal = ({id, handleCloseModal, handleBook}) => {
    const [data, setData] = useState({});
    useEffect( () => {
        id && UnitsService.getUnit(id).then(
          (data) => {
            setData(data);
          }
        )
    }, [])

    return (
        <Modal show={!!id} onHide={handleCloseModal} animation={true}>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleBook}>
                    Book
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UnitModal;
