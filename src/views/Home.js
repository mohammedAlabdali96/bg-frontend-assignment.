import React, { useState, createContext, useEffect } from "react";
import LocalStorageService from "../services/localstorage.service";
import UnitsService from "../services/units.service";
import Unit from "../components/Unit";

const Home = () => {
  const user = LocalStorageService.getUser();

  const [units, setUnits] = useState([]);
  const [page, setPage] = useState(1);

  useEffect( () => {
    UnitsService.listUnits().then(
      (data) => {
        setUnits(data);
      }
    )
  }, [])
  


  return (
    <>
    <div className="row">
        {units.map( (unit, i) =>
          <div class="col-md-4 col-xs-6">
            <Unit 
              key= {unit.id ? unit.id : i}
              data={unit} 
            />
          </div>
        )}
    </div>
  </>
  );
};

export default Home;
