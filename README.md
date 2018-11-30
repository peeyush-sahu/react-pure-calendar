# React-Pure-Calendar

Awesome calendar for your React App. 

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/peeyush-sahu/react-pure-calendar/graphs/commit-activity)

## Installation

React-Pure-Calendar is available as an [npm package](https://www.npmjs.org/package/react-pure-calendar).
```sh
npm install react-pure-calendar
```

Default styles included in styles.css

## Demo

[![Edit React Pure Calendar Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/3qw6p387r5)

## How to Use

```javascript
import Calendar from 'react-pure-calendar';
<Calendar
    format="DD-MMM-YYYY"
    defaultDate="20181109"
    disabledDays={[0]}
    disabledDates={["20181208"]}
    minDate=""
    maxDate=""
    currDateClass=""
    selectedDateClass=""
    showToday={true}
    onSelect={(date) => console.log(date)}/>
```

## Props

#### format
 - `String`
 - `Required`
 - Allowed Keys: All formats supported by [moment.js](http://momentjs.com/docs/#/parsing/string-format/)
 
 ### defaultDate
 - `String`
 - To show a default Date
 - Always enter in this format `YYYYMMDD`
 
 ### disabledDays
 - `Array` of days
 - `0` - Sunday, `1` - Monday, `2` - Tuesday, `3` - Wednesday, `4` - Thursday, `5` - Friday, `6` - Saturday
 
 ### disabledDates
 - `Array` of dates
 - Format `YYYYMMDD`
 - The dates you want to disable
 
 ### minDate
 - Format `YYYYMMDD`
 - Date from where user can select dates; before that all dates will be disabled
 
 ### maxDate
 - Format `YYYYMMDD`
 - Date from where user cannot select dates; after that all dates will be disabled
 
 ### currDateClass
 - `String`
 - class to style `current` date
 
 ### selectedDateClass
 - `String`
 - class to style `selected` date
 
 ### showToday
 - `Boolean`
 - Whether to show `Today` link
 
 ### onSelect
 - `Function`
 - Returns a `Date`. You can pass your function use the Date.

## Dependencies

[React](http://facebook.github.io/react/)

[Moment](https://github.com/moment/moment)

## License

MIT
