import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import axios from 'axios';

function AppointmentUpdate() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const appointmentData = location.state?.appointmentData;

  useEffect(() => {
    axios.get('http://localhost:4000/doctors')
    .then((response) => {
        setDoctors(response.data);
        console.log(response.data);
    })
    .catch((error) => {
        console.log('Error fetching doctors:', error);
    });

    if (appointmentData) {
      setSelectedDoctor({
        value: appointmentData.doctor.id,
        label: appointmentData.doctor.name + '  /  ' + appointmentData.doctor.speciality
      });
      
      const [date, time] = appointmentData.appointmentDateTime.split(' ');
      const formattedTime = time;

      setSelectedDate(new Date(date));
      setSelectedTime(formattedTime);
    }
  }, [appointmentData]);

  const doctorOptions = doctors.map((doctor) => ({
    value: doctor.id,
    label: doctor.name + '  /  ' + doctor.speciality,
  }));

  const handleDoctorChange = (selectedOption) => {
    setSelectedDoctor(selectedOption);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestData = {
      doctor: {
        id: selectedDoctor.value,
        name: selectedDoctor.name,
        speciality: selectedDoctor.speciality,
      },
      appointmentDateTime: format(selectedDate, 'yyyy-MM-dd') + ' ' + selectedTime,
    };

    const appointmentId = appointmentData.id;

    axios.put(`http://localhost:4000/customers/1/appointments/${appointmentId}`, requestData)
    .then((response) => {
        console.log('Appointment updated:', response.data);
        alert('Appointment updated successfully');
        navigate('/appointments')
    })
    .catch((error) => {
        console.log('Error updating appointment:', error);
    });


    console.log('Selected Doctor:', selectedDoctor);
    console.log('Selected Date:', format(selectedDate, 'yyyy-MM-dd'));
    console.log('Selected Time:', selectedTime);

    
  };

  return (
    <div className="appointment-form center">
      <form onSubmit={handleSubmit}>
        <div className="doctor-drop-down center">
          <label>Doctor:</label>
          <Select
            options={doctorOptions}
            value={selectedDoctor}
            onChange={handleDoctorChange}
            placeholder="Select a doctor"
            readOnly
          />
        </div>
        <div className="date">
          <label>Date:</label>
          <DatePicker
            className="date-dropdown"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(formatTimeTo24Hour(e.target.value))}
          />
        </div>
        <button type="submit">
          {appointmentData ? 'Update Appointment' : 'Create Appointment'}
        </button>
      </form>
    </div>
  );
}

export default AppointmentUpdate;

function formatTimeTo24Hour(time) {
  if (!time || !time.includes(':')) {
    return ''; // Return empty string for invalid time values
  }

  const [hour, minute] = time.split(':');
  let hourNumber = parseInt(hour, 10);

  if (hourNumber < 12 && time.includes('PM')) {
    hourNumber += 12;
  }

  const formattedHour = hourNumber.toString().padStart(2, '0');

  return `${formattedHour}:${minute}`;
}