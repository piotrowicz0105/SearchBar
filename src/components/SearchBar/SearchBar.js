// Importer les modules nécessaires
import React, { useState, useEffect, useRef } from "react";
import 'tailwindcss/tailwind.css';
import { TbCircle } from 'react-icons/tb';
import { BsFillGeoAltFill, BsChevronUp, BsCheckLg, BsChevronDown, BsPlusCircle, BsDashCircle } from "react-icons/bs";

// Définir le composant SearchBar
const SearchBar = () => {

    // Initialisation des états
    // Les champs de recherches
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    // Les Dates
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    // Les menus déroulants
    const [dropdown1, setDropdown1] = useState("One-way");
    const [dropdown2, setDropdown2] = useState("Dropdown2");
    const [showDropdown1, setShowDropdown1] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    // Les compteurs
    const [adultCount, setAdultCount] = useState(0);
    const [youthCount, setYouthCount] = useState(0);
    const [seniorCount, setSeniorCount] = useState(0);
    // Le button de switch
    const [accommodationSwitch, setAccommodationSwitch] = useState(false);

    // Initialisation des références
    const dropdown1Ref = useRef(null);
    const dropdown2Ref = useRef(null);


    // Fonction pour gérer les clics en dehors des menus déroulants
    const handleOutsideClick = (event) => {
        if (dropdown1Ref.current && !dropdown1Ref.current.contains(event.target)) {
          setShowDropdown1(false);
        }
        if (dropdown2Ref.current && !dropdown2Ref.current.contains(event.target)) {
          setShowDropdown2(false);
        }
    };

    // Utilisation de useEffect pour gérer les clics en dehors des menus déroulants
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
          document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    // Utilisation de useEffect pour mettre à jour le nombre de passagers
    useEffect(() => {
        const totalPassengers = adultCount + youthCount + seniorCount;
        setDropdown2(`${totalPassengers} Passengers, No discount card`);
    }, [adultCount, youthCount, seniorCount]);

    // Fonction pour gérer la recherche
    const handleSearch = () => {
        
    };

    // Rendu du composant
    return (
        // Début de la div principale
        <div className="w-full h-screen flex items-center justify-center" style={{background: 'linear-gradient(180deg, #81A5D5 50%, #F1F2F6 50%)'}}>
            <div className="bg-white py-5 px-10 rounded-lg shadow-lg ">
                {/* Début du menu déroulant 1 */}
                <div className="mb-4 flex flex-row relative z-10">
                    {/* Début du composant qui affiche et gère le menu déroulant */}
                    <div onClick={() => setShowDropdown1(!showDropdown1)} className="cursor-pointer text-gray-700 mr-3 text-sm">
                        <div className="font-medium flex items-center">
                            <p>{dropdown1}</p>
                            {showDropdown1 
                                ? <BsChevronUp className="pl-1 w-5" onClick={(event) => {event.stopPropagation(); setShowDropdown1(!showDropdown1);}}/>
                                : <BsChevronDown className="pl-1 w-5" onClick={(event) => {event.stopPropagation(); setShowDropdown1(!showDropdown1);}}/>
                            }
                        </div>
                        {/* Contenu du menu déroulant 1 */}
                        {showDropdown1 && (
                            <div className="rounded-lg bg-white shadow-lg py-1 mt-1 absolute left-0 p-2 text-base">
                                <div onClick={() => {setDropdown1('One-way'); setShowDropdown1(false)}} className="flex items-center relative px-3 py-1 hover:bg-gray-200 cursor-pointer">
                                    {dropdown1 === 'One-way' && <BsCheckLg className="absolute left-0 text-blue-500 w-10"/>}
                                    <p className={dropdown1 === 'One-way' ? 'font-bold pl-6' : 'pl-6'}>One-way</p>
                                </div>
                                <div onClick={() => {setDropdown1('Round trip'); setShowDropdown1(false)}} className="flex items-center relative px-3 py-1 hover:bg-gray-200 cursor-pointer">
                                    {dropdown1 === 'Round trip' && <BsCheckLg className="absolute left-0 text-blue-500 w-10"/>}
                                    <p className={dropdown1 === 'Round trip' ? 'font-bold pl-6' : 'pl-6'}>Round trip</p>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Fin du composant qui affiche et gère le menu déroulant */}
                    {/* Début du menu déroulant 2 */}
                    <div ref={dropdown2Ref} onClick={() => setShowDropdown2(!showDropdown2)} className="cursor-pointer text-gray-700 text-sm ">
                        <div className=" font-medium flex items-center">
                            <p>{dropdown2}</p>
                            {showDropdown2 
                                ? <BsChevronUp className="pl-1 w-5" onClick={(event) => {event.stopPropagation(); setShowDropdown2(!showDropdown2);}}/> 
                                : <BsChevronDown className="pl-1 w-5" onClick={(event) => {event.stopPropagation(); setShowDropdown2(!showDropdown2);}}/>
                            }
                        </div>
                        {/* Contenu du menu déroulant 2 */}
                        {showDropdown2 && (
                            <div className=" bg-white shadow-xl py-1 mt-1 absolute left-0 ml-12 p-5 z-10">
                                {/* Chaque bloc correspond à un groupe d'âge */}
                                <div className="flex justify-between items-center border-b-2 px-3 py-1">
                                    <div>
                                        <p className="font-bold">Adult</p>
                                        <p className="text-xs text-slate-400">26+ years</p>
                                    </div>
                                    <div className="flex items-center p-3">
                                        {/* Bouton pour diminuer le nombre d'adultes */}
                                        <button onClick={(event) =>{event.stopPropagation();if (adultCount > 0) { setAdultCount(adultCount - 1);}}} className=" flex items-center justify-center bg-white text-xl font-bold">
                                            <BsDashCircle size={30} className=" text-blue-600"/>
                                        </button>
                                        <p className=" mx-3 text-lg">{adultCount}</p>
                                        {/* Bouton pour augmenter le nombre d'adultes */}
                                        <button onClick={(event) =>{event.stopPropagation(); setAdultCount(adultCount + 1)}} className=" flex items-center justify-center bg-white text-xl font-bold">
                                            <BsPlusCircle size={30} className=" text-blue-600"/>
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
                                        <button onClick={(event) =>{event.stopPropagation(); if (youthCount > 0) {setYouthCount(youthCount - 1)}}} className="flex items-center justify-center bg-white text-xl font-bold"><BsDashCircle size={30} className=" text-blue-600"/></button>
                                        <p className=" mx-3 text-lg">{youthCount}</p>
                                        <button onClick={(event) =>{event.stopPropagation(); setYouthCount(youthCount + 1)}} className="flex items-center justify-center bg-white text-xl font-bold"><BsPlusCircle size={30} className=" text-blue-600"/></button>
                                    </div>
                                </div>
                                {/* Bloc pour le groupe d'âge 'Senior' */}
                                <div className="flex justify-between items-center border-b-2 px-3 py-1">
                                    <div>
                                        <p className="font-bold">Senior</p>
                                        <p className="text-xs text-slate-400">58+ years</p>
                                    </div>
                                    <div className="flex items-center p-3">
                                        <button onClick={(event) =>{event.stopPropagation();if (seniorCount > 0) { setSeniorCount(seniorCount - 1)}}} className="flex items-center justify-center bg-white text-xl font-bold"><BsDashCircle size={30} className=" text-blue-600"/></button>
                                        <p className=" mx-3 text-lg">{seniorCount}</p>
                                        <button onClick={(event) =>{event.stopPropagation(); setSeniorCount(seniorCount + 1)}} className="flex items-center justify-center bg-white text-xl font-bold"><BsPlusCircle size={30} className=" text-blue-600"/></button>
                                    </div>
                                </div>
                                <p className="px-3 pt-3 cursor-pointer">Add discount card</p>
                                <div className="px-3 py-1 mx-5 my-5 bg-[#fff7ed] border-red-600 border">
                                    <p className=" text-base font-medium text-red-700">Please select your journey before <br></br> adding discount cards.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Les deux champs de recherche et les deux champs des dates*/}
                <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 space-y-2 lg:space-y-0">
                    <div className="flex flex-col relative">
                        <TbCircle className="absolute text-gray-500 top-1/2 left-3 transform -translate-y-1/2"/>
                        <input type="text" value={from} placeholder="From: City, Station Or Airport" onChange={(e) => setFrom(e.target.value)} className="rounded-lg  bg-[#F1F2F6]  py-2 px-3 pl-8 w-full border-2 border-transparent hover:border-gray-400"/>
                    </div>
                    <div className="flex flex-col relative">
                        <BsFillGeoAltFill className="absolute text-gray-500 top-1/2 left-3 transform -translate-y-1/2"/>
                        <input type="text" value={to} placeholder="To: City, Station Or Airport" onChange={(e) => setTo(e.target.value)} className="rounded-lg   bg-[#F1F2F6] py-2 px-3 pl-8 w-full border-2 border-transparent hover:border-gray-400"/>
                    </div>
                    <div className="flex ">
                        <div className="flex">
                            <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} className="rounded-l bg-[#F1F2F6] py-4 h-11 px-3  border-2 border-transparent hover:border-gray-400"/>
                            {dropdown1 === 'One-way' ?
                                <button onClick={() => {setDropdown1('Round trip'); setReturnDate('')}} className="rounded-r py-4 h-11 px-3 w-40 bg-[#F1F2F6] text-gray-400 border-2 border-transparent hover:border-gray-400 flex items-center ">+Add return</button>
                                :
                                <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="rounded-r py-4 h-11 px-3 bg-[#F1F2F6] border-2 border-transparent hover:border-gray-400"/>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row-reverse lg:w-auto w-full">
                        <button onClick={handleSearch} className="mt-2 lg:mt-0 lg:w-auto w-full bg-[#f95959] hover:bg-[#FB8989] text-white font-bold py-2 px-4 rounded">Search</button>
                    </div>
                </div>
                {/* Le bouton de toggle switch */}
                <p className="pt-2">
                    <div className="flex items-center cursor-pointer">
                        <div className="relative" onClick={() => setAccommodationSwitch(!accommodationSwitch)}>
                            <input type="checkbox" id="accommodationSwitch" className="sr-only" checked={accommodationSwitch} onChange={() => setAccommodationSwitch(!accommodationSwitch)} />
                            <div className={`block w-10 h-6 rounded-full ${accommodationSwitch ? 'bg-blue-600 ' : 'bg-gray-200 '}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${accommodationSwitch ? 'transform translate-x-full ' : ''}`}></div>
                        </div>
                        <div className="pl-2">
                            <p className="text-sm">Find my accommodation with <span className="font-bold">Booking.com</span></p>
                           
                        </div>
                    </div>
                </p>
            </div>
        </div>

    );
};

export default SearchBar;
