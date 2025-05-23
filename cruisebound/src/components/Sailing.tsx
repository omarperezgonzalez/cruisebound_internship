import { type Cruise } from "@/services/api";
import { dateFormatter } from "@/utils/dateFormatter";
import { itineraryFormatter } from "@/utils/itineraryFormatter";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface SailingProps {
  sailing : Cruise;
}

export default function Sailing({ sailing } : SailingProps){
  return(
    <div className="2xl:w-[50vw] lg:w-[60vw] md:[75vw] w-[85vw] h-120 xl:h-50 flex xl:flex-row flex-col bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-101 hover:shadow-xl hover:-translate-y-1"> 
      {/* Ship image with date overlay */}
      <div className="relative xl:w-80 w-full h-50 flex-shrink-0">
        <Image 
          src={sailing.ship.image || "/img/imagePlaceholder.webp"} 
          alt="Ship Image" 
          fill
          sizes="(max-width: 1024px) 100vw, 320px"
          className="object-fill"
        />
        <div className="absolute top-3 left-3 bg-black/25 backdrop-blur-md text-white px-3 py-1 rounded text-sm">
          {dateFormatter(sailing.departureDate, sailing.returnDate)}
        </div>
        
      </div>
    
      {/* Cruise details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="h-2/3 px-5 py-2.5 flex flex-col justify-between">
          
          {/* Title, region, duration, rating */}
          <div className="mb-3 w-full flex justify-between">
            <div className="w-2/3">
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                {sailing.name}
              </h3>
              <div className="flex flex-wrap items-center gap-1 xl:gap-4 text-sm text-gray-600">
                <span className="font-bold">{sailing.region}</span>
                <span className="font-bold">{sailing.duration} nights</span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="font-bold">{sailing.ship.rating}</span>
                  <span className="text-gray-500 text-xs">{sailing.ship.reviews} reviews</span>
                </div>
              </div>
            </div>
            
            {/* Ship Logo and Name */}
            <div className="flex flex-col items-end gap-1">
              {
                  sailing.ship.line.logo &&
                  <div className="w-24 h-12 overflow-hidden relative">
                      <Image 
                      src={sailing.ship.line.logo} 
                      alt="Ship Image" 
                      width={512}
                      height={512}
                      sizes="(max-width: 1024px) 100vw, 320px"
                      className="absolute left-1/2 top-1/2 -translate-1/2"
                      />
                
                  </div>
              }
              <span className="text-xs font-semibold text-gray-500">{sailing.ship.name}</span>
            </div>
          </div>
  
          {/* 
            Itinerary preview 
            Shows the first 3 destinations from the itinerary.
            If there are more than 3, displays "+ n more" where n = total - 3.
          */}
          <div className="overflow-hidden">
            <div className="flex items-center text-xs text-gray-600 relative">
              <div className="flex flex-wrap items-center overflow-hidden">
                {sailing.itinerary.slice(0, 3).map((destination: string, index: number) => (
                  <div key={index} className="flex items-center flex-shrink-0">
                    <span className="font-bold">{itineraryFormatter(destination)}</span>
                    
                    {/*
                      Show the arrow only if it's not the last displayed item (max 2 arrows for 3 items)
                      Ensures no arrow is shown after the last visible destination
                    */}
                    {index < Math.min(sailing.itinerary.length - 1, 2) && (
                      <span className="font-extrabold mx-2 text-blue-700">
                          <ArrowRight className="w-3 h-3"/>
                      </span>
                    )}
                  </div>
                ))}
                {sailing.itinerary.length > 3 && (
                  <span className="font-bold text-gray-400 ml-2">+{sailing.itinerary.length - 3} more</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Price and Button Section */}
        <div className="xl:h-1/3 h-1/4 flex justify-end gap-5 bg-stone-100 px-5 py-2.5">  
            
          {/* Pricing */}
          <div className="text-right">
            <p className="text-xs text-gray-500 font-bold">Interior from</p>
            <p className="relative text-xl font-bold text-gray-900">
                <span className="text-sm align-[20%]">$</span>
                {sailing.price}
            </p>
          </div>
      
          {/* Button */}
          <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-2 rounded-xl font-medium transition-colors">
            See sailings
          </button>
        </div>
      </div>
    </div>
  );
};