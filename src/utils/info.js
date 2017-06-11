/**
 * [info description]
 * @return {[ Object ]}
 */
SelfTimer.prototype.info = function() {
  return {
    version: "1.5.0",
    method: {
      on: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Weekdays",
        "Weekend",
        "Selects",
        "Annual",
        "DatesBetween",
        "DatesContain"
      ],
      at: ["Between", "Unless", "Hour", "HoursBetween", "HourSelects"],
      in: ["Day", "Days", "DaysBetween", "Month", "MonthSelects", "Year"],
      is: [
        "True",
        "False",
        "Language",
        "Lang",
        "LanguageSelects",
        "LangSelects",
        "LanguageExcepts",
        "LangExcepts",
        "Mobile"
      ],
      timer: ["After"]
    } // ! method
  }; // ! return
}; // ! SelfTimer.prototype.info
