import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import './App.css';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctors();
    initializeFiltersFromURL();
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handlePopState = () => {
    initializeFiltersFromURL();
  };

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const sampleData = [
        // General Physicians
        {
          id: 1,
          name: "Dr. John Smith",
          specialties: ["General-Physician"],
          experience: 15,
          fee: 500,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 2,
          name: "Dr. Maria Garcia",
          specialties: ["General-Physician"],
          experience: 12,
          fee: 450,
          videoConsult: true,
          inClinic: true
        },
        // Dentists
        {
          id: 3,
          name: "Dr. Sarah Johnson",
          specialties: ["Dentist"],
          experience: 10,
          fee: 600,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 4,
          name: "Dr. David Kumar",
          specialties: ["Dentist"],
          experience: 15,
          fee: 550,
          videoConsult: true,
          inClinic: true
        },
        // Dermatologists
        {
          id: 5,
          name: "Dr. Michael Brown",
          specialties: ["Dermatologist"],
          experience: 20,
          fee: 800,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 6,
          name: "Dr. Lisa Chen",
          specialties: ["Dermatologist"],
          experience: 8,
          fee: 600,
          videoConsult: true,
          inClinic: true
        },
        // Paediatricians
        {
          id: 7,
          name: "Dr. Emily Davis",
          specialties: ["Paediatrician"],
          experience: 12,
          fee: 400,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 8,
          name: "Dr. James Wilson",
          specialties: ["Paediatrician"],
          experience: 18,
          fee: 600,
          videoConsult: true,
          inClinic: true
        },
        // Gynaecologists
        {
          id: 9,
          name: "Dr. Robert Wilson",
          specialties: ["Gynaecologist"],
          experience: 18,
          fee: 700,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 10,
          name: "Dr. Patricia Lee",
          specialties: ["Gynaecologist"],
          experience: 15,
          fee: 650,
          videoConsult: true,
          inClinic: true
        },
        // ENT Specialists
        {
          id: 11,
          name: "Dr. Thomas Anderson",
          specialties: ["ENT"],
          experience: 14,
          fee: 550,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 12,
          name: "Dr. Susan White",
          specialties: ["ENT"],
          experience: 11,
          fee: 500,
          videoConsult: true,
          inClinic: true
        },
        // Cardiologists
        {
          id: 13,
          name: "Dr. Richard Martinez",
          specialties: ["Cardiologist"],
          experience: 22,
          fee: 900,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 14,
          name: "Dr. Jennifer Taylor",
          specialties: ["Cardiologist"],
          experience: 16,
          fee: 800,
          videoConsult: true,
          inClinic: true
        },
        // Psychiatrists
        {
          id: 15,
          name: "Dr. William Turner",
          specialties: ["Psychiatrist"],
          experience: 17,
          fee: 750,
          videoConsult: true,
          inClinic: false
        },
        {
          id: 16,
          name: "Dr. Emma Thompson",
          specialties: ["Psychiatrist"],
          experience: 13,
          fee: 650,
          videoConsult: true,
          inClinic: true
        },
        // Neurologists
        {
          id: 17,
          name: "Dr. Daniel Kim",
          specialties: ["Neurologist"],
          experience: 19,
          fee: 850,
          videoConsult: false,
          inClinic: true
        },
        {
          id: 18,
          name: "Dr. Sarah Patel",
          specialties: ["Neurologist"],
          experience: 14,
          fee: 700,
          videoConsult: true,
          inClinic: true
        },
        // Diabetologists
        {
          id: 19,
          name: "Dr. Mark Anderson",
          specialties: ["Diabetologist"],
          experience: 16,
          fee: 700,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 20,
          name: "Dr. Priya Sharma",
          specialties: ["Diabetologist"],
          experience: 13,
          fee: 600,
          videoConsult: true,
          inClinic: true
        },
        // Physiotherapists
        {
          id: 21,
          name: "Dr. Alex Thompson",
          specialties: ["Physiotherapist"],
          experience: 10,
          fee: 450,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 22,
          name: "Dr. Maya Patel",
          specialties: ["Physiotherapist"],
          experience: 12,
          fee: 500,
          videoConsult: false,
          inClinic: true
        },
        // Endocrinologists
        {
          id: 23,
          name: "Dr. Steven Clark",
          specialties: ["Endocrinologist"],
          experience: 18,
          fee: 800,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 24,
          name: "Dr. Anjali Kumar",
          specialties: ["Endocrinologist"],
          experience: 15,
          fee: 750,
          videoConsult: true,
          inClinic: true
        },
        // Orthopaedics
        {
          id: 25,
          name: "Dr. Robert Chen",
          specialties: ["Orthopaedic"],
          experience: 20,
          fee: 900,
          videoConsult: false,
          inClinic: true
        },
        {
          id: 26,
          name: "Dr. Samantha Lee",
          specialties: ["Orthopaedic"],
          experience: 16,
          fee: 800,
          videoConsult: true,
          inClinic: true
        },
        // Ophthalmologists
        {
          id: 27,
          name: "Dr. David Wilson",
          specialties: ["Ophthalmologist"],
          experience: 17,
          fee: 750,
          videoConsult: false,
          inClinic: true
        },
        {
          id: 28,
          name: "Dr. Neha Gupta",
          specialties: ["Ophthalmologist"],
          experience: 14,
          fee: 650,
          videoConsult: true,
          inClinic: true
        },
        // Gastroenterologists
        {
          id: 29,
          name: "Dr. Michael Lee",
          specialties: ["Gastroenterologist"],
          experience: 19,
          fee: 850,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 30,
          name: "Dr. Riya Shah",
          specialties: ["Gastroenterologist"],
          experience: 15,
          fee: 750,
          videoConsult: true,
          inClinic: true
        },
        // Pulmonologists
        {
          id: 31,
          name: "Dr. Christopher Brown",
          specialties: ["Pulmonologist"],
          experience: 18,
          fee: 800,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 32,
          name: "Dr. Aisha Khan",
          specialties: ["Pulmonologist"],
          experience: 14,
          fee: 700,
          videoConsult: true,
          inClinic: true
        },
        // Urologists
        {
          id: 33,
          name: "Dr. William Parker",
          specialties: ["Urologist"],
          experience: 21,
          fee: 900,
          videoConsult: false,
          inClinic: true
        },
        {
          id: 34,
          name: "Dr. Rahul Verma",
          specialties: ["Urologist"],
          experience: 16,
          fee: 800,
          videoConsult: true,
          inClinic: true
        },
        // Dietitian/Nutritionists
        {
          id: 35,
          name: "Dr. Emily White",
          specialties: ["Dietitian-Nutritionist"],
          experience: 12,
          fee: 500,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 36,
          name: "Dr. Deepa Mehta",
          specialties: ["Dietitian-Nutritionist"],
          experience: 10,
          fee: 450,
          videoConsult: true,
          inClinic: true
        },
        // Psychologists
        {
          id: 37,
          name: "Dr. Rachel Green",
          specialties: ["Psychologist"],
          experience: 15,
          fee: 700,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 38,
          name: "Dr. Arjun Kapoor",
          specialties: ["Psychologist"],
          experience: 12,
          fee: 600,
          videoConsult: true,
          inClinic: false
        },
        // Sexologists
        {
          id: 39,
          name: "Dr. Andrew Miller",
          specialties: ["Sexologist"],
          experience: 16,
          fee: 800,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 40,
          name: "Dr. Pooja Singh",
          specialties: ["Sexologist"],
          experience: 13,
          fee: 700,
          videoConsult: true,
          inClinic: true
        },
        // Nephrologists
        {
          id: 41,
          name: "Dr. James Cooper",
          specialties: ["Nephrologist"],
          experience: 19,
          fee: 850,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 42,
          name: "Dr. Meera Reddy",
          specialties: ["Nephrologist"],
          experience: 15,
          fee: 750,
          videoConsult: true,
          inClinic: true
        },
        // Oncologists
        {
          id: 43,
          name: "Dr. Thomas Wright",
          specialties: ["Oncologist"],
          experience: 22,
          fee: 950,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 44,
          name: "Dr. Sanjana Desai",
          specialties: ["Oncologist"],
          experience: 18,
          fee: 850,
          videoConsult: true,
          inClinic: true
        },
        // Ayurveda
        {
          id: 45,
          name: "Dr. Rajesh Kumar",
          specialties: ["Ayurveda"],
          experience: 20,
          fee: 600,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 46,
          name: "Dr. Anita Sharma",
          specialties: ["Ayurveda"],
          experience: 16,
          fee: 500,
          videoConsult: true,
          inClinic: true
        },
        // Homeopaths
        {
          id: 47,
          name: "Dr. Vikram Malhotra",
          specialties: ["Homeopath"],
          experience: 17,
          fee: 450,
          videoConsult: true,
          inClinic: true
        },
        {
          id: 48,
          name: "Dr. Sunita Joshi",
          specialties: ["Homeopath"],
          experience: 14,
          fee: 400,
          videoConsult: true,
          inClinic: true
        }
      ];

      setDoctors(sampleData);
      setFilteredDoctors(sampleData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError('Failed to load doctors data. Please try again later.');
      setIsLoading(false);
    }
  };

  const initializeFiltersFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    setSearchTerm(params.get('search') || '');
    setConsultationType(params.get('consultation') || '');
    setSelectedSpecialties((params.get('specialties') || '').split(',').filter(Boolean));
    setSortBy(params.get('sort') || '');
  };

  const updateURL = (filters) => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.consultation) params.set('consultation', filters.consultation);
    if (filters.specialties.length) params.set('specialties', filters.specialties.join(','));
    if (filters.sort) params.set('sort', filters.sort);
    
    const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({}, '', newURL);
  };

  const applyFilters = () => {
    if (!doctors.length) return;

    let filtered = [...doctors];

    // 1. Consultation type filter
    if (consultationType) {
      filtered = filtered.filter(doctor => {
        if (consultationType === 'video') return doctor.videoConsult;
        if (consultationType === 'clinic') return doctor.inClinic;
        return true;
      });
    }

    // 2. Specialties filter
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(doctor =>
        selectedSpecialties.some(specialty => 
          doctor.specialties.includes(specialty)
        )
      );
    }

    // 3. Search filter (applied after other filters)
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchLower) ||
        doctor.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchLower)
        )
      );
    }

    // 4. Sorting
    if (sortBy === 'fees') {
      filtered.sort((a, b) => a.fee - b.fee);
    } else if (sortBy === 'experience') {
      filtered.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(filtered);
    updateURL({
      search: searchTerm,
      consultation: consultationType,
      specialties: selectedSpecialties,
      sort: sortBy
    });
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, consultationType, selectedSpecialties, sortBy]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Find a Doctor</h1>
        <p>Search and book appointments with the best doctors in your area</p>
      </header>

      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        doctors={doctors}
      />

      <div className="main-content">
        <FilterPanel
          consultationType={consultationType}
          setConsultationType={setConsultationType}
          selectedSpecialties={selectedSpecialties}
          setSelectedSpecialties={setSelectedSpecialties}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        {isLoading ? (
          <div className="loading">Loading doctors...</div>
        ) : (
          <DoctorList doctors={filteredDoctors} />
        )}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>We connect patients with the best doctors in their area. Our platform makes it easy to find and book appointments with healthcare providers.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Find a Doctor</a></li>
              <li><a href="#">Book Appointment</a></li>
              <li><a href="#">Specialties</a></li>
              <li><a href="#">Consultation Types</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: support@doctorbooking.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Medical Center Dr, Healthcare City</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Doctor Booking Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 