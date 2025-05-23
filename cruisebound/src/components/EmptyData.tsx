//Component used when the search does not exist or it is empty
interface EmptyDataProps {
  searchTerm: string;
};

export default function EmptyData({ searchTerm }: EmptyDataProps) {
  return (
    <div className="text-center py-8 lg:w-[50vw] w-[90vw]">
      <div className="text-gray-600">
        {searchTerm ? 'No cruises match your search.' : 'No cruises available.'}
      </div>
    </div>
  );
};