import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import "../styles/BookModal.css";
import UnitsService from "../services/units.service";
import UnitConstant from "../constants/unit.constants"

import Unit from "./Unit";

const BookModal = ({ id, handleCloseModal, handleBook }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(null);
        if (id) {
            UnitsService.getUnit(id).then(
                (data) => {
                    setData(data);
                }
            )
        }
    }, [id])

    return (
        <>
            {data &&
                <Modal show={!!id} onHide={handleCloseModal} animation={true}>
                    <Modal.Body>
                        <Unit
                            data={data}
                            mode={UnitConstant.LIST_UNIT}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleBook}>
                            Book
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    )
}

export default BookModal;