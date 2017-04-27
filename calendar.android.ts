export * from './src/common';
export * from './src/android/calendar';

declare const
    com;

const
    MaterialCalendar = com.prolificinteractive.materialcalendarview,
    MaterialCalendarMode = MaterialCalendar.CalendarMode,
    MaterialCalendarView = MaterialCalendar.MaterialCalendarView;

export enum DISPLAY_MODE {
    "WEEK" = MaterialCalendarMode.WEEKS,
    "MONTH" = MaterialCalendarMode.MONTHS
}

export enum SCROLL_ORIENTATION {
    "VERTICAL" = MaterialCalendarView.VERTICAL,
    "HORIZONTAL" = MaterialCalendarView.HORIZONTAL
}