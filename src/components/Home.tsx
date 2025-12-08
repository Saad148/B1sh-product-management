import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto">
      <p className="text-5xl text-center"> Welcome to Our Website!!!!!!</p>
      <div className="">
        <p>Click the Button below to go to the Login Page</p>
        <button className="cursor-pointer border text-start bg-amber-500 px-6 py-2 rounded-2xl text-2xl">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
