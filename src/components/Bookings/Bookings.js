import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data));
    }, [])
    return (
        <div>
            <h3>You have: {bookings.length} bookings</h3>
            {
                bookings.map(booking => (
                    <div key={booking._id}>
                        <h4>Name: {booking.name}</h4>
                        <p>Email: {booking.email}</p>
                        <p>From: {booking.checkIn}</p>
                        <p>To: {booking.checkOut}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default Bookings;