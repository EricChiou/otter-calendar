import { ChangeEvent, FunctionComponent } from 'react';

interface Props {
  time: number;
  onChange(time: number): void;
}

const EditTime: FunctionComponent<Props> = ({ time, onChange }) => {

  function yearOnChange(e: ChangeEvent<HTMLSelectElement>) {
    const date = new Date(time);
    date.setFullYear(Number(e.target.value));
    onChange(date.getTime());
  }

  function monthOnChange(e: ChangeEvent<HTMLSelectElement>) {
    const date = new Date(time);
    date.setMonth(Number(e.target.value));
    date.setDate(1);
    onChange(date.getTime());
  }

  function dateOnChange(e: ChangeEvent<HTMLSelectElement>) {
    const date = new Date(time);
    date.setDate(Number(e.target.value));
    onChange(date.getTime());
  }

  function hourOnChange(e: ChangeEvent<HTMLSelectElement>) {
    const date = new Date(time);
    date.setHours(Number(e.target.value));
    onChange(date.getTime());
  }

  function minuteOnChange(e: ChangeEvent<HTMLSelectElement>) {
    const date = new Date(time);
    date.setMinutes(Number(e.target.value));
    onChange(date.getTime());
  }

  function renderYears(): JSX.Element[] {
    const thisYear = new Date().getFullYear();
    const years: JSX.Element[] = [];
    for (let i = 0; i < 100; i++) {
      years.push(<option key={i} value={thisYear - 50 + i}>{thisYear - 50 + i}</option>);
    }
    return years;
  }

  function renderMonths(): JSX.Element[] {
    const months: JSX.Element[] = [];
    for (let i = 0; i < 12; i++) {
      months.push(<option key={i} value={i}>{`${i < 9 ? '0' : ''}${i + 1}`}</option>);
    }
    return months;
  }

  function renderDates(): JSX.Element[] {
    const year = new Date(time).getFullYear();
    const month = new Date(time).getMonth() + 1;
    const dates: JSX.Element[] = [];
    let days = 31;
    switch (month) {
      case 4: case 6: case 9: case 11:
        days = 30;
        break;
      case 2:
        days = (year % 4 === 0 && (year % 100 !== 0 || (year % 100 === 0 && year % 400 === 0))) ? 29 : 28;
        break;
    }
    for (let i = 0; i < days; i++) {
      dates.push(<option key={i} value={i + 1}>{`${i < 9 ? '0' : ''}${i + 1}`}</option>);
    }
    return dates;
  }

  function renderHours(): JSX.Element[] {
    const hours: JSX.Element[] = [];
    for (let i = 0; i < 24; i++) {
      hours.push(<option key={i} value={i}>{`${i < 10 ? '0' : ''}${i}`}</option>);
    }
    return hours;
  }

  function renderMinutes(): JSX.Element[] {
    const minutes: JSX.Element[] = [];
    for (let i = 0; i < 60; i++) {
      minutes.push(<option key={i} value={i}>{`${i < 10 ? '0' : ''}${i}`}</option>);
    }
    return minutes;
  }

  return (<>
    <select
      className="input"
      value={new Date(time).getFullYear()}
      onChange={yearOnChange}
    >{renderYears()}</select>/
    <select
      className="input"
      value={new Date(time).getMonth()}
      onChange={monthOnChange}
    >{renderMonths()}</select>/
    <select
      className="input"
      value={new Date(time).getDate()}
      onChange={dateOnChange}
    >{renderDates()}</select>
    <span className="mx-1">-</span>
    <select
      className="input"
      value={new Date(time).getHours()}
      onChange={hourOnChange}
    >{renderHours()}</select>:
    <select
      className="input"
      value={new Date(time).getMinutes()}
      onChange={minuteOnChange}
    >{renderMinutes()}</select>
  </>);
};

export default EditTime;
