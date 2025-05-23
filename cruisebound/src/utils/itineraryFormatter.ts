export function itineraryFormatter (destination : string){
    //If the destination string does not contain a comma, return the entire string as is.
    if(!destination.includes(',')) return destination;

    //If the destination contains a comma, return the substring from the start up to (but not including) the first comma.
    return destination.substring(0, destination.indexOf(","));
};