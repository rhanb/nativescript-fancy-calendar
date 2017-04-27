export * from './src/common';
export * from './src/ios/calendar';

declare const
    FSCalendarScopeWeek,
    FSCalendarScopeMonth,
    FSCalendarScrollDirectionVertical,
    FSCalendarScrollDirectionHorizontal;

export enum DISPLAY_MODE {
    "WEEK" = FSCalendarScopeWeek,
    "MONTH" = FSCalendarScopeMonth
}

export enum SCROLL_ORIENTATION {
    "VERTICAL" = FSCalendarScrollDirectionVertical,
    "HORIZONTAL" = FSCalendarScrollDirectionHorizontal
}