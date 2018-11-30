import React, {Component} from "react";
import moment from 'moment';
import "./styles.css";

class Calendar extends Component {
    constructor(props) {
        super(props);
        let defaultDate = this.props.defaultDate;
        this.state = {
            today: new Date(),
            currDate: new Date().getDate(),
            selectedDate: parseInt(moment(defaultDate).format("DD")),
            currDay: new Date().getDay(),
            currMonth: parseInt(moment(defaultDate).format("M")) - 1 || new Date().getMonth(),
            currYear: parseInt(moment(defaultDate).format("YYYY")) || new Date().getFullYear(),
            months: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],
            showMonth: false,
            showYear: false,
            yearsArr: []
        };
    }

    componentDidMount() {
        this.showCalendar();
    }

    nextMonth = () => {
        const {currMonth, currYear} = this.state;
        this.setState({
            currYear: currMonth === 11
                ? currYear + 1
                : currYear,
            currMonth: (currMonth + 1) % 12
        }, () => {
            this.showCalendar()
        });
    };

    previousMonth = () => {
        const {currMonth, currYear} = this.state;
        this.setState({
            currYear: currMonth === 0
                ? currYear - 1
                : currYear,
            currMonth: currMonth === 0
                ? 11
                : currMonth - 1
        }, () => {
            this.showCalendar()
        });
    };

    nextYear = () => {
        const {currYear} = this.state;
        this.setState({
            currYear: currYear + 1
        }, () => {
            this.showCalendar()
        });
    };

    previousYear = () => {
        const {currYear} = this.state;
        this.setState({
            currYear: currYear - 1
        }, () => {
            this.showCalendar()
        });
    };

    previousYears = () => {
        const {yearsArr} = this.state;
        let firstElement = yearsArr[0] - 12;
        let years = [];
        for (let i = 0; i < 12; i++) {
            years[i] = firstElement + i;
        }
        this.setState({
            yearsArr: years
        }, () => {
            this.showCalendar()
        });
    }

    nextYears = () => {
        const {yearsArr} = this.state;
        let firstElement = yearsArr[11] + 1;
        let years = [];
        for (let i = 0; i < 12; i++) {
            years[i] = firstElement + i;
        }
        this.setState({
            yearsArr: years
        }, () => {
            this.showCalendar()
        });
    }

    showCalendar = () => {
        const {currMonth, currYear, today, selectedDate} = this.state;
        const {minDate, maxDate, format, disabledDays, disabledDates} = this.props;
        let firstDay = new Date(currYear, currMonth).getDay();
        let daysInMonth = 32 - new Date(currYear, currMonth, 32).getDate();
        let tbl = document.getElementById("calendar-body");
        tbl.innerHTML = "";
        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement("tr");
            for (let j = 0; j < 7; j++) {

                if (i === 0 && j < firstDay) {
                    let cell = document.createElement("td");
                    let cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    let cell = document.createElement("td");
                    let cellDiv = document.createElement("div");
                    cellDiv
                        .classList
                        .add("c_cell");

                    let CurrDate = moment(`${currYear},${currMonth + 1},${date}`);
                    if (minDate) {
                        let MinDate = moment(`${this.getFormattedDate(minDate).yr},${this.getFormattedDate(minDate).mt},${this.getFormattedDate(minDate).dt}`);
                        if (CurrDate < MinDate) {
                            cellDiv
                                .classList
                                .add("disabled");
                        }
                    }

                    if (maxDate) {
                        let MaxDate = moment(`${this.getFormattedDate(maxDate).yr},${this.getFormattedDate(maxDate).mt},${this.getFormattedDate(maxDate).dt}`);
                        if (CurrDate > MaxDate) {
                            cellDiv
                                .classList
                                .add("disabled");
                        }
                    }

                    if (disabledDays) {
                        for (let d = 0; d < disabledDays.length; d++) {
                            if (j === disabledDays[d]) {
                                cellDiv
                                    .classList
                                    .add("disabled");
                            }
                        }
                    }

                    if (disabledDates) {
                        for (let dd = 0; dd < disabledDates.length; dd++) {
                            if (this.getFormattedDate(disabledDates[dd]).dt === date && (this.getFormattedDate(disabledDates[dd]).mt - 1) === currMonth && this.getFormattedDate(disabledDates[dd]).yr === currYear) {
                                cellDiv
                                    .classList
                                    .add("disabled");
                            }
                        }
                    }

                    let text = date;
                    if (!cellDiv.classList.contains("disabled")) {
                        cellDiv.onclick = () => {
                            this.getValue(text, format);
                        };
                    }

                    if (date === today.getDate() && currYear === today.getFullYear() && currMonth === today.getMonth()) {
                        cellDiv
                            .classList
                            .add("currDate");
                    }

                    if (selectedDate && date === selectedDate && (parseInt(moment(this.props.defaultDate).format("M")) - 1) === currMonth && parseInt(moment(this.props.defaultDate).format("YYYY")) === currYear) {
                        cellDiv
                            .classList
                            .add("selectedDate");
                    }

                    let cellText = document.createTextNode(date);
                    cellDiv.appendChild(cellText);
                    cell.appendChild(cellDiv);
                    row.appendChild(cell);
                    date++;
                }
            }

            tbl.appendChild(row);
        }
    }

    getFormattedDate = (date) => {
        let dt = parseInt(`${date.split("")[6]}${date.split("")[7]}`);
        let mt = parseInt(`${date.split("")[4]}${date.split("")[5]}`);
        let yr = parseInt(`${date.split("")[0]}${date.split("")[1]}${date.split("")[2]}${date.split("")[3]}`);
        let value = {
            dt,
            mt,
            yr
        }
        return value;
    }

    getValue = (val, format) => {
        const {currMonth, currYear} = this.state;
        const {onSelect} = this.props;
        if (val <= 1 || val <= 9) {
            val = `0${val}`;
        }
        onSelect(moment(`${currYear}${currMonth + 1}${val}`).format(format));
    }

    showMonths = () => {
        this.setState({showMonth: true});
    };

    showYears = () => {
        const {currYear} = this.state;
        this.setState({showYear: true});
        let years = [];
        for (let i = 0; i < 12; i++) {
            years[i] = currYear + i;
        }
        this.setState({yearsArr: years});
    }

    setMonth = (val) => {
        this.setState({
            currMonth: val,
            showMonth: false
        }, () => {
            this.showCalendar()
        });
    }

    setYear = (val) => {
        this.setState({
            currYear: val,
            showMonth: false,
            showYear: false,
            yearsArr: []
        }, () => {
            this.showCalendar()
        });
    }

    showToday = () => {
        this.setState({
            currMonth: new Date().getMonth(),
            currYear: new Date().getFullYear(),
            showMonth: false,
            showYear: false,
            yearsArr: []
        }, () => {
            this.showCalendar()
        })
    }

    render() {
        const {
            months,
            showMonth,
            currMonth,
            currYear,
            showYear,
            yearsArr
        } = this.state;
        const {showToday} = this.props;
        return (
            <div className="calendarCont">
                <div className="calendarHeader">
                    <div>
                        {!showYear && <button
                            title="Previous Year"
                            className="btn"
                            id="prevYearBtn"
                            onClick={this.previousYear}></button>}
                        {!showMonth && !showYear && <button
                            title="Previous Month"
                            className="btn"
                            id="prevMonthBtn"
                            onClick={this.previousMonth}></button>}
                        {showYear && <button
                            title="Previous Years"
                            className="btn"
                            id="prevYearsBtn"
                            onClick={this.previousYears}></button>}
                    </div>
                    <div className="rowEnd">
                        {!showMonth && !showYear && <a href="#foo" className="link monthLink" onClick={this.showMonths}>{months[currMonth]}</a>}
                        {!showYear && <a href="#bar" className="link yearLink" onClick={this.showYears}>{currYear}</a>}
                        {showYear && <a href="#bar" className="link yearLink" onClick={this.showYearsRange}>{`${yearsArr[0]} - ${yearsArr[11]}`}</a>}
                    </div>
                    <div>
                        {!showMonth && !showYear && <button
                            title="Next Month"
                            className="btn"
                            id="nextMonthBtn"
                            onClick={this.nextMonth}></button>}
                        {!showYear && <button
                            title="Next Year"
                            className="btn"
                            id="nextYearBtn"
                            onClick={this.nextYear}></button>}
                        {showYear && <button
                            title="Next Years"
                            className="btn"
                            id="nextYearsBtn"
                            onClick={this.nextYears}></button>}
                    </div>
                </div>
                <div className="calendarBody">
                    <div
                        className={showYear
                        ? "yearsCont show"
                        : "yearsCont"}>
                        {yearsArr.map((y, i) => (
                            <a
                                href="#baz"
                                className={y === currYear
                                ? "currYear"
                                : ""}
                                key={i}
                                onClick={() => this.setYear(y)}>
                                <span>{y}</span>
                            </a>
                        ))}</div>
                    <div
                        className={showMonth
                        ? "monthsCont show"
                        : "monthsCont"}>
                        {months.map((m, i) => (
                            <a
                                href="#baz"
                                className={i === currMonth
                                ? "currMonth"
                                : ""}
                                key={i}
                                onClick={() => this.setMonth(i)}>
                                <span>{m}</span>
                            </a>
                        ))}
                    </div>
                    <table className="calendarTable">
                        <thead>
                            <tr>
                                <th>Su</th>
                                <th>Mo</th>
                                <th>Tu</th>
                                <th>We</th>
                                <th>Th</th>
                                <th>Fr</th>
                                <th>Sa</th>
                            </tr>
                        </thead>
                        <tbody id="calendar-body"></tbody>
                    </table>
                </div>
                {showToday && <div className="todayCont" onClick={this.showToday}>Today</div>}
            </div>
        );
    }
}

export default Calendar;