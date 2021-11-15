import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import "../styles/BookModal.css";
import UnitsService from "../services/units.service";
import UnitConstants from "../constants/unit.constants";

import Unit from "./Unit";

const BookModal = ({ id, handleCloseModal, handleBook }) => {
    const [data, setData] = useState(null);
    const [availability, setAvailability] = useState(null);

    useEffect(() => {
        setData(null);
        setAvailability(null);
        if (id) {
            UnitsService.getUnit(id).then(
                (data) => {
                    setData(data);
                })
        }
    }, [id])

    return (
        <>

            <Modal show={!!id} onHide={handleCloseModal} animation={true}>
                <Modal.Body>
                    {data && <Unit
                        data={data}
                        mode={UnitConstants.BOOK_UNIT}
                        availability={availability}
                        setAvailability={setAvailability}
                    />
                    }

                </Modal.Body>
                <Modal.Footer>
                    {data ? <Button variant="primary" onClick={() => handleBook(id, availability)} disabled={!availability}>
                        Book
                    </Button>
                        : <span className="spinner-border spinner-border-lg"></span>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BookModal;