//Component used while fetching the data from the API
export default function LoadingData() {
  return (
    <div className="text-center py-8 lg:w-[50vw] w-[100vw]">
      {/* Animated loading spinner */}
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"/>
      </div>
      
      <div className="text-gray-600">
        <span>Loading cruises</span>
      </div>
      
    </div>
  );
};