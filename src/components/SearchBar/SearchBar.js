// Importer les modules nécessaires
import React, { useState, useEffect, useRef } from 'react'; // React et ses hooks
import 'tailwindcss/tailwind.css'; // Tailwind pour le style
import { TbCircle } from 'react-icons/tb'; // Différentes icônes pour le style de l'application
import {
  BsFillGeoAltFill, BsChevronUp, BsCheckLg, BsChevronDown, BsPlusCircle, BsDashCircle, BsCalendar,
} from 'react-icons/bs';
import { FaExchangeAlt } from 'react-icons/fa';
import axios from 'axios'; // Axios pour les requêtes HTTP
import DatePicker, { registerLocale } from 'react-datepicker'; // DatePicker pour la sélection des dates
import 'react-datepicker/dist/react-datepicker.css'; // Styles pour le DatePicker
import enGB from 'date-fns/locale/en-GB'; // Localisation en anglais pour le DatePicker

registerLocale('en-GB', enGB); // Enregistrement de la locale pour le DatePicker

// Définir le composant SearchBar
function SearchBar() {
  // Initialisation des états avec useState
  // Les valeurs des champs de recherches
  const [from, setFrom] = useState(''); // Valeur de la barre de recherche "From"
  const [to, setTo] = useState(''); // Valeur de la barre de recherche "To"

  // Les Dates
  const [departureDate, setDepartureDate] = useState(new Date()); // Date de départ sélectionnée
  const [returnDate, setReturnDate] = useState(); // Date de retour sélectionnée

  // Les menus déroulants
  const [dropdown1, setDropdown1] = useState('One-way'); // Valeur du premier menu déroulant
  const [dropdown2, setDropdown2] = useState(); // Valeur du deuxième menu déroulant

  // Les compteurs
  const [adultCount, setAdultCount] = useState(0); // Compteur d'adultes
  const [youthCount, setYouthCount] = useState(0); // Compteur de jeunes
  const [seniorCount, setSeniorCount] = useState(0); // Compteur de seniors

  // Le button de switch
  const [accommodationSwitch, setAccommodationSwitch] = useState(false); // État du bouton d'hébergement

  // Initialisation des résultats d'autocomplétion pour les champs "From" et "To"
  const [autocompleteResultsFrom, setautocompleteResultsFrom] = useState([]); // Résultats d'autocomplétion pour "From"
  const [autocompleteResultsTo, setautocompleteResultsTo] = useState([]); // Résultats d'autocomplétion pour "To"
  const [popularCitiesResults, setPopularCitiesResults] = useState([]); // Résultats des villes populaires

  // Status des menus déroulents pour savoir lequel on souhaite afficher
  const [dropdownStatus, setDropdownStatus] = useState(''); // État du menu déroulant
  const [addReturnClicked, setAddReturnClicked] = useState(false); // État du clic sur "ajouter un retour"


  // stocker les résultats de l'API concernant l'autocomplétion
  const fetchAutocompleteResults = async (query, setResult) => {
    try {
      // Cette fonction fetch les résultats de l'API pour l'autocomplétion
      const response = await axios.get(`https://api.comparatrip.eu/cities/autocomplete/?q=${query}`);
      // Mettre à jour les autocomplétions
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
    // Mettre à jour le nombre total de passagers
    setDropdown2(`${totalPassengers} Passengers, No discount card`);
  }, [adultCount, youthCount, seniorCount]);

  // exécuter l'autocomplétion dès le premier caractère
  useEffect(() => {
    if (from.length >= 1) {
      // Si la longueur de 'from' est d'au moins 1 caractère, lancer l'autocomplétion
      fetchAutocompleteResults(from, setautocompleteResultsFrom);
    }

    if (to.length >= 1) {
      // Si la longueur de 'to' est d'au moins 1 caractère, lancer l'autocomplétion
      fetchAutocompleteResults(to, setautocompleteResultsTo);
    }
  }, [from, to]);

  useEffect(() => {
    if (dropdown1 === 'One-way') {
      // Si le type de voyage est 'One-way', mettre la date de retour à null
      setReturnDate(null);
    }
  }, [dropdown1]);


  // Rendu du composant
  return (

    // Début de la div principale
    <div className="w-full h-screen flex items-center justify-center " style={{ background: 'linear-gradient(180deg, #81A5D5 50%, #F1F2F6 50%)' }}>

      <div className="absolute z-10 w-full h-full bg-gradient-to-b from-transparent to-[#F1F2F6] " style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }} />
      <div className="bg-white py-5 lg:px-10 px-5 rounded-lg shadow-lg z-20 text-[#453968]">
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
              onFocus={() => setDropdownStatus('none')} // Cacher les menus quand celui ci est en focus
              onBlur={() => setTimeout(() => setDropdownStatus('none'), 100)} // Cacher le menu quand on quitte le focus
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
                      setDropdownStatus('none'); // cacher le menu quand une option est clické
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
              onBlur={() => setTimeout(() => setDropdownStatus('none'), 100)} // // Cacher le menu quand on quitte le focus
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
                      setDropdownStatus('none'); // cacher le menu après qu'une option soit clické
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
              <ul className="bg-white absolute left-0 top-full max-h-60 lg:max-h-80 mt-2 w-fit z-10 shadow-inner overflow-y-scroll max-w-sm overflow-x-hidden">
                <li className="p-2 text-xs pl-3 bg-slate-100 text-slate-400 font-semibold">POPULAR DESTINATIONS</li>
                {popularCitiesResults.map((city) => (
                  <li
                    key={city.unique_name}
                    className="hover:bg-gray-100 transition-colors duration-200 text-normal p-3 flex items-center justify-start cursor-pointer"
                    onClick={() => { setTo(city.local_name); setDropdownStatus('none'); }}
                  >
                    <BsFillGeoAltFill className="text-gray-500 ml-3" />
                    <span className="pl-8 overflow-hidden text-overflow-ellipsis whitespace-nowrap">{city.local_name}</span>
                  </li>
                ))}
              </ul>


            )}



          </div>

          <div className="flex ">
            <div className="flex">

              <div className='relative'>
                <BsCalendar size={20} color="gray" className="absolute top-4 left-2 pointer-events-none z-20" />
              </div>

              <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                monthsShown={2}
                className="bg-[#F1F2F6] w-40 py-6 h-11 px-3 border-2 border-transparent hover:border-gray-400 pl-10"
                dateFormat="EEE, MMM d"
                locale="en-GB"
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
                    className="rounded-r w-40 py-6 h-11 px-3 bg-[#F1F2F6] text-gray-400 border-2 border-transparent hover:border-gray-400 flex items-center cursor-pointer"
                    dateFormat="EEE, MMM d" // format de la date
                    locale="en-GB" // locale
                    placeholderText="+Add return"
                    onClickOutside={() => setAddReturnClicked(false)}
                  />
                )

                : (
                  <div className="flex">
                    <div className='relative'>
                      <BsCalendar size={20} color="gray" className="absolute top-4 left-2 pointer-events-none z-20" />
                    </div>
                    <DatePicker
                      selected={returnDate}
                      onChange={(date) => setReturnDate(date)}
                      monthsShown={2}
                      className="bg-[#F1F2F6] w-40 py-6 h-11 px-3 border-2 border-transparent hover:border-gray-400 pl-10"
                      dateFormat="EEE, MMM d" // format de la date
                      locale="en-GB"
                    />
                  </div>
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
              <div className={`block w-10 h-6 rounded-full ${accommodationSwitch ? 'bg-[#5E90CC] ' : 'bg-gray-200 '}`} />
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${accommodationSwitch ? 'transform translate-x-full ' : ''}`} />
            </div>
            <div className="pl-2">


              <p className="text-sm">
                Find my accommodation with
                <span className="font-bold"> Booking.com</span>
              </p>

            </div>
          </div>
        </p>
      </div>
    </div>


  );
}

export default SearchBar;
