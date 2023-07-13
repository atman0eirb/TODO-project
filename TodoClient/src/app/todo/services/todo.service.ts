import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }


  FormatDate(dateString: string) {

    const dateParts = dateString.split('-');
    let year, month, day;
    year = dateParts[2];
    month = dateParts[1];
    day = dateParts[0];
    month = month;
    const Date = year + '-' + month + '-' + day;
    return Date;
  }

  isValidDate(dateString: string): boolean {

    const dateParts = dateString.split('-');
    let year, month, day;

    year = parseInt(dateParts[0]);
    month = parseInt(dateParts[1])-1;
    day = parseInt(dateParts[2]);

    const currentDate = new Date();
    const inputDate = new Date(year, month, day);

    return !isNaN(inputDate.getTime()) && inputDate >= currentDate;
  }

  isDateBetween(date: string, min: number, max: number): boolean {

    const currentDate = new Date();
    const selectedDateParts = date.split('-');
    const selectedDay = parseInt(selectedDateParts[0]);
    const selectedMonth = parseInt(selectedDateParts[1]);
    const selectedYear = parseInt(selectedDateParts[2]);
    const selectedDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
    const timeDifference = selectedDate.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24)) + 1;
    return min <= daysDifference && daysDifference <= max;
  }

}
