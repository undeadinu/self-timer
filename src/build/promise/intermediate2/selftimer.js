!function(e){function n(){}function t(e,n){return function(){e.apply(n,arguments)}}function o(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],s(e,this)}function i(e,n){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(n):(e._handled=!0,void o._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null===t)return void(1===e._state?r:u)(n.promise,e._value);var o;try{o=t(e._value)}catch(i){return void u(n.promise,i)}r(n.promise,o)}))}function r(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var i=n.then;if(n instanceof o)return e._state=3,e._value=n,void f(e);if("function"==typeof i)return void s(t(i,n),e)}e._state=1,e._value=n,f(e)}catch(r){u(e,r)}}function u(e,n){e._state=2,e._value=n,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var n=0,t=e._deferreds.length;n<t;n++)i(e,e._deferreds[n]);e._deferreds=null}function c(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}function s(e,n){var t=!1;try{e(function(e){t||(t=!0,r(n,e))},function(e){t||(t=!0,u(n,e))})}catch(o){if(t)return;t=!0,u(n,o)}}var a=setTimeout;o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var o=new this.constructor(n);return i(this,new c(e,t,o)),o},o.all=function(e){var n=Array.prototype.slice.call(e);return new o(function(e,t){function o(r,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var f=u.then;if("function"==typeof f)return void f.call(u,function(e){o(r,e)},t)}n[r]=u,0===--i&&e(n)}catch(c){t(c)}}if(0===n.length)return e([]);for(var i=n.length,r=0;r<n.length;r++)o(r,n[r])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(n){n(e)})},o.reject=function(e){return new o(function(n,t){t(e)})},o.race=function(e){return new o(function(n,t){for(var o=0,i=e.length;o<i;o++)e[o].then(n,t)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){a(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},o._setImmediateFn=function(e){o._immediateFn=e},o._setUnhandledRejectionFn=function(e){o._unhandledRejectionFn=e},"undefined"!=typeof module&&module.exports?module.exports=o:e.Promise||(e.Promise=o)}(this);
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.SelfTimer = factory();
  }
}(this, function() {
"use strict";

/**
 * [SelfTimer description]
 * @param {[type]} date [description]
 */
function SelfTimer(date) {
  this.D = date;
}

/**
 * [helpers description]
 * @return {[type]} [description]
 */
SelfTimer.prototype.helpers = function() {
  var _current = this.D;
  var _day = this.D.getDay();

  /**
     * [__checkIsValid description]
     * @param  {[type]} variable [description]
     * @return {[type]}          [description]
     */
  var __checkIsValid = function(variable) {
    return typeof variable == "function" || variable == undefined
      ? true
      : false;
  };

  /**
     * [ check contain object in array ]
     * @param  {[ Array ]} array
     * @param  {[ Any ]} object
     * @return {[ Bool ]}
     * Ref: http://stackoverflow.com/a/237176/2704539
     * @exp __contains(array, 7)
     */
  var __contains = function(array, object) {
    var i = array.length;

    while (i--) {
      if (array[i] === object) return true;
    }

    return false;
  }; // ! __contains()

  /**
     * [ Replace a strings to individual numbers in array ]
     * @param  {[ Array ]} arr
     * @return {[ Array ]}
     */
  var __dayOfTheWeekStringToNumber = function(arr) {
    return arr
      .map(function(res) {
        return res.replace(/Sun/g, 0);
      })
      .map(function(res) {
        return res.replace(/Mon/g, 1);
      })
      .map(function(res) {
        return res.replace(/Tue/g, 2);
      })
      .map(function(res) {
        return res.replace(/Wed/g, 3);
      })
      .map(function(res) {
        return res.replace(/Thu/g, 4);
      })
      .map(function(res) {
        return res.replace(/Fri/g, 5);
      })
      .map(function(res) {
        return res.replace(/Sat/g, 6);
      })
      .map(function(res) {
        return parseInt(res);
      });
  }; // ! __dayOfTheWeekStringToNumber()

  /**
     * @param  {[ String ]} d [ Timeformat * 8:30 AM, 5:00 pm]
     * @return {[String]}   [description]
     * Ref: http://stackoverflow.com/a/26078713/2704539
     */
  var __timeObject = function(d) {
    var parts = d.split(/:|\s/), date = new Date();

    if (parts.pop().toLowerCase() == "pm") parts[0] = +parts[0] + 12;

    date.setHours(+parts.shift());
    date.setMinutes(+parts.shift());
    return date;
  }; // ! __timeObject()

  /**
     * @param  {[ Integer ]} start
     * @param  {[ Integer ]} count
     * @return {[ Array ]}
     * Ref: http://stackoverflow.com/a/3746752/2704539
     */
  var __range = function(start, count) {
    if (arguments.length == 1) {
      count = start;
      start = 0;
    }

    var arr = [];

    for (var i = 0; i < count; i++) {
      arr.push(start - i);
    }

    return arr;
  }; // ! __range()

  /**
     * @param  {[ Date ]} from
     * @param  {[ Date ]} to
     * @param  {[ Date ]} current
     * @return {[ Bool ]}
     */
  var __dateCompare = function(from, to, current) {
    return current < to.setDate(to.getDate() + 1) && current > from
      ? true
      : false;
  }; // ! __dateCompare()

  /**
    * @param  {[ Integer ]} from
    * @param  {[ Integer ]} to
    * @return {[ String]}      [ splieted Date]
    * Ref: http://stackoverflow.com/a/23593099/2704539
    */
  var __dateString = function() {
    var month = _current.getMonth() + 1;
    var day = _current.getDate();

    if (month.length < 2) month = "0" + month;

    if (day.length < 2) day = "0" + day;

    return [month, day].join("-");
  }; // ! __dateString()

  /**
   ** @param {[ String ]} type
    * @return {[Integer || bool]}
    */
  var __typeToMilliseconds = function(type) {
    var response;

    switch (type) {
      // a second
      case "s":
      case "sec":
      case "second":
      case "seconds":
        response = 1000;
        break;

      // a minute
      case "m":
      case "min":
      case "minute":
      case "minutes":
        response = 60000;
        break;

      default:
        response = false;
        break;
    } // ! switch()

    return response;
  }; // ! __typeToMilliseconds()

  // Register methods
  var REGISTER = {
    __checkIsValid: __checkIsValid,
    __contains: __contains,
    __dayOfTheWeekStringToNumber: __dayOfTheWeekStringToNumber,
    __timeObject: __timeObject,
    __range: __range,
    __dateCompare: __dateCompare,
    __dateString: __dateString,
    __typeToMilliseconds: __typeToMilliseconds
  };

  return REGISTER;
};

SelfTimer.prototype.messages = function() {
  return {
    day: "Error: A day should be less than 31",
    month: "Error: month should be untll 12",
    date: "Error: date format shoud be MM-DD",
    year: "Error: date format shoud be 20YY",
    monthBetween: "Error: start of month should be less than end of month",
    startHour: "Error: start hour should be less than 23",
    endHour: "Error: end hour should be until 23",
    hourFormat: "Error: hours should be numberic",
    isNotValidHour: "Error: hour should be until 23",
    startDay: "Error: start day should be less than 30",
    endDay: "Error: end day should be untill 31",
    time: "Error: invalid time format. time should be [hh:mm AM or PM]",
    isNotArray: "Error: first argument shold be Array",
    dateGrater: "start date should not be grater than end-of -date",
    dateSameDay: "start and end date are should not be same date "
  };
};

SelfTimer.prototype.formats = function() {
  return {
    date: /^(1[0-2]|[1-9])-([1-9]|[12]\d|3[0-1])$/,
    year: /^[2][0][1-9]{2}$/,
    annual: /^[2]{1}[0]{1}[1-3]{1}[0-9]{1}-[01]{1}[0-9]{1}-[0-3]{1}[0-9]{1}$/,
    time: /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/
  };
};

/**
 * [on description]
 * @return {[ Methods ]}
 */
SelfTimer.prototype.on = function(condition) {
  var _Condition = condition;

  // Private Variables
  var _current = this.D;
  var _day = this.D.getDay();
  var _message = this.messages();
  var _helper = this.helpers();
  var _format = this.formats();

  /**
     * [ Sunday description ]
     * @return {[ Resolve ]}
     */
  var Sunday = function() {
    return new Promise(function(resolve, reject) {
      return _day === 0
        ? resolve(true)
        : _Condition === true ? reject(false) : false;
    }); // ! Promise()
  }; // ! Sunday()

  /**
     * [ Monday description ]
     * @return {[ Resolve ]}
     */
  var Monday = function() {
    return new Promise(function(resolve, reject) {
      return _day === 1
        ? resolve(true)
        : _Condition === true ? reject(false) : false;
    }); // ! Promise()
  }; // ! Monday()

  /**
     * [ Tuesday description ]
     * @return {[ Resolve ]}
     */
  var Tuesday = function() {
    return new Promise(function(resolve, reject) {
      return _day === 2
        ? resolve(true)
        : _Condition === true ? reject(false) : false;
    }); // ! Promise()
  }; // ! Tuesday()

  /**
     * [Wednesday description]
     * @return {[ Resolve ]}
     */
  var Wednesday = function() {
    return new Promise(function(resolve, reject) {
      return _day === 3
        ? resolve(true)
        : _Condition === true ? reject(false) : false;
    }); // ! Promise()
  }; // ! Wednesday()

  /**
     * [ Thursday description ]
     * @return {[ Resolve ]}
     */
  var Thursday = function() {
    return new Promise(function(resolve, reject) {
      return _day === 4
        ? resolve(true)
        : _Condition === true ? reject(false) : false;
    }); // ! Promise()
  }; // ! Thursday()

  /**
     * [ Friday description ]
     * @return {[ Resolve ]}
     */
  var Friday = function() {
    return new Promise(function(resolve, reject) {
      return _day === 5
        ? resolve(true)
        : _Condition === true ? reject(false) : false;
    }); // ! Promise()
  }; //! Friday()

  /**
     * [ Saturday description ]
     * @return {[ Resolve ]}
     */
  var Saturday = function() {
    return new Promise(function(resolve, reject) {
      return _day === 6
        ? resolve(true)
        : _Condition === true ? reject(false) : false;
    }); // ! Promise()
  }; // ! Saturday()

  /**
     * @param {[ Array ]} weekOfDay
     *                   [ Sun, Mon, Tue, Wed, Thu, Fri, Sat]
     * @return {[ Resolve ]}
     */
  var Selects = function(daysOfTheWeek) {
    return new Promise(function(resolve, reject) {
      try {
        if (!Array.isArray(daysOfTheWeek)) throw _message.isNotArray;

        // convert Date to week-number
        var arr = _helper.__dayOfTheWeekStringToNumber(daysOfTheWeek);

        return _helper.__contains(arr, _day)
          ? resolve(true)
          : _Condition === true ? reject(false) : false;
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! Selects()

  /**
     * [ This method is implement on Monday to Friday ]
     * @return {[ Resolve ]}
     */
  var Weekdays = function() {
    return new Promise(function(resolve, reject) {
      // Monday to Friday
      var dayOfTheWeek = [1, 2, 3, 4, 5];

      return _helper.__contains(dayOfTheWeek, _day)
        ? resolve(true)
        : _Condition === true ? reject(false) : false;
    }); // ! Promise()
  }; // ! Weekdays()

  /**
     * [ This method is implement on Saturday and Sunday ]
     * @return {[ Resolve ]}
     */
  var Weekend = function() {
    return new Promise(function(resolve, reject) {
      // Sunday to Saturday
      var dayOfTheWeek = [0, 6];

      return _helper.__contains(dayOfTheWeek, _day)
        ? resolve(true)
        : _Condition === true ? reject(false) : false;
    }); // ! Promise()
  }; // ! Weekend()

  /**
     * @param {[ String ]} date [MM-dd]
     * @return {[ Resolve ]}
     */
  var Annual = function(date) {
    return new Promise(function(resolve, reject) {
      try {
        if (!date.match(_format.date)) throw _message.date;

        return date == _helper.__dateString()
          ? resolve(true)
          : _Condition === true ? reject(false) : false;
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! Annual()

  /**
   * [dateBetween description]
   * @param  {[ String ]} from [ * YYYY-MM-DD ]
   * @param  {[ String]} to   [ * YYYY-MM-DD ]
   * @return {[ Resolve ]}
   */
  var DatesBetween = function(from, to) {
    return new Promise(function(resolve, reject) {
      var start = new Date(from);
      var end = new Date(to);

      try {
        if (start > end) throw _message.dateGrater;

        if (start == end) throw _message.dateSameDay;

        return _helper.__dateCompare(start, end, _current)
          ? resolve(true)
          : _Condition === true ? reject(false) : false;
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! DatesBetween()

  /**
   * [ check if dates is contained ]
   * @param  {[ Array ]} dates [ * YYYY-MM-DD ]
   * @return {[ Resolve ]}
   */
  var DatesContain = function(dates) {
    return new Promise(function(resolve, reject) {
      try {
        if (!Array.isArray(dates)) throw _message.isNotArray;

        return _helper.__contains(dates, _current.toISOString().slice(0, 10))
          ? resolve(true)
          : _Condition === true ? reject(false) : false;
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! DatesContain()

  // Register methods
  var REGISTER = {
    Sunday: Sunday,
    Monday: Monday,
    Tuesday: Tuesday,
    Wednesday: Wednesday,
    Thursday: Thursday,
    Friday: Friday,
    Saturday: Saturday,
    Selects: Selects,
    Weekdays: Weekdays,
    Weekend: Weekend,
    Annual: Annual,
    DatesBetween: DatesBetween,
    DatesContain: DatesContain
  };

  return REGISTER;
};

/**
 * [at as Promise]
 * @type {[type]}
 */
SelfTimer.prototype.at = function(condition) {
  var _Condition = condition;

  /**
   * private variables
   */
  var _Current = this.D;
  var _day = this.D.getDay();
  var _hour = this.D.getHours();
  var _message = this.messages();
  var _helper = this.helpers();
  var _format = this.formats();

  /**
     * [ at().Between description ]
     * @param  {[ String ]} from [ time format * hh:mm ]
     * @param  {[ String ]} to   [ time format * hh:mm ]
     * @return {[ Resolve }
     */
  var Between = function(from, to) {
    return new Promise(function(resolve, reject) {
      try {
        // check time format for start time
        if (!from.match(_format.time)) throw _message.time + "at start";

        // check time format for end time
        if (!to.match(_format.time)) throw _message.time + " at end";

        // check if current time is available
        var available = _Current < _helper.__timeObject(to) &&
          _Current > _helper.__timeObject(from)
          ? true
          : false;

        return available
          ? resolve(true)
          : _Condition === true ? reject(false) : false;
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! Between()

  /**
     * [ at().Unless description]
     * @param {[ String ]} from [ time format * hh:mm ]
     * @param {[ String ]} to [ time format * hh:mm ]
     * @return {[ Resolve ]}
     */
  var Unless = function(from, to) {
    return new Promise(function(resolve, reject) {
      try {
        // check time format for start time
        if (!from.match(_format.time)) throw _message.time + "at start";

        // check time format for end time
        if (!to.match(_format.time)) throw _message.time + " at end";

        // check if current time is available
        var available = _Current < _helper.__timeObject(to) &&
          _Current > _helper.__timeObject(from)
          ? true
          : false;

        return available
          ? _Condition === true ? reject(false) : false
          : resolve(true);
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! Unless()

  /**
     * [ at().Hour description]
     * @param  {[ Integer ]} hour [ 0 - 23 ]
     * @return {[ Resolve ]}
     */
  var Hour = function(hour) {
    return new Promise(function(resolve, reject) {
      var time = parseInt(hour);

      try {
        if (time > 23) throw _message.startHour;

        return time === _hour
          ? resolve(true)
          : _Condition === true ? reject(false) : false;
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! Hour()

  /**
     * PASS!
     * [ at().HoursBetween description ]
     * @param  {[ Integer ]} from [ Start hour 0-23 ]
     * @param  {[ Integer ]} to   [ End hour 0 - 23 ]
     * @return {[ Resolve ]}
     */
  var HoursBetween = function(from, to) {
    return new Promise(function(resolve, reject) {
      var start = parseInt(from);
      var end = parseInt(to);

      try {
        if (start > 23) throw _message.startHour;

        if (end > 23) throw _message.endHour;

        var arr = _helper.__range(end, end - start);
        arr.push(from);

        return _helper.__contains(arr, _hour)
          ? resolve(true)
          : _Condition === true ? reject(false) : false;
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! HoursBetween()

  /**
    * [ at().HourSelects ]
    * @param  {[ Array ]} hours [ 0-23 ]
    * @return {[ Resolve ]}
    */
  var HourSelects = function(hours, task) {
    return new Promise(function(resolve, reject) {
      try {
        if (!Array.isArray(hours)) throw _message.isNotArray;
        // check array elements if numberic
        if (!hours.some(isNaN) != true) throw _message.hourFormat;

        var array = hours.map(function(res) {
          // convert elemetnts to Integer in array
          return parseInt(res);
        });

        array.map(function(res) {
          // check elements if valid hour format
          if (res > 23) throw _message.isNotValidHour;
        });

        return _helper.__contains(array, _hour)
          ? resolve(true)
          : _Condition === true ? reject(false) : false;
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! HourSelects()

  // Register methods
  var REGISTER = {
    Between: Between,
    Unless: Unless,
    Hour: Hour,
    HoursBetween: HoursBetween,
    HourSelects: HourSelects
  };

  return REGISTER;
};

/**
 * [promise in ]
 */
SelfTimer.prototype.in = function(condition) {
  var _Condition = condition;

  // private variables
  var _message = this.messages();
  var _helper = this.helpers();
  var _format = this.formats();

  var _current = this.D;
  var _date = this.D.getDate();
  var _month = this.D.getMonth() + 1;
  var _year = this.D.getFullYear();

  /**
     * @param {[ Integer ]} day [* less than 31]
     * @return {[ Resolve ]}
     */
  var Day = function(day) {
    return new Promise(function(resolve, reject) {
      try {
        if (parseInt(day) > 31) throw __message.day;

        var num = day < 10 ? "0" + day : day;

        return day == _date
          ? resolve(true)
          : _Condition === true ? reject(false) : false;
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! Day()

  /**
     * [ in().Days description ]
     * @param  {[ Array ]} days [description]
     * @return {[ Resolve ]}      [description]
     */
  var Days = function(days) {
    return new Promise(function(resolve, reject) {
      try {
        if (!Array.isArray(days)) throw _message.isNotArray;

        var array = days.map(function(res) {
          // convert elemetnts to Integer in array
          return parseInt(res);
        });

        return _helper.__contains(array, _date)
          ? resolve(true)
          : _Condition === true ? reject(false) : false;
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! Days()

  /**
     * @param  {[ Integer ]} from
     * @param  {[ Integer ]} to
     * @return {[ Resolve ]}
     */
  var DaysBetween = function(from, to) {
    return new Promise(function(resolve, reject) {
      try {
        var start = parseInt(from);
        var end = parseInt(to);

        if (start > 30) throw _message.startDay;

        if (end > 31) throw _message.endDay;

        var arr = _helper.__range(end, end - start);
        arr.push(from);

        return _helper.__contains(arr, _date)
          ? resolve(true)
          : _Condition === true ? reject(false) : false;
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! DaysBetween()

  /**
     * @param {[ Integer ]} month
     * @return {[ Resolve ]}
     */
  var Month = function(month) {
    return new Promise(function(resolve, reject) {
      try {
        if (parseInt(month) > 12) throw _message.month;

        var num = month < 10 ? "0" + month : month;

        return num == _month
          ? resolve(true)
          : _Condition === true ? reject(false) : false;
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! Month()

  /**
     * [MonthSelects description]
     * @param  {[ Integer ]} months
     * @return {[ Resolve ]}
     */
  var MonthSelects = function(months) {
    return new Promise(function(resolve, reject) {
      try {
        if (!Array.isArray(months)) throw _message.isNotArray;

        return _helper.__contains(months, _month)
          ? resolve(true)
          : _Condition === true ? reject(false) : false;
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! MonthSelects

  /**
     * @param {[ Integer ]} year
     * @return {[ Function ]}
     */
  var Year = function(year) {
    return new Promise(function(resolve, reject) {
      try {
        if (!year.toString().match(_format.year)) throw _message.year;

        return year == _year
          ? resolve(true)
          : _Condition === true ? reject(false) : false;
      } catch (e) {
        console.error(e);
        return;
      }
    }); // ! Promise()
  }; // ! Year()

  // register methods
  var REGISTER = {
    Day: Day,
    Days: Days,
    DaysBetween: DaysBetween,
    Month: Month,
    MonthSelects: MonthSelects,
    Year: Year
  };

  return REGISTER;
};

/**
 * [is() promise]
 */
SelfTimer.prototype.is = function(condition) {
  var _Condition = condition;

  /**
     * [ if status is true, return callback ]
     * @param {[ Bool ]} status
     * @param {[ Bool ]} condition
     * @return {[ Resolve ]}
     */
  var True = function(status) {
    return new Promise(function(resolve, reject) {
      return status
        ? resolve(true)
        : _Condition === true ? reject(false) : false;
    }); // ! Promise()
  }; // ! True()

  /**
     * - browser only! -
     * [ if status is false, return callback ]
     * @param {[ Bool ]} status
     * @param {[ Bool ]} condition
     * @return {[ Resolve ]}
     */
  var False = function(status) {
    return new Promise(function(resolve, reject) {
      return status
        ? _Condition === true ? reject(false) : false
        : resolve(true);
    }); // ! Promise()
  }; // ! False()

  /**
     * - browser only! -
     * [ if mutch browser language value, return callback ]
     * @param {[ String ]} lang
     * @param {[ Bool ]} condition
     * @return {[ Resolve ]}
     * @coderef https://msdn.microsoft.com/en-us/library/ms533052(v=vs.85).aspx
     */
  var Language = function(lang) {
    return new Promise(function(resolve, reject) {
      var detect = navigator.userLanguage === "undefined"
        ? navigator.userLanguage
        : navigator.language;

      return lang == detect
        ? resolve(true)
        : _Condition === true ? reject(false) : false;
    }); // ! Promise()
  }; // ! Language()

  /**
    * [ if match browser language value, return callback, but this one enable short value ]
    * @param {[ String ]} lang
    * @param {[ Bool ]} condition
    * @return {[ Function ]}
     */
  var Lang = function(lang) {
    return new Promise(function(resolve, reject) {
      var detect = navigator.userLanguage === "undefined"
        ? navigator.userLanguage
        : navigator.language;

      return lang == detect.slice(0, 2)
        ? resolve(true)
        : _Condition === true ? reject(false) : false;
    }); // ! Proimse
  }; // ! Lang()

  // register methods
  var REGISTER = {
    True: True,
    False: False,
    Language: Language,
    Lang: Lang
  };

  return REGISTER;
};

return SelfTimer;
}));
