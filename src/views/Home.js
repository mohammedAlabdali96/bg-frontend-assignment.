import React, { useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';


import "../styles/Home.css"
import BookModal from "../components/BookModal";
import UnitsService from "../services/units.service";
import UnitConstants from "../constants/unit.constants";
import Unit from "../components/Unit";

const UNITS_PER_PAGE = 12;

const Home = () => {
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [bookedUnits, setBookedUnits] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);

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

  const handleLoadMore = pagenum => {
    UnitsService.listUnits(pagenum, UNITS_PER_PAGE).then(
      (data) => {
        setUnits([...units, ...data.data]);
        setHasNextPage(data.meta.totalCount > (pagenum - 1) * UNITS_PER_PAGE);
      }
    )
  }
  return (
    <>
      <InfiniteScroll
        pageStart={1}
        loadMore={handleLoadMore}
        hasMore={hasNextPage}
      >
        <div className="row">
          {units.map((unit, i) =>
            <div className="col-lg-3 col-md-6" key={unit.id ? unit.id : i}>
              <Unit
                data={{ ...unit, isBooked: bookedUnits.includes(unit.id) }}
                clickUnit={() => setSelectedUnit(unit.id)}
                mode={UnitConstants.LIST_UNIT}
              />
            </div>
          )}
        </div>
      </InfiniteScroll>
      <BookModal
        id={selectedUnit}
        handleCloseModal={handleCloseModal}
        handleBook={handleBook}
      />
    </>
  );
};

export default Home;
