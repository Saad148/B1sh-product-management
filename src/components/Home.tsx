import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-xl bg-white w-full text-center shadow-xl rounded-2xl p-10">
        <h1 className="text-4xl text-gray-800 font-bold">
          Welcome to Our Website
        </h1>

        <p className="mt-4 text-gray-800 text-lg">
          Please click the button below to access the Login Page.
        </p>

        <Link
          to="/login"
          className="inline-block mt-8 px-8 py-3 rounded-full text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          Go to Login Page
        </Link>
      </div>
    </div>
  );
};

export default Home;
