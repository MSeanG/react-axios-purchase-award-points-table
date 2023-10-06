import "./styles.css";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import UserTable from "./components/UserTable";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const CalculatePoints = (payment) => {
    if (payment >= 50 && payment <= 99) return payment;
    if (payment >= 100) return (payment - 100) * 2 + 100;
    return 0;
  };

  const updateData = useMemo(() => {
    return data?.map((purchase) => {
      const calculatedValue = CalculatePoints(purchase.amount);
      return { ...purchase, points: calculatedValue };
    });
  }, [data]);

  async function getData() {
    await axios
      .get("./data.json")
      .then((respons) => {
        setData(respons.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <div className="App">
      <h2>Purchases over the past 3 months</h2>
      <UserTable data={updateData} />
    </div>
  );
}
