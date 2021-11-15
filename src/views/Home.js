import React, { useState, createContext, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import BookModal from "../components/BookModal";
import LocalStorageService from "../services/localstorage.service";
import UnitsService from "../services/units.service";
import UnitConstants from "../constants/unit.constants";
import Unit from "../components/Unit";

const Home = () => {
  const user = LocalStorageService.getUser();

  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [page, setPage] = useState(1);
  const [bookedUnits, setBookedUnits] = useState([]);


  useEffect(() => {
    UnitsService.listUnits().then(
      (data) => {
        setUnits(data);
      }
    )
  }, [])

  const clickUnit = id => {
    setSelectedUnit(id);
  }
  const handleBook = (id, availability) => {
    UnitsService.bookunit(id, availability).then(
      (data) => {
        setBookedUnits([...bookedUnits, id]);
        handleCloseModal();
      }
    )
  }
  const handleCloseModal = () => {
    setSelectedUnit("");
  }



  return (
    <>
      <div className="row">
        {units.map((unit, i) =>
          <div class="col-md-4 col-xs-6">
            <Unit
              data={{ ...unit, isBooked: bookedUnits.includes(unit.id) }}
              clickUnit={clickUnit}
              mode={UnitConstants.LIST_UNIT}
            />
          </div>
        )}
      </div>
      <BookModal
        id={selectedUnit}
        handleCloseModal={handleCloseModal}
        handleBook={handleBook}
      />
    </>
  );
};

export default Home;
