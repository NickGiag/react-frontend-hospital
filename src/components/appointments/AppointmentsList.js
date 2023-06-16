import '../../styles/appointments.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AppointmentsList() {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Fetch appointments from the backend
        axios.get('http://localhost:4000/customer/1/appointments')
        .then((response) => {
            // setAppointments(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log('Error fetching appointments:', error);
        });
    }, []);


    return (
        <div className="appointment-list">
            <table className='center'>
            <thead>
                <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Name</th>
                <th>Username</th>
                <th>Type</th>
                <th>Specialty</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appointment) => (
                <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.user.name}</td>
                    <td>{appointment.user.username}</td>
                    <td>{appointment.user.type}</td>
                    <td>{appointment.user.specialty}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}

export default AppointmentsList