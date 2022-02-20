export interface IMyDate {
  year: string;
  month: string;
  day: string;
}

class MyDate {
  year: number;
  month: number;
  day: number;
  leapMonth: number;
  constructor(year: number, month: number, day: number, leapMonth: number) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.leapMonth = leapMonth;
  }
}

class LunarCalendarHelper {
  /**
   * 1998 ~ 2043년
   *
   * 1 => 29일
   *
   * 2 => 30일
   */
  private lunarMonthTable = [
    [2, 1, 1, 2, 3, 2, 2, 1, 2, 2, 2, 1], // 1998
    [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1], // 1999
    [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1], // 2000
    [2, 2, 2, 3, 2, 1, 1, 2, 1, 2, 1, 2], // 2001
    [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1], // 2002
    [2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2], // 2003
    [1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2], // 2004
    [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1], // 2005
    [2, 1, 2, 1, 2, 1, 5, 2, 2, 1, 2, 2], // 2006
    [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2], // 2007
    [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2], // 2008
    [2, 2, 1, 1, 5, 1, 2, 1, 2, 1, 2, 2], // 2009
    [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2], // 2010
    [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1], // 2011
    [2, 1, 6, 2, 1, 2, 1, 1, 2, 1, 2, 1], // 2012
    [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2], // 2013
    [1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 1, 2], // 2014
    [1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1], // 2015
    [2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2], // 2016
    [2, 1, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2], // 2017
    [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2], // 2018
    [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2], // 2019
    [2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2], // 2020
    [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1], // 2021
    [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2], // 2022
    [1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2], // 2023
    [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1], // 2024
    [2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1], // 2025
    [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2], // 2026
    [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2], // 2027
    [1, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1], // 2028
    [2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2], // 2029
    [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1], // 2030
    [2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1], // 2031
    [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2], // 2032
    [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 5, 2], // 2033
    [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1], // 2034
    [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2], // 2035
    [2, 2, 1, 2, 1, 4, 1, 1, 2, 2, 1, 2], // 2036
    [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2], // 2037
    [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1], // 2038
    [2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1], // 2039
    [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1], // 2040
    [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2], // 2041
    [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2], // 2042
    [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2], // 2043
  ];

  private solarMonthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  /**
   * 양력을 음력으로 변환하여 반환한다.
   */
  public solarToLunar(year: string, month: string, day: string): MyDate {
    let startYear = parseInt(year);
    let startMonth = parseInt(month);
    let startDay = parseInt(day);
    /* 기준일자 양력 2000년 1월 1일 (음력 1999년 11월 25일) */

    let solarYear = 2000;
    let solarMonth = 1;
    let solarDay = 1;

    let lunarYear = 1999;
    let lunarMonth = 11;
    let lunarDay = 25;

    let lunarLeapMonth = 0;
    this.solarMonthDay[1] = 29; /* 2000 년 2월 29일 */
    let lunarMonthDay = 30; /* 1999년 11월 30일 */

    let lunarIndex = lunarYear - 1998;

    while (true) {
      // 음력을 찾으면 날짜 반환
      if (
        startYear === solarYear &&
        startMonth === solarMonth &&
        startDay === solarDay
      )
        return new MyDate(lunarYear, lunarMonth, lunarDay, lunarLeapMonth);

      // 양력을 계산한다.
      if (solarMonth === 12 && solarDay === 31) {
        // 다음 년도로 넘어간다.
        solarYear++;
        solarMonth = 1;
        solarDay = 1;

        // 윤년인 경우 2월 29일, 평년인 경우 2월 28일이다.
        if (solarYear % 400 === 0) this.solarMonthDay[1] = 29;
        else if (solarYear % 100 === 0) this.solarMonthDay[1] = 28;
        else if (solarYear % 4 === 0) this.solarMonthDay[1] = 29;
        else this.solarMonthDay[1] = 28;
      } else if (this.solarMonthDay[solarMonth - 1] === solarDay) {
        solarMonth++;
        solarDay = 1;
      } else {
        // 양력 일을 1씩 증가시킨다.
        solarDay++;
      }

      // 음력을 계산한다.
      if (
        lunarMonth === 12 &&
        ((this.lunarMonthTable[lunarIndex][lunarMonth - 1] === 1 &&
          lunarDay === 29) ||
          (this.lunarMonthTable[lunarIndex][lunarMonth - 1] === 2 &&
            lunarDay === 30))
      ) {
        // 다음 년도로 넘어간다.
        lunarYear++;
        lunarMonth = 1;
        lunarDay = 1;

        if (lunarYear > 2043) {
          throw new RangeError("입력하신 달은 없습니다.");
        }

        lunarIndex = lunarYear - 1998;

        if (this.lunarMonthTable[lunarIndex][lunarMonth - 1] === 1)
          lunarMonthDay = 29;
        else if (this.lunarMonthTable[lunarIndex][lunarMonth - 1] === 2)
          lunarMonthDay = 30;
      } else if (lunarDay === lunarMonthDay) {
        // 다음 달로 넘어간다.
        if (
          this.lunarMonthTable[lunarIndex][lunarMonth - 1] >= 3 &&
          lunarLeapMonth === 0
        ) {
          // 윤달 + 1
          lunarDay = 1;
          lunarLeapMonth = 1;
        } else {
          lunarMonth++;
          lunarDay = 1;
          lunarLeapMonth = 0;
        }

        //  lunarMonthDay를 계산한다.
        if (this.lunarMonthTable[lunarIndex][lunarMonth - 1] === 1)
          lunarMonthDay = 29;
        else if (this.lunarMonthTable[lunarIndex][lunarMonth - 1] === 2)
          lunarMonthDay = 30;
        else if (this.lunarMonthTable[lunarIndex][lunarMonth - 1] === 3)
          lunarMonthDay = 29;
        else if (
          this.lunarMonthTable[lunarIndex][lunarMonth - 1] === 4 &&
          lunarLeapMonth === 0
        )
          lunarMonthDay = 29;
        else if (
          this.lunarMonthTable[lunarIndex][lunarMonth - 1] === 4 &&
          lunarLeapMonth === 1
        )
          lunarMonthDay = 30;
        else if (
          this.lunarMonthTable[lunarIndex][lunarMonth - 1] === 5 &&
          lunarLeapMonth === 0
        )
          lunarMonthDay = 30;
        else if (
          this.lunarMonthTable[lunarIndex][lunarMonth - 1] === 5 &&
          lunarLeapMonth === 1
        )
          lunarMonthDay = 29;
        else if (this.lunarMonthTable[lunarIndex][lunarMonth - 1] === 6)
          lunarMonthDay = 30;
      } else {
        // 하루를 1씩 증가시킨다.
        lunarDay++;
      }
    }
  }
  /**
   * 음력을 포맷팅하여 반환한다.
   */
  public displayLunarDate(date: MyDate): string {
    return `${date.year}년 ${date.month}월 ${date.day}일`;
  }
}

export default new LunarCalendarHelper();
