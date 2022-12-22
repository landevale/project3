import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import BookingForm from "../components/BookingForm";
import BookingsTable from "../components/BookingsTable";

function Bookings() {
  const { isLoggedIn } = useContext(DataContext);
  const navigate = useNavigate();

  return isLoggedIn ? (
    <>
      <div>
        <h1>Bookings</h1>
      </div>
      <div>
        <BookingForm />
      </div>
      <div>
        <BookingsTable />
      </div>
    </>
  ) : (
    navigate("/")
  );
}

export default Bookings;
