'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface SelectProps {
    options : string[],
    selected : string | null,
    onChange : Function,
    label : string,
}

//Mapping option keys to display the sorting select information
const labels = {
    "PLF" : {
        title: "Price",
        text: "Lowest first",
        label : "Price lowest first"
    },

    "PHF" : {
        title: "Price",
        text: "Highest first",
        label : "Price highest first"
    },

    "DDLF" : {
        title: "Departure Date",
        text: "Lowest first",
        label : "Departure Date lowest first"
    },
    
    "DDHF" : {
        title: "Departure Date",
        text: "Highest first",
        label : "Departure Date highest first"
    },
    

    "DLF" : {
        title: "Duration",
        text: "Lowest first",
        label : "Duration lowest first"
    },
    
    "DHF" : {
        title: "Duration",
        text: "Highest first",
        label : "Duration highest first"
    },
    
    null : {
        title: "Choose",
        text: "An option",
        label : ""
    }

}

export default function Select({ options, selected, onChange, label } : SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-50">
      {label && <label className="block mb-1 text-sm font-medium text-right">{label}</label>}
             
      {/* Dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-left cursor-pointer flex justify-between items-center transform transition-all duration-200 ease-in-out hover:shadow-lg hover:border-blue-300"
      >
        <div className='flex flex-col'>
            <span className="font-bold transition-colors duration-200 hover:text-blue-600">{labels[selected as keyof typeof labels]?.title}</span>
            <span className="text-gray-500 text-xs transition-colors duration-200">
              {labels[selected as keyof typeof labels]?.text}
            </span>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-all duration-200 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
      </button>
       
      {/* Dropdown options list, shown when open */}
      {isOpen && (
        <ul
          className="text-sm absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto transform transition-all duration-200 ease-in-out animate-in fade-in-0 zoom-in-95"
        >
          {options.map((option : string) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer transition-all duration-150 ease-in-out hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400 ${
                selected === option ? 'bg-blue-100 font-medium text-blue-700 border-blue-500' : ''
              }`}
            >
              {labels[option as keyof typeof labels]?.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};