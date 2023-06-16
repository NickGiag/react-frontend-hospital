import '../../styles/appointmentForm.css'
import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AppointmentForm() {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
  
    // Options for the doctors dropdown
    const doctorOptions = [
      { value: 'doctor1', label: 'Doctor 1' },
      { value: 'doctor2', label: 'Doctor 2' },
      { value: 'doctor3', label: 'Doctor 3' },
      // Add more doctors as needed
    ];
  
    const handleDoctorChange = (selectedOption) => {
      setSelectedDoctor(selectedOption);
    };
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleTimeChange = (time) => {
      setSelectedTime(time);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Submit the form data to the backend
      // Include selectedDoctor.value, selectedDate, and selectedTime in the request payload
      console.log('Selected Doctor:', selectedDoctor);
      console.log('Selected Date:', selectedDate);
      console.log('Selected Time:', selectedTime);
    };

  return (
    <div className='appointment-form center'>
        <form onSubmit={handleSubmit}>
        <div className='doctor-drop-down center'>
            <label>Doctor:</label>
            <Select
            options={doctorOptions}
            value={selectedDoctor}
            onChange={handleDoctorChange}
            placeholder="Select a doctor"
            READONLY
            />
        </div>
        <div className='date'>
            <label>Date:</label>
            <DatePicker
            className='date-dropdown'
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
            onChange={(e) => setSelectedTime(e.target.value)}
            />
        </div>
        <button type="submit">Create Appointment</button>
        </form>
    </div>
  );
}

export default AppointmentForm;