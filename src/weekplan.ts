import {
    btn,
    searchInput,
    unl,
    options,
    Datum,
    options2,
    options3,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    dataNotFound,
    fridayOutput,
    thursdayOutput,
  } from "./dom-utils";
  import { lectureentry } from "./interfaces";
  import {
    displayOutput,
    searchByDate,
    searchByDateAndName,
    searchByName,
  } from "./search";

export function weeklyOutputFiller(
    data: lectureentry[],
    dateFormatToday: Date,
    curentCourseStart: string,
    lesson: any,
    currentDate: string,
    currentCourse: string
  ) {
    let mon: number;
    let tue: number;
    let wed: number;
    let fri: number;
    let thu: number;
  
    if (currentDate === currentCourse) {
      switch (dateFormatToday.getDay()) {
        case 1:
          mon = 0;
          tue = 1;
          wed = 2;
          thu = 3;
          fri = 4; 
          dayOutput(mon, tue, wed, thu, fri, data);
  
          break;
        case 2:
          mon = -1;
          tue = 0;
          wed = 1;
          thu = 2;
          fri = 3;
          dayOutput(mon, tue, wed, thu, fri, data);
          break;
  
        case 3:
          mon = -2;
          tue = -1;
          wed = 0;
          thu = 1;
          fri = 2;
          dayOutput(mon, tue, wed, thu, fri, data);
          break;
  
        case 4:
          mon = -3;
          tue = -2;
          wed = -1;
          thu = 0;
          fri = 1;
          dayOutput(mon, tue, wed, thu, fri, data);
          break;
        case 5:
          mon = -4;
          tue = -3;
          wed = -2;
          thu = -1;
          fri = 0;
          dayOutput(mon, tue, wed, thu, fri, data);
          break;
      }
    }
  }

  export function lessonOnDay(
    lectures: lectureentry[],
    numberofDays: number,
    weekday: any
  ) {
    lectures = lectures.filter((lecture) => {
      let today = new Date(Date.now());
  
      const lectureDate: string = new Date(
        lecture.startTime
      ).toLocaleDateString();
      today.setDate(today.getDate() + numberofDays);
      const dateWeekDay = new Date(today).toLocaleDateString();
  
      return dateWeekDay === lectureDate;
    });
    console.log(lectures);
    weekday.innerHTML = dayTextContent(numberofDays, lectures);
    console.log(dayTextContent(numberofDays, lectures));
  }

  export function dayOutput(
    mon: number,
    tue: number,
    wed: number,
    thu: number,
    fri: number,
    lectures: lectureentry[]
  ) {
    lessonOnDay(lectures, mon, monday);
    lessonOnDay(lectures, tue, tuesday);
    lessonOnDay(lectures, wed, wednesday);
    lessonOnDay(lectures, thu, thursday);
    lessonOnDay(lectures, fri, friday);
  }

  export function dayTextContent(
    daynumber: number,
  
    lessons: lectureentry[]
  ) {
  
    for (const otherLessons of lessons) {
      const DateCourseToday : Date = new Date(otherLessons.startTime);
      DateCourseToday.setDate(DateCourseToday.getDate() + daynumber);
      return `${new Date(otherLessons.startTime).toLocaleDateString(
        "de-DE",
        options3
      )} Uhr: ${otherLessons.name} `;
    }
  }

  export function dateReform(
    dateToday: number,
    dateFormatToday: Date,
    currentDate: string,
    weekendBuffer: number,
    dateReformed: string
  ) {
    dateToday = dateFormatToday.setDate(
      dateFormatToday.getDate() + weekendBuffer
    );
    dateFormatToday = new Date(dateToday);
    currentDate = dateFormatToday.toLocaleDateString("de-DE", options2);
  
    return currentDate;
  }


  export function weaklyTableOutput() {
    fetch("https://api.stuv.app/rapla/lectures/MOS-WON21?archived=true")
      .then((res) => res.json())
      .then((data: lectureentry[]) => {
        let dateToday : number = Date.now();
        let dateReformed;
  
        let dateFormatToday : Date = new Date(dateToday);
        let currentDate : string = dateFormatToday.toLocaleDateString("de-DE", options2);
  
        for (const lessons of data) {
          const dateCourse : Date = new Date(lessons.startTime);
          let currentCourse : string = dateCourse.toLocaleDateString("de-DE", options2);
          const curentCourseStart = dateCourse.toLocaleDateString(
            "de-DE",
            options3
          );
          if (dateFormatToday.getDay() === 6) {
            // dateReform(dateToday, dateFormatToday, currentDate, 2, "");
            currentDate = dateReform(
              dateToday,
              dateFormatToday,
              currentDate,
              2,
              ""
            );
  
            weeklyOutputFiller(
              data,
              dateFormatToday,
              curentCourseStart,
              lessons,
              currentDate,
              currentCourse
            );
          } else if (dateFormatToday.getDay() === 0) {
            // dateReform(dateToday, dateFormatToday, currentDate, 1, "");
            currentDate = dateReform(
              dateToday,
              dateFormatToday,
              currentDate,
              1,
              ""
            );
            console.log(currentDate);
            weeklyOutputFiller(
              data,
              dateFormatToday,
              curentCourseStart,
              lessons,
              currentDate,
              currentCourse
            );
          } else if (dateFormatToday.getDay() === 1 || 2 || 3 || 4 || 5) {
            weeklyOutputFiller(
              data,
              dateFormatToday,
              curentCourseStart,
              lessons,
              currentDate,
              currentCourse
            );
          }
        }
      });
  }