import { CalendarEvent, CalendarCommon, SELECTION_MODE, Appearance } from "../common";
export declare enum SCROLL_ORIENTATION {
    "VERTICAL",
    "HORIZONTAL",
}
export declare enum DISPLAY_MODE {
    "WEEK",
    "MONTH",
}
export declare class CalendarSubtitle {
    private _date;
    private _text;
    constructor(subtitleDate: any, subtitleText: string);
    date: any;
    text: string;
}
export declare class Calendar extends CalendarCommon {
    private _ios;
    private _scrollOrientation;
    private _subtitles;
    private _hasBorder;
    constructor();
    readonly ios: any;
    readonly _nativeView: any;
    scrollOrientation: SCROLL_ORIENTATION;
    displayMode: any;
    selectionMode: SELECTION_MODE;
    firstWeekday: number;
    appearance: Appearance;
    private weekdayTextColor;
    private headerTitleColor;
    private eventColor;
    private selectionColor;
    private todayColor;
    private todaySelectionColor;
    private borderRadiusSelectedDay;
    events: Array<CalendarEvent>;
    subtitles: Array<CalendarSubtitle>;
    dateSelectedEvent(date: any): void;
    pageChanged(calendar: any): void;
    dateHasEvent(date: any): boolean;
    dateHasEventImage(date: any): string;
    dateHasSubtitle(date: any): string;
    private isSameDate(dateOne, dateTwo);
    hasBorder: boolean;
    maximumDate: Date;
    minimumDate: Date;
    reload(): void;
    onLoaded(): void;
}
