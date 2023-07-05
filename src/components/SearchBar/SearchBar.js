// Importer les modules nécessaires
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { TbCircle } from 'react-icons/tb';
import {
  BsFillGeoAltFill, BsChevronUp, BsCheckLg, BsChevronDown, BsPlusCircle, BsDashCircle, BsCalendar,
} from 'react-icons/bs';
import { FaExchangeAlt } from 'react-icons/fa';
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import enGB from 'date-fns/locale/en-GB';

registerLocale('en-GB', enGB);
// Définir le composant SearchBar
function SearchBar() {
  // Initialisation des états
  // Les valeurs des champs de recherches
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  // Les Dates
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState();
  // Les menus déroulants
  const [dropdown1, setDropdown1] = useState('One-way');
  const [dropdown2, setDropdown2] = useState('Dropdown2');
  // Les compteurs
  const [adultCount, setAdultCount] = useState(0);
  const [youthCount, setYouthCount] = useState(0);
  const [seniorCount, setSeniorCount] = useState(0);
  // Le button de switch
  const [accommodationSwitch, setAccommodationSwitch] = useState(false);
  // Initialisation des résultats d'autocomplétion pour les champs "From" et "To"
  const [autocompleteResultsFrom, setautocompleteResultsFrom] = useState([]);
  const [autocompleteResultsTo, setautocompleteResultsTo] = useState([]);
  const [popularCitiesResults, setPopularCitiesResults] = useState([]);
  // Status des menus déroulents pour savoir lequel on souhaite afficher
  const [dropdownStatus, setDropdownStatus] = useState(''); // "none", "autocomplete", "PopularTo" "dropdown1" "dropdown2"
  const [addReturnClicked, setAddReturnClicked] = useState(false);

  // stocker les résultats de l'API concernant l'autocomplétion
  const fetchAutocompleteResults = async (query, setResult) => {
    try {
      const response = await axios.get(`https://api.comparatrip.eu/cities/autocomplete/?q=${query}`);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // stocker les résultats de l'API concernant les destinations populaires
  const fetchPopularCities = async (from) => {
    try {
      const response = await axios.get(`https://api.comparatrip.eu/cities/popular/from/${from}/5`);
      setPopularCitiesResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Utilisation de useEffect pour mettre à jour le nombre de passagers
  useEffect(() => {
    const totalPassengers = adultCount + youthCount + seniorCount;
    setDropdown2(`${totalPassengers} Passengers, No discount card`);
  }, [adultCount, youthCount, seniorCount]);

  // exécuter l'autocomplétion dès le premier caractère
  useEffect(() => {
    if (from.length >= 1) {
      fetchAutocompleteResults(from, setautocompleteResultsFrom);
    }

    if (to.length >= 1) {
      fetchAutocompleteResults(to, setautocompleteResultsTo);
    }
  }, [from, to]);

  useEffect(() => {
    if (dropdown1 === 'One-way') {
      setReturnDate(null);
    }
  }, [dropdown1]);

  // Rendu du composant
  return (

    // Début de la div principale
    <div className="w-full h-screen flex items-center justify-center " style={{ background: 'linear-gradient(180deg, #81A5D5 50%, #F1F2F6 50%)' }}>
      "
      <div className="absolute z-10 w-full h-full bg-gradient-to-b from-transparent to-[#F1F2F6]" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }} />
      <div className="bg-white py-5 px-10 rounded-lg shadow-lg z-20">
        {/* Début du menu déroulant 1 */}
        <div className="mb-4 flex flex-row relative z-10">
          {/* Début du composant qui affiche et gère le menu déroulant */}
          <div
            tabIndex="0"

            onClick={() => (dropdownStatus === 'dropdown1' ? setDropdownStatus(null) : setDropdownStatus('dropdown1'))}
            className="cursor-pointer text-gray-700 mr-3 text-sm"
          >
            <div className="font-medium flex items-center">
              <p>{dropdown1}</p>
              {dropdownStatus === 'dropdown1'
                ? <BsChevronUp className="pl-1 w-5" onClick={(event) => { setDropdownStatus(null); }} />
                : <BsChevronDown className="pl-1 w-5" onClick={(event) => { setDropdownStatus('dropdown1'); }} />}
            </div>
            {/* Contenu du menu déroulant 1 */}
            {dropdownStatus === 'dropdown1' && (
              <div className="rounded-lg bg-white shadow-lg py-1 mt-1 absolute left-0 p-2 text-base">
                <div onClick={() => { setDropdown1('One-way'); setDropdownStatus(null); }} className="flex items-center relative px-3 py-1 hover:bg-gray-200 cursor-pointer">
                  {dropdown1 === 'One-way' && <BsCheckLg className="absolute left-0 text-blue-500 w-10" />}
                  <p className={dropdown1 === 'One-way' ? 'font-bold pl-6' : 'pl-6'}>One-way</p>
                </div>
                <div onClick={() => { setDropdown1('Round trip'); setDropdownStatus(null); }} className="flex items-center relative px-3 py-1 hover:bg-gray-200 cursor-pointer">
                  {dropdown1 === 'Round trip' && <BsCheckLg className="absolute left-0 text-blue-500 w-10" />}
                  <p className={dropdown1 === 'Round trip' ? 'font-bold pl-6' : 'pl-6'}>Round trip</p>
                </div>
              </div>
            )}
          </div>
          {/* Fin du composant qui affiche et gère le menu déroulant 1 */}
          {/* Début du menu déroulant 2 */}
          <div
            tabIndex="0"
            onClick={() => (dropdownStatus === 'dropdown2' ? setDropdownStatus(null) : setDropdownStatus('dropdown2'))}
            className="cursor-pointer text-gray-700 text-sm "
          >
            <div className="font-medium flex items-center">
              <p>{dropdown2}</p>
              {dropdownStatus === 'dropdown2'
                ? <BsChevronUp className="pl-1 w-5" onClick={(event) => { setDropdownStatus(null); }} />
                : <BsChevronDown className="pl-1 w-5" onClick={(event) => { setDropdownStatus('dropdown2'); }} />}
            </div>
            {/* Contenu du menu déroulant 2 */}
            {dropdownStatus === 'dropdown2' && (
              <div className="bg-white shadow-xl py-1 mt-1 absolute left-0 ml-12 p-5 z-10">
                {/* Chaque bloc correspond à un groupe d'âge */}
                <div className=" bg-white shadow-xl py-1 mt-1 absolute left-0 ml-12 p-5 z-10">
                  {/* Chaque bloc correspond à un groupe d'âge */}
                  <div className="flex justify-between items-center border-b-2 px-3 py-1">
                    <div className="">
                      <p className="font-bold">Adult</p>
                      <p className="text-xs text-slate-400">26+ years</p>
                    </div>
                    <div className="flex items-center p-3">
                      {/* Bouton pour diminuer le nombre d'adultes */}
                      <button onClick={(event) => { event.stopPropagation(); if (adultCount > 0) { setAdultCount(adultCount - 1); } }} className=" flex items-center justify-center bg-white text-xl font-bold">
                        <BsDashCircle size={30} className=" text-blue-600" />
                      </button>
                      <p className=" mx-3 text-lg">{adultCount}</p>
                      {/* Bouton pour augmenter le nombre d'adultes */}
                      <button onClick={(event) => { event.stopPropagation(); setAdultCount(adultCount + 1); }} className=" flex items-center justify-center bg-white text-xl font-bold">
                        <BsPlusCircle size={30} className=" text-blue-600" />
                      </button>
                    </div>
                  </div>
                  {/* Bloc pour le groupe d'âge 'Youth' */}
                  <div className="flex justify-between items-center border-b-2 px-3 py-1">
                    <div>
                      <p className="font-bold">Youth</p>
                      <p className="text-xs text-slate-400">0-25 years</p>
                    </div>
                    <div className="flex items-center p-3">
                      <button onClick={(event) => { event.stopPropagation(); if (youthCount > 0) { setYouthCount(youthCount - 1); } }} className="flex items-center justify-center bg-white text-xl font-bold"><BsDashCircle size={30} className=" text-blue-600" /></button>
                      <p className=" mx-3 text-lg">{youthCount}</p>
                      <button onClick={(event) => { event.stopPropagation(); setYouthCount(youthCount + 1); }} className="flex items-center justify-center bg-white text-xl font-bold"><BsPlusCircle size={30} className=" text-blue-600" /></button>
                    </div>
                  </div>
                  {/* Bloc pour le groupe d'âge 'Senior' */}
                  <div className="flex justify-between items-center border-b-2 px-3 py-1">
                    <div>
                      <p className="font-bold">Senior</p>
                      <p className="text-xs text-slate-400">58+ years</p>
                    </div>
                    <div className="flex items-center p-3">
                      <button onClick={(event) => { event.stopPropagation(); if (seniorCount > 0) { setSeniorCount(seniorCount - 1); } }} className="flex items-center justify-center bg-white text-xl font-bold"><BsDashCircle size={30} className=" text-blue-600" /></button>
                      <p className=" mx-3 text-lg">{seniorCount}</p>
                      <button onClick={(event) => { event.stopPropagation(); setSeniorCount(seniorCount + 1); }} className="flex items-center justify-center bg-white text-xl font-bold"><BsPlusCircle size={30} className=" text-blue-600" /></button>
                    </div>
                  </div>
                  <p className="px-3 pt-3 cursor-pointer">Add discount card</p>
                  <div className="px-3 py-1 mx-5 my-5 bg-[#fff7ed] border-red-600 border">
                    <p className=" text-base font-medium text-red-700 w-max">
                      Please select your journey before
                      <br />
                      {' '}
                      adding discount cards.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Les deux champs de recherche et les deux champs des dates */}
        <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 space-y-2 lg:space-y-0">
          <div className="flex flex-col relative">
            <TbCircle className="absolute text-gray-500 top-1/2 left-3 transform -translate-y-1/2" />
            <input
              type="text"
              value={from}
              placeholder="From: City, Station Or Airport"
              onChange={(e) => {
                setFrom(e.target.value);
                if (e.target.value !== '') {
                  fetchAutocompleteResults(e.target.value, setautocompleteResultsFrom);
                  setDropdownStatus('autocompleteFrom');
                }
              }}
              onFocus={() => setDropdownStatus('none')} // hide all dropdowns when the field is focused
              onBlur={() => setTimeout(() => setDropdownStatus('none'), 100)} // hide all dropdowns when the field loses focus
              className="rounded-lg  bg-[#F1F2F6] py-3 pl-8 pr-10 w-80 lg:w-64 border-2 border-transparent hover:border-gray-400"
            />
            <FaExchangeAlt
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-blue-600"
              onClick={() => {
                const temp = from;
                setFrom(to);
                setTo(temp);
              }}
            />

            {dropdownStatus === 'autocompleteFrom' && (
              <ul className="bg-white absolute left-0 top-full max-h-80 mt-2 w-fit z-10 shadow-inner overflow-y-scroll max-w-sm overflow-x-hidden">
                {autocompleteResultsFrom.map((result) => (
                  <div
                    key={result.unique_name}
                    className="flex items-center relative hover:bg-gray-100 transition-colors duration-200 text-normal p-3 whitespace-nowrap cursor-pointer"
                    onClick={() => {
                      setFrom(result.local_name);
                      setDropdownStatus('none'); // hide the dropdown after a result is clicked
                    }}
                  >
                    <BsFillGeoAltFill className=" text-gray-500 ml-3 absolute" />
                    <span className="pl-8">
                      {result.local_name}
                    </span>
                  </div>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col relative">
            <BsFillGeoAltFill className="absolute text-gray-500 top-1/2 left-3 transform -translate-y-1/2" />
            <input
              type="text"
              value={to}
              placeholder="To: City, Station Or Airport"
              onChange={(e) => {
                setTo(e.target.value);
                if (e.target.value !== '') {
                  fetchAutocompleteResults(e.target.value, setautocompleteResultsTo);
                  setDropdownStatus('autocompleteTo');
                }
              }}
              onClick={() => {
                if (from !== '' && to === '') {
                  fetchPopularCities(from);
                  setDropdownStatus('PopularTo');
                }
              }}
              onBlur={() => setTimeout(() => setDropdownStatus('none'), 100)} // hide all dropdowns when the field loses focus
              className="rounded-lg bg-[#F1F2F6] py-3 pl-8 w-80 lg:w-64 border-2 border-transparent hover:border-gray-400"
            />

            {dropdownStatus === 'autocompleteTo' && (
              <ul className="bg-white absolute left-0 top-full max-h-60 mt-2 w-fit z-10 shadow-inner overflow-y-scroll max-w-sm overflow-x-hidden">
                {autocompleteResultsTo.map((result) => (
                  <div
                    key={result.unique_name}
                    className="flex items-center relative hover:bg-gray-100 transition-colors duration-200 text-normal p-3 whitespace-nowrap cursor-pointer"
                    onClick={() => {
                      setTo(result.local_name);
                      setDropdownStatus('none'); // hide the dropdown after a result is clicked
                    }}
                  >
                    <BsFillGeoAltFill className=" text-gray-500 ml-3 absolute" />
                    <span className="pl-8">
                      {result.local_name}
                    </span>
                  </div>
                ))}
              </ul>
            )}
            {dropdownStatus === 'PopularTo' && (
              <ul className="bg-white absolute left-0 top-full max-h-80 mt-2 w-fit z-10 shadow-inner overflow-y-scroll max-w-sm overflow-x-hidden">
                <li className="p-2 text-xs pl-3 bg-slate-100 text-slate-400 font-semibold">POPULAR DESTINATIONS</li>
                {popularCitiesResults.map((city) => (
                  <div className=" flex items-center relative">
                    <BsFillGeoAltFill className=" text-gray-500 ml-3 absolute" />
                    <li
                      key={city.unique_name}
                      className="hover:bg-gray-100 transition-colors duration-200 text-normal p-3 whitespace-nowrap pl-8 "
                      onClick={() => { setTo(city.local_name); setDropdownStatus('none'); }}
                    >
                      {city.local_name}
                    </li>
                  </div>
                ))}
              </ul>
            )}



          </div>

          <div className="flex ">
            <div className="flex">
              <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                monthsShown={2}
                className="rounded-l bg-[#F1F2F6] py-6 h-11 px-3 border-2 border-transparent hover:border-gray-400"
                dateFormat="EEE, MMM d" // format of the date
                locale="en-GB" // locale
                readOnly
              />

              {dropdown1 === 'One-way'

                ? (
                  <DatePicker
                    selected={returnDate}
                    onChange={(date) => {
                      setReturnDate(date);
                      setDropdown1('Round trip');
                    }}
                    monthsShown={2}
                    className="rounded-r py-6 h-11 px-3 bg-[#F1F2F6] text-gray-400 border-2 border-transparent hover:border-gray-400 flex items-center cursor-pointer"
                    dateFormat="EEE, MMM d" // format of the date
                    locale="en-GB" // locale
                    placeholderText="+Add return"
                    onClickOutside={() => setAddReturnClicked(false)}
                  />
                )

                : (
                  <DatePicker
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    monthsShown={2}
                    className="rounded-r py-6 h-11 px-3 bg-[#F1F2F6] border-2 border-transparent hover:border-gray-400"
                    dateFormat="EEE, MMM d" // format of the date
                    locale="en-GB"
                  />
                )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row-reverse lg:w-auto w-full">
            <button className="mt-2 lg:mt-0 lg:w-auto w-full bg-[#f95959] hover:bg-[#FB8989] text-white font-bold px-14 py-3 rounded">Search</button>
          </div>
        </div>
        {/* Le bouton de toggle switch */}
        <p className="pt-2">
          <div className="flex items-center cursor-pointer">
            <div className="relative" onClick={() => setAccommodationSwitch(!accommodationSwitch)}>
              <input type="checkbox" id="accommodationSwitch" className="sr-only" checked={accommodationSwitch} onChange={() => setAccommodationSwitch(!accommodationSwitch)} />
              <div className={`block w-10 h-6 rounded-full ${accommodationSwitch ? 'bg-blue-600 ' : 'bg-gray-200 '}`} />
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${accommodationSwitch ? 'transform translate-x-full ' : ''}`} />
            </div>
            <div className="pl-2">


              <p className="text-sm">
                Find my accommodation with
                <span className="font-bold">Booking.com</span>
              </p>

            </div>
          </div>
        </p>
      </div>
    </div>


  );
}

export default SearchBar;
