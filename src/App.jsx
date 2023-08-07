import { useState } from "react";
import useFetch from "./lib/useFetch";
import useSortData from "./lib/useSortData";

function App() {
  const [data, isLoading] = useFetch(
    "https://ecocim-backend-theone.beit.co.id/api/ManualConfig/TestBEIT"
  );
  const [kelas, setKelas] = useState(0);
  const sortedData = useSortData(data);
  const filterKelas = sortedData?.filter((data) => data.kelas == kelas + 1);

  function handleTotalCursed(data) {
    const total = data?.filter((d) => {
      const currentMonth = new Date().getMonth() + 1;
      if (data && currentMonth === new Date(d?.deathTime).getMonth() + 1)
        return d;
    }).length;
    return total;
  }

  const totalCursedGlobally = handleTotalCursed(sortedData);
  const totalCursedClass = handleTotalCursed(filterKelas);
  const totalMarriage =
    kelas == 5 && filterKelas.filter((d) => d.nilai % 7 === 0).length;

  if (isLoading) return <p>Loading ..</p>;
  return (
    <>
      {[...Array(6)].map((el, i) => (
        <button
          key={i}
          onClick={() => setKelas((prev) => (prev = i))}
          disabled={kelas === i}
        >
          kelas {i + 1}
        </button>
      ))}
      <table
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          borderCollapse: "collapse",
          margin: "20px 0",
        }}
      >
        <thead
          style={{
            backgroundColor: "#f2f2f2",
            padding: "8px",
            textAlign: "left",
            borderBottom: "1px solid #ddd",
          }}
        >
          <tr>
            <td>Nama</td>
            <td>Kelas</td>
            <td>Nilai</td>
            <td>Death Time</td>
            {kelas == 5 && <td>Will marry next year?</td>}
          </tr>
        </thead>
        <tbody key={data.name}>
          {sortedData &&
            filterKelas.map((data) => {
              let deathTime = new Date(data.deathTime).toLocaleString(
                "default",
                {
                  month: "long",
                  year: "numeric",
                }
              );
              return (
                <tr key={data.name}>
                  <td>{data.name} </td>
                  <td>{data.kelas} </td>
                  <td>{data.nilai} </td>
                  <td>{data.deathTime ? deathTime : "-"}</td>
                  {kelas == 5 && <td>{data.nilai % 7 == 0 ? "yes" : "no"}</td>}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
        <p>
          Total Stundents Cursed this month ( globally ) : {totalCursedGlobally}
        </p>
        <p>
          Total Stundents Cursed this month ( per class ) :{totalCursedClass}
        </p>
        {kelas == 5 && <p>Total Stundents Marry next year: {totalMarriage}</p>}
      </div>
    </>
  );
}

export default App;
