type SearchProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
};

const SearchProducts = ({ handleChange, search }: SearchProps) => {
  return (
    <>
      <form
        className=" container text-center mx-auto py-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="border border-gray-300 py-2.5 pl-2 bg-gray-200 rounded-[10px] w-full"
          type="text"
          placeholder="Search Products Here"
          value={search}
          onChange={handleChange}
        ></input>
      </form>
    </>
  );
};

export default SearchProducts;
