import  { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './tailwind.css'; // Import Tailwind CSS file

const NavigationBar = () => {
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numRooms, setNumRooms] = useState(1);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  // Local list of suggestions
  const localSuggestions = ['New York', 'Los Angeles', 'London', 'Paris', 'Tokyo'];

  const handleDestinationChange = (event) => {
    const value = event.target.value;
    setDestination(value);

    // Filter suggestions based on user input
    const filteredSuggestions = localSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions.slice(0, 5)); // Show up to 5 suggestions
  };

  const handleSearch = () => {
    console.log('Searching...');
    console.log('Destination:', destination);
    console.log('Check-in Date:', checkInDate);
    console.log('Check-out Date:', checkOutDate);
    console.log('Number of Rooms:', numRooms);
    console.log('Number of Adults:', numAdults);
    console.log('Number of Children:', numChildren);
  };

  // Get today's date
  const today = new Date();

  // Get date one year from now
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 1);

  return (
    <div className="flex justify-around items-center p-4 bg-gray-100">
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={handleDestinationChange}
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => setDestination(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <DatePicker
        selected={checkInDate}
        onChange={(date) => setCheckInDate(date)}
        placeholderText="Check-in Date"
        dateFormat="MM/dd/yyyy"
        minDate={today}
        maxDate={maxDate}
        selectsStart
        startDate={checkInDate}
        endDate={checkOutDate}
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
      />
      <DatePicker
        selected={checkOutDate}
        onChange={(date) => setCheckOutDate(date)}
        placeholderText="Check-out Date"
        dateFormat="MM/dd/yyyy"
        minDate={checkInDate || today}
        maxDate={maxDate}
        selectsEnd
        startDate={checkInDate}
        endDate={checkOutDate}
        disabled={!checkInDate}
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
      />
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
          onClick={() => setShowGuestDropdown(!showGuestDropdown)}
        >
          Guests: {numAdults} Adult(s), {numChildren} Child(ren), {numRooms} Room(s)
        </button>
        {showGuestDropdown && (
          <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div>Adults</div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="text-sm text-gray-500"
                    onClick={() => setNumAdults(Math.max(numAdults - 1, 1))}
                    disabled={numAdults === 1}
                  >
                    -
                  </button>
                  <div className="mx-2">{numAdults}</div>
                  <button
                    type="button"
                    className="text-sm text-gray-500"
                    onClick={() => setNumAdults(numAdults + 1)}
                    disabled={numRooms === 1 && numAdults >= 2}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>Children</div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="text-sm text-gray-500"
                    onClick={() => setNumChildren(Math.max(numChildren - 1, 0))}
                  >
                    -
                  </button>
                  <div className="mx-2">{numChildren}</div>
                  <button
                    type="button"
                    className="text-sm text-gray-500"
                    onClick={() => setNumChildren(numChildren + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>Rooms</div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="text-sm text-gray-500"
                    onClick={() => setNumRooms(Math.max(numRooms - 1, 1))}
                    disabled={numRooms === 1}
                  >
                    -
                  </button>
                  <div className="mx-2">{numRooms}</div>
                  <button
                    type="button"
                    className="text-sm text-gray-500"
                    onClick={() => setNumRooms(numRooms + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => setShowGuestDropdown(false)}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
      <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Search
      </button>
    </div>
  );
};

export default NavigationBar;
