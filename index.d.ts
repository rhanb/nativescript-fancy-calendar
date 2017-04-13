import { View } from "ui/core/view";
export declare enum SELECTION_MODE {
    "SINGLE",
    "MULTIPLE"
}
export declare enum DISPLAY_MODE {
    "WEEK",
    "MONTH"
}
export enum SCROLL_ORIENTATION {
    "VERTICAL",
    "HORIZONTAL"
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
    constructor(eventDate: Date, eventSource?: string);
    date: Date;
    source: string;
}
export declare class CalendarCommon extends View {
    private _events;
    _displayMode: any;
    private _selectionMode;
    private _appearance;
    private _maximumDate;
    private _minimumDate;
    private _firstWeekday;
    getDisplayMode(): any;
    setDisplayMode(calendarDisplayMode: any): void;
    getEvents(): any[];
    setEvents(calendarEvents: any): void;
    getSelectionMode(): SELECTION_MODE;
    setSelectionMode(calendarSelectionMode: SELECTION_MODE): void;
    getAppearance(): Appearance;
    setAppearance(calendarAppearance: Appearance): void;
    getMaximumDate(): Date;
    setMaximumDate(calendarMaxDate: Date): void;
    getMinimumDate(): Date;
    setMinimumDate(calendarMinDate: Date): void;
    getFirstWeekday(): number;
    setFirstWeekDay(calendarFirstWeekDay: number): void;
    setWeekdayTextColor(colorValue: string): void;
    getWeekdayTextColor(): string;
    setHeaderTitleColor(colorValue: string): void;
    getHeaderTitleColor(): string;
    setEventColor(colorValue: string): void;
    getEventColor(): string;
    setSelectionColor(colorValue: string): void;
    getSelectionColor(): string;
    setTodayColor(colorValue: string): void;
    getTodayColor(): string;
    setTodaySelectionColor(colorValue: string): void;
    getTodaySelectionColor(): string;
    setBorderRadiusSelectedDay(borderRadiusValue: number): void;
    getBorderRadiusSelectedDay(): number;
}
export declare class Calendar extends CalendarCommon {
    constructor();
    displayMode: any;
    selectionMode: SELECTION_MODE;
    events: Array<any>;
    appearance: Appearance;
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
