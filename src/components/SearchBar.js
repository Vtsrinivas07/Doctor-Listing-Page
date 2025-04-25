import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, doctors }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate suggestions based on current search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    
    // Get unique specialties from doctors
    const allSpecialties = [...new Set(doctors.flatMap(doctor => doctor.specialties))];
    
    // Filter specialties that match the search term
    const matchingSpecialties = allSpecialties.filter(specialty => 
      specialty.toLowerCase().includes(searchLower)
    );
    
    // Get doctor names that match the search term
    const matchingDoctors = doctors
      .filter(doctor => doctor.name.toLowerCase().includes(searchLower))
      .map(doctor => doctor.name);
    
    // Combine and limit suggestions
    const combinedSuggestions = [...matchingSpecialties, ...matchingDoctors].slice(0, 5);
    setSuggestions(combinedSuggestions);
  }, [searchTerm, doctors]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <input
        type="text"
        className="search-input"
        placeholder="Search by doctor name or specialty..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 