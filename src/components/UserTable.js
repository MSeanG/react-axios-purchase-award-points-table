import { useMemo } from "react";

const Tbody = ({ data = [] }) => {
  return (
    <tbody>
      {data.map((purchase, key) => (
        <tr key={key}>
          <td style={{ textAlign: "left" }}>{purchase.date}</td>
          <td style={{ textAlign: "right" }}>${purchase.amount}.00</td>
          <td style={{ textAlign: "right" }}>
            <span>{purchase.points}</span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const UserTable = ({ data = [] }) => {
  const totalPoints = useMemo(() => {
    return data.reduce((accumulator, purchase) => {
      return accumulator + purchase.points;
    }, 0);
  }, [data]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Date</th>
            <th style={{ textAlign: "right" }}>Amount</th>
            <th style={{ textAlign: "right" }}>Points</th>
          </tr>
        </thead>
        <Tbody data={data} />
      </table>
      <h3>Total Points: {totalPoints}</h3>
    </>
  );
};

export default UserTable;
