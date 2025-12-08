import { Link, useLocation } from "react-router-dom";

const Pagination = () => {
  const { pathname } = useLocation();

  const pages = [1, 2, 3, 4, 5];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-200 py-3">
      <div className="flex justify-center gap-3">
        {pages.map((num) => {
          const isActive =
            pathname === "/products" && num === 1
              ? true
              : pathname === `/products/${num}`;

          return (
            <Link key={num} to={num === 1 ? "/products" : `/products/${num}`}>
              <button
                className={`
                  px-4 py-2 rounded-full transition cursor-pointer
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 border border-blue-600 text-blue-600 "
                  }
                `}
              >
                {num}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
