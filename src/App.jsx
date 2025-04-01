import { useState } from "react";
import SearchInput from "./SerachInput";
import Spinner from "./Spinner";

function App() {
  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleFetchCountChange = (e) => {
    setRowsPerPage(e.target.value);
  };

  return (
    <div className="app">
      <main>
        <SearchInput
          setCities={setCities}
          rowsPerPage={rowsPerPage}
          setTotalPages={setTotalPages}
          currentPage={currentPage}
          setLoading={setLoading}
        />
        {loading ? <Spinner /> : <></>}
        {!loading && cities.message ? (
          <p className="message">{cities.message}</p>
        ) : (
          <></>
        )}
        {cities.length ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>City Name</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.city}</td>
                    <td>
                      {item.country}{" "}
                      <img
                        src={`https://flagsapi.com/${item.countryCode}/flat/24.png`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <footer>
              <div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  {" "}
                  Page {currentPage} of {totalPages}{" "}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
              <div className="fetch-count">
                <label htmlFor="fetch-count">Fetch Count</label>
                <input
                  type="number"
                  value={rowsPerPage}
                  id="fetch-count"
                  onChange={handleFetchCountChange}
                />
                {rowsPerPage > 10 ? (
                  <span>Max count limit cannot excede 10</span>
                ) : (
                  <></>
                )}
              </div>
            </footer>
          </>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}

export default App;
