export async function fetchCities({
  searchTerm,
  rowsPerPage,
  currentPage,
  setLoading,
}) {
  let cities = [];
  try {
    setLoading(true);
    const data = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchTerm}&limit=${rowsPerPage}&offset=${
        (currentPage - 1) * rowsPerPage
      }`,
      {
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_API_KEY,
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        },
      }
    );
    cities = await data.json();
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
  return cities;
}
