import '../../styles/appointments.css'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AppointmentsList() {

    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = () => {
        axios.get('http://localhost:4000/customers/1/appointments')
        .then((response) => {
            setAppointments(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log('Error fetching appointments:', error);
        });
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/customers/1/appointments/${id}`)
        .then((response) => {
            console.log('Appointment deleted:', response.data);
            fetchAppointments();
            alert('Appointment deleted!');
        })
        .catch((error) => {
            console.log('Error deleting appointment:', error);
        })
    }

    const handleUpdate = (id) => {
        axios.get(`http://localhost:4000/customers/1/appointments/${id}`)
        .then((response) => {
            const appointmentData = response.data;
            console.log('Appointment to be updated:', appointmentData);
            navigate('/appointments/update', {state :{appointmentData} });
        })
        .catch((error) => {
            console.log('Error finding specified appointment for update:', error);
        })
    }

    return (
        <div className="appointment-list">
            <table className="center">
            <thead>
                <tr>
                <th>Date & Time</th>
                <th>Doctor</th>
                <th>Speciality</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appointment) => (
                <tr key={appointment.id}>
                    <td>{appointment.appointmentDateTime}</td>
                    <td>{appointment.doctor.fullName}</td>
                    <td>{appointment.doctor.speciality}</td>
                    <td><button className='update-button' onClick={() => handleUpdate(appointment.id)}>Update</button></td>
                    <td><button className='delete-button' onClick={() => handleDelete(appointment.id)}>Delete</button></td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}

export default AppointmentsList