export function itineraryFormatter (destination : string){
    if(!destination.includes(',')) return destination;

    return destination.substring(0, destination.indexOf(","));
};