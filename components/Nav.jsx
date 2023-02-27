import { useFetchData } from "@/context/DataFetchContext";
import Link from "next/link";

const Nav = () => {
  const { selectedCategory, setSelectedCategory, setSearchQuery } = useFetchData()
  return (
    <>
      <div className="flex p-3 md:p-5 text-xl md:text-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll bg-gray-100">
        <Link href="">
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("");
            }}
            className={`font-bold md:ml-24 text-gray-600 cursor-pointer hover:text-blue-500 ${selectedCategory === "" && "text-blue-500"
              }`}
          >
            All
          </button>
        </Link>

        <Link href="">
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("Java");
            }}
            className={`font-bold text-gray-600 cursor-pointer hover:text-blue-500 ${selectedCategory === "Java" && "text-blue-500"
              }`}
          >
            Advanced Java
          </button>
        </Link>

        <Link href="">
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("ComputationTheory");
            }}

            className={`font-bold text-gray-600 cursor-pointer hover:text-blue-500 ${selectedCategory === "ComputationTheory" && "text-blue-500"
              }`}
          >
            Computation Theory
          </button>
        </Link>

        <Link href="">
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("ComputerNetwork");
            }}
            className={`font-bold text-gray-600 cursor-pointer hover:text-blue-500 ${selectedCategory === "ComputerNetwork" && "text-blue-500"
              }`}
          >
            Computer Networks
          </button>
        </Link>

        <Link href="">
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("Dbms");
            }}
            className={`font-bold text-gray-600 cursor-pointer hover:text-blue-500 ${selectedCategory === "Dbms" && "text-blue-500"
              }`}
          >
            DBMS
          </button>
        </Link>

        <Link href="">
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("EngineeringBiology");
            }}
            className={`font-bold text-gray-600 cursor-pointer hover:text-blue-500 ${selectedCategory === "EngineeringBiology" && "text-blue-500"
              }`}
          >
            Engineering Biology
          </button>
        </Link>
      </div>
    </>
  );
};

export default Nav;
