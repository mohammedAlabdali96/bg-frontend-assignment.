import React, { useState, createContext, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import UnitModal from "../components/UnitModal";

import LocalStorageService from "../services/localstorage.service";
import UnitsService from "../services/units.service";
import Unit from "../components/Unit";

const Home = () => {
  const user = LocalStorageService.getUser();

  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [page, setPage] = useState(1);

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
  const handleBook = id => {

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
              key={unit.id ? unit.id : i}
              data={unit}
            />
          </div>
        )}
      </div>
      <UnitModal
        id={selectedUnit}
        handleCloseModal={handleCloseModal}
        handleBook={handleBook}
      />
    </>
  );
};

export default Home;
