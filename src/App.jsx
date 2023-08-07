import { useState } from "react";
import useFetch from "./lib/useFetch";

function App() {
  const [data, isLoading] = useFetch("/src/mocks/mockApi.json");
  console.log(data);
  return <></>;
}

export default App;
