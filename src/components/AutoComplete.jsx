import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const renderDropdown = () => {
    const dropdownClass = search ? "show" : null;
    return (
      <ul
        className={`dropdown-menu ${dropdownClass}`}
        style={{ height: "200px", width: "100%", overflowY: "scroll" }}
      >
        {results.map((result) => {
          return (
            <li
              className='dropdown-item'
              key={result.symbol}
              onClick={() => {
                setSelected((prevResult) => {
                  console.log(prevResult);
                  return [...prevResult, result];
                });
                setSearch("");
              }}
            >
              {result.description} ({result.symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const response = await finnHub.get("/search", {
        params: {
          q: search,
        },
      });
      if (isMounted) {
        setResults(response.data.result);
      }
    };

    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => {
      isMounted = false;
    };
  }, [search]);

  return (
    <div className='w-50 p-5 rounded mx-auto'>
      <div className='form-floating dropdown'>
        <input
          type='text'
          id='search'
          className='form-control'
          style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }}
          placeholder='Search'
          autoComplete='off'
          value={search}
          onChange={handleChange}
        />
        <label htmlFor='search'>Search</label>
        {renderDropdown()}
      </div>
    </div>
  );
};
