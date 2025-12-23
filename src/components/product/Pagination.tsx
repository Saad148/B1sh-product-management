type ButtonLinksProps = {
  totalPages: number;
  selectPageHandler: (selectedPage: number) => void;
  page: number;
};

const Pagination = ({
  totalPages,
  selectPageHandler,
  page,
}: ButtonLinksProps) => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-2 mt-6">
        {[...Array(totalPages)].map((_, i) => {
          const pageNumber = i + 1;

          return (
            <button
              key={i}
              onClick={() => selectPageHandler(pageNumber)}
              className={`px-4 py-2 rounded-full border transition-all cursor-pointer hover:bg-gray-400
           
            ${
              page === pageNumber
                ? "bg-gray-700 text-white border-gray-700"
                : "bg-white"
            }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
