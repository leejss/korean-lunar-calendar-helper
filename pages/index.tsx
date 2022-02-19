import React from "react";
import { Card, Input } from "../components";

const HomePage = () => {
  return (
    <div>
      <Card>
        <Input id="solar-year" label="년" />
        <Input id="solar-month" label="월" />
        <Input id="solar-day" label="일" />
      </Card>
    </div>
  );
};

export default HomePage;
