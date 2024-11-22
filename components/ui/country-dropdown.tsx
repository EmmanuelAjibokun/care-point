import React, { useState } from 'react';

type Country = {
  code: string;
  name: string;
};

type CountryDropdownProps = {
  countries: Country[];
  onSelect: (countryCode: string) => void;
};

const CountryDropdown: React.FC<CountryDropdownProps> = ({ countries, onSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = event.target.value;
    setSelectedCountry(selectedCode);
    onSelect(selectedCode);
  };

  return (
    <div className="country-dropdown">
      <label htmlFor="country-selector" className="block text-sm font-medium text-gray-700">
        Select Country
      </label>
      <select
        id="country-selector"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        value={selectedCountry}
        onChange={handleSelect}
      >
        <option value="">-- Choose a Country --</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdown;
