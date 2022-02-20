import React, { useState } from "react";
import { Card, Center, Input } from "../components";
import lunarCalendarHelper, { IMyDate } from "../utils/lunarCalendarHelper";

const HomePage = () => {
  const [resultString, setResultString] = useState("");
  const [inputDate, setInputDate] = useState<IMyDate>({
    year: "",
    month: "",
    day: "",
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = lunarCalendarHelper.displayLunarDate(
      lunarCalendarHelper.solarToLunar(
        inputDate.year,
        inputDate.month,
        inputDate.day
      )
    );
    setResultString(result);
  };

  return (
    <Center>
      <Card>
        <form>
          <Input id="year" label="년" setInputDate={setInputDate} />
          <Input id="month" label="월" setInputDate={setInputDate} />
          <Input id="day" label="일" setInputDate={setInputDate} />
          <button onClick={handleClick}>변환</button>
        </form>
        <h1>{resultString}</h1>
      </Card>
    </Center>
  );
};

export default HomePage;
