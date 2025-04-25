import React, { useState } from 'react';
import BookingModal from './BookingModal';

function DoctorList({ doctors }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);

  if (!doctors) {
    return <div className="loading">Loading...</div>;
  }

  const handleBooking = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseModal = () => {
    setSelectedDoctor(null);
    if (bookingSuccess) {
      setBookingSuccess(false);
    }
  };

  const handleSubmitBooking = (bookingData) => {
    // In a real application, this would make an API call to save the booking
    console.log('Booking submitted:', bookingData);
    setLastBooking(bookingData);
    setBookingSuccess(true);
    // Close modal after 2 seconds
    setTimeout(() => {
      setSelectedDoctor(null);
      setBookingSuccess(false);
    }, 2000);
  };

  return (
    <div className="doctor-list">
      {doctors.map((doctor, index) => (
        <div key={index} data-testid="doctor-card" className="doctor-card">
          <div className="doctor-info">
            <h2 data-testid="doctor-name">{doctor.name || 'Unknown Doctor'}</h2>
            <p data-testid="doctor-specialty">
              {Array.isArray(doctor.specialties) ? doctor.specialties.join(', ') : 'No specialties listed'}
            </p>
            <p data-testid="doctor-experience">
              {typeof doctor.experience === 'number' ? `${doctor.experience} years exp.` : 'Experience not specified'}
            </p>
            <p data-testid="doctor-fee">
              ₹{typeof doctor.fee === 'number' ? doctor.fee : 'Fee not specified'}
            </p>
            <div className="consultation-types">
              {doctor.videoConsult && <span className="consultation-badge video">Video Consult</span>}
              {doctor.inClinic && <span className="consultation-badge clinic">In-Clinic</span>}
            </div>
          </div>
          <button 
            className="book-appointment"
            onClick={() => handleBooking(doctor)}
          >
            Book Appointment
          </button>
        </div>
      ))}
      {doctors.length === 0 && (
        <div className="no-results">No doctors found matching your criteria</div>
      )}
      
      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={handleCloseModal}
          onSubmit={handleSubmitBooking}
        />
      )}

      {bookingSuccess && (
        <div className="success-modal">
          <div className="success-content">
            <h3>Booking Confirmed!</h3>
            <p>Your appointment has been scheduled with {lastBooking.doctorName}</p>
            <p>Date: {new Date(lastBooking.date).toLocaleDateString()}</p>
            <p>Time: {lastBooking.time}</p>
            <p>Type: {lastBooking.consultationType === 'video' ? 'Video Consultation' : 'In-Clinic Visit'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorList; 