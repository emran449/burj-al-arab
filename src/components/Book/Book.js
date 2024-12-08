import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Bookings from '../Bookings/Bookings';


const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [value, setValue] = useState({
      checkIn: dayjs(new Date()),
      checkOut: dayjs(new Date()).add(1, 'day')
    });

    const handleBooking = () => {
      const newBooking = {...loggedInUser, ...value};
      console.log(newBooking);
      fetch('http://localhost:5000/addBooking', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newBooking)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Hello, {loggedInUser.name}! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Uncontrolled picker"
          value={value.checkIn}
          onChange={(newValue) => setValue({...value, checkIn: newValue })}
             />
        <DatePicker
          label="Controlled picker"
          value={value.checkOut}
          onChange={(newValue) => setValue({...value, checkOut: newValue })}
        />
      </DemoContainer>
      <Button variant="contained" onClick={handleBooking}>Book Now</Button>
    </LocalizationProvider>
    <Bookings></Bookings>
        </div>
    );
};

export default Book;