import { useState } from "react";
import type { IAuthUser } from "../../types";
import { useNavigate } from "react-router-dom";

type AuthUserDataProps = {
  authUser: IAuthUser;
};

const AuthUserData = ({ authUser }: AuthUserDataProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer rounded-full absolute top-0 right-0 border-2 border-gray-300 p-1 hover:border-blue-500 transition"
      >
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={authUser.image}
          alt="User"
        />
      </button>

      {open && (
        <div className="mt-2 w-64 bg-white text-gray-800 shadow-xl rounded-2xl p-4  z-50 absolute top-[5%] right-0 ">
          <div className="flex items-center gap-3 mb-4">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={authUser.image}
              alt="User"
            />
            <div>
              <p className="font-semibold text-gray-800">
                {authUser.firstName} {authUser.lastName}{" "}
              </p>
              <p className="text-sm text-gray-500">{authUser.username} </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-2xl transition"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default AuthUserData;
