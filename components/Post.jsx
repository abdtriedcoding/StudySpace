import { useFetchData } from "@/context/DataFetchContext";
import Link from "next/link";

const Post = () => {
  const { data } = useFetchData()
  const { searchQuery, setSearchQuery } = useFetchData()
  const handleSearch = () => {
    if (!searchQuery) return data;
    return data.filter((data) =>
      data.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) || data.subtitle.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
  }

  return (
    <>
      <div className="w-[90%] mx-auto my-5 h-10 relative flex items-center">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search for content..."
          className="w-full text-black text-[12px] lg:text-[16px] rounded bg-transparent h-full border-solid border-gray-500 border-2 outline-none px-2 hover:border-sky-300 capitalize placeholder:uppercase placeholder:text-[12px] placeholder:tracking-wide placeholder:lg:text-[16px]" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-5 py-6 mx-auto max-w-7xl">
        {handleSearch()?.map((e) => {
          return (
            <Link key={e.id} target='_blank' href={e.pdf}>
              <div
                key={e.id}
                className="bg-sky-200 shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  alt="content"
                  className="object-fit h-64 w-full"
                  src={e?.image}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {e.title}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 font-semibold">
                    {e.subtitle}
                  </p>
                </div>
                <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                  <span className="text-gray-200">
                    {e.timestamp}
                  </span>
                  {e && e.sizeInMB1 && <span className="text-gray-200">
                    {e.sizeInMB1.toFixed(1)}MB
                  </span>}
                </div>
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                  <span className="text-gray-200 uppercase">Open Pdf</span>
                  <span className="text-gray-200 uppercase">{e.category}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Post;
