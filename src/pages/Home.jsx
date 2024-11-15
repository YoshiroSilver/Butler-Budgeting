import React from "react";

import HeroBox from "../components/heroBox/HeroBox";
import ProgressBar from "../components/progressBar/ProgressBar";

function Home() {
  const totals = [
    {
      id: 1,
      name: "Income",
      allocated: 1141.8,
      total: 4567.2,
      desc: "Total",
    },
    {
      id: 2,
      name: "Expense",
      allocated: 1141.8,
      total: 4567.2,
      desc: "Total",
    },
    {
      id: 3,
      name: "Debt",
      allocated: 1141.8,
      total: 4567.2,
      desc: "Total",
    },
    {
      id: 4,
      name: "Savings",
      allocated: 1141.8,
      total: 4567.2,
      desc: "Goal",
    },
  ];
  return (
    <>
      <HeroBox amount={0} />
      {totals.map((total) => (
        <ProgressBar
          key={total.id}
          title={total.name}
          amount={total.allocated}
          total={total.total}
          desc={total.desc}
        />
      ))}
    </>
  );
}

export default Home;
