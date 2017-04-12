import { View } from 'ui/core/view';
export declare enum SCROLL_ORIENTATION {
    "VERTICAL",
    "HORIZONTAL",
}
export declare enum DISPLAY_MODE {
    "WEEK",
    "MONTH",
}
export interface Appearance {
    weekdayTextColor: string;
    headerTitleColor: string;
    eventColor: string;
    selectionColor: string;
    todayColor: string;
    todaySelectionColor: string;
    borderRadius: number;
}
export declare class CalendarEvent {
    private _date;
    private _source;
    constructor(eventDate: any, eventSource?: string);
    date: any;
    source: string;
}
export declare class CalendarSubtitle {
    private _date;
    private _text;
    constructor(subtitleDate: any, subtitleText: string);
    date: any;
    text: string;
}
export declare class Calendar extends View {
    private _ios;
    private _scrollOrientation;
    private _displayMode;
    private _allowsMultipleSelection;
    private _firstWeekday;
    private _appearance;
    private _events;
    private _subtitles;
    private _hasBorder;
    private _maximumDate;
    private _minimumDate;
    constructor();
    readonly ios: any;
    readonly _nativeView: any;
    scrollOrientation: SCROLL_ORIENTATION;
    displayMode: DISPLAY_MODE;
    allowMultipleSelection: boolean;
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
    dateSelected(date: any): void;
    pageChanged(): void;
    dateHasEvent(date: any): boolean;
    dateHasEventImage(date: any): string;
    dateHasSubtitle(date: any): string;
    private isSameDate(dateOne, dateTwo);
    hasBorder: boolean;
    maximumDate: Date;
    minimumDate: Date;
    onLoaded(): void;
}
