import { CalendarBase } from "../common";
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
export declare class Calendar extends CalendarBase {
    private _subtitles;
    private _delegate;
    private _dataSource;
    private _calendarHeightConstraint;
    constructor();
    readonly ios: any;
    onLoaded(): void;
    onUnloaded(): void;
    disposeNativeView(): void;
    readonly calendarHeightConstraint: NSLayoutConstraint;
    setCalendarHeightConstraint(height: number): void;
    subtitles: Array<CalendarSubtitle>;
    dateSelectedEvent(date: any): void;
    pageChanged(calendar: any, date: any): void;
    dateHasEvent(date: any): number;
    dateHasEventImage(date: any): string;
    dateHasSubtitle(date: any): string;
    private isSameDate(dateOne, dateTwo);
    reload(): void;
    displayModeChanged(bounds: any): void;
    selectDate(date: Date): void;
    deselectDate(date: Date): void;
}
