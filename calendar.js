var Calendar = require('calendar').Calendar;

// We create a new calendar and pass 1 to indicate that the week starts on Monday
var cal = new Calendar(1);

// Months use a zero based index
var aug2015 = cal.monthDays(2015, 7);

// We can access a particular week, since aug2015 is an array of arrays with each week
var thisWeek = aug2015[1];

console.log(thisWeek);