import React from 'react';

const specialties = [
  'General-Physician', 'Dentist', 'Dermatologist', 'Paediatrician',
  'Gynaecologist', 'ENT', 'Diabetologist', 'Cardiologist',
  'Physiotherapist', 'Endocrinologist', 'Orthopaedic', 'Ophthalmologist',
  'Gastroenterologist', 'Pulmonologist', 'Psychiatrist', 'Urologist',
  'Dietitian-Nutritionist', 'Psychologist', 'Sexologist', 'Nephrologist',
  'Neurologist', 'Oncologist', 'Ayurveda', 'Homeopath'
];

function FilterPanel({
  consultationType,
  setConsultationType,
  selectedSpecialties,
  setSelectedSpecialties,
  sortBy,
  setSortBy
}) {
  const handleSpecialtyChange = (specialty) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const handleConsultationTypeChange = (type) => {
    if (consultationType === type) {
      setConsultationType('');
    } else {
      setConsultationType(type);
    }
  };

  const handleSortChange = (type) => {
    if (sortBy === type) {
      setSortBy('');
    } else {
      setSortBy(type);
    }
  };

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3 data-testid="filter-header-moc">Mode of Consultation</h3>
        <div>
          <label>
            <input
              type="radio"
              data-testid="filter-video-consult"
              checked={consultationType === 'video'}
              onChange={() => handleConsultationTypeChange('video')}
            />
            Video Consultation
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              data-testid="filter-in-clinic"
              checked={consultationType === 'clinic'}
              onChange={() => handleConsultationTypeChange('clinic')}
            />
            In-clinic Consultation
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h3 data-testid="filter-header-speciality">Specialities</h3>
        {specialties.map(specialty => (
          <div key={specialty}>
            <label>
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty}`}
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
              />
              {specialty.replace(/-/g, '/')}
            </label>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3 data-testid="filter-header-sort">Sort By</h3>
        <div>
          <label>
            <input
              type="radio"
              data-testid="sort-fees"
              checked={sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
            />
            Fees (Low to High)
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              data-testid="sort-experience"
              checked={sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
            />
            Experience (High to Low)
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel; 