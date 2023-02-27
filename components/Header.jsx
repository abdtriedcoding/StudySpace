import { useFetchData } from "@/context/DataFetchContext";
import { useAuth } from "@/context/UserAuthContext";
import Link from "next/link";

const Header = () => {
  const { user, logOut, googleSignIn } = useAuth();
  const { setSelectedCategory } = useFetchData()

  return (
    <>
      <nav className="bg-gradient-to-r from-sky-400 to-blue-500 sticky top-0 z-50">
        <div className="mx-auto px-2 py-4 max-w-7xl flex justify-between items-center">
          <Link href="/" className="flex space-x-1">
            <button onClick={() => {
              setSelectedCategory("");
            }}>
              <div className="flex-shrink-0 flex items-center">
                <img className="w-full h-12" src="/logo.png" />
              </div>
            </button>
          </Link>
          <div className="flex-shrink-0">
            {user ? (
              <div className="flex items-center">
                <button
                  onClick={logOut}
                  className="mx-4 inline-flex items-center px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform hover:-translate-y-0.5 transition-all duration-150"
                >
                  <div className="mr-2">{user?.displayName}</div>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={googleSignIn}
                className="mx-4 inline-flex items-center px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform hover:-translate-y-0.5 transition-all duration-150"
              >
                <span>Login</span>
                <svg
                  className="ml-2 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
