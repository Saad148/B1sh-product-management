import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const accesstoken = response.data.accessToken;
      const refreshtoken = response.data.refreshToken;

      localStorage.setItem("accessToken", accesstoken);
      localStorage.setItem("refreshToken", refreshtoken);

      setSuccess(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("wrong username or pass");
      } else if (err.response?.status === 401) {
        setErrMsg("Unautho");
      } else {
        setErrMsg("login failed");
      }
    }
  };

  useEffect(() => {
    if (success) navigate("/products");
  }, [navigate, success]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
            Sign In
          </h2>
          <p className="text-xl font-[poppins] text-red-800 mb-4 text-center">
            {errMsg}
          </p>
          <form className="space-y-5" onSubmit={handlesubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white 
            font-semibold py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
