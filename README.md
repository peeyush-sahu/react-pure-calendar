# React-Pure-Calendar

Awesome calendar for your React App. 

## Installation

React-Pure-Calendar is available as an [npm package](https://www.npmjs.org/package/react-pure-calendar).
```sh
npm install react-pure-calendar
```

Default styles included in styles.css

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
    showToday={true}
    onSelect={(date) => console.log(date)}/>
```

## Dependencies

[React](http://facebook.github.io/react/)

[Moment](https://github.com/moment/moment)

## License

MIT