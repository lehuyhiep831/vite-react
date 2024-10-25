import { useEffect, useState } from "react";
import MarketGrid, { MarketGridItems } from "../components/MarketGrid";
import mockData from "./data.json";

function Market() {
  const [data, setData] = useState<MarketGridItems[]>([]);

  const initFetch = async () => {
    // const response = await fetch("http://localhost:3000/items");

    // const data = await response.json();
    // console.log(data);
    setData(mockData.payload.items);
  };

  useEffect(() => {
    initFetch();
  }, []);

  return (
    <div>
      <h1>Market</h1>
      <MarketGrid data={data} />
    </div>
  );
}

export default Market;
