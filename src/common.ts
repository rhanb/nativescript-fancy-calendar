import { View } from "ui/core/view";

export enum SELECTION_MODE {
    "SINGLE" = 1,
    "MULTIPLE" = 2
}

export interface Appearance {
    weekdayTextColor: string,
    headerTitleColor: string,
    eventColor: string,
    selectionColor: string,
    todayColor: string,
    todaySelectionColor: string,
    borderRadius: number
}

export class CalendarEvent {
    private _date: Date;
    private _source: string;

    constructor(eventDate: Date, eventSource?: string) {
        this._date = eventDate;
        if (eventSource) {
            this._source = eventSource;
        }
    }

    public get date(): Date {
        return this._date;
    }

    public set date(eventDate: Date) {
        this._date = eventDate;
    }
    public get source(): string {
        return this._source;
    }

    public set source(eventSource: string) {
        this._source = eventSource;
    }
}

export class CalendarCommon extends View {
    private _events: Array<any>;
    public _displayMode: any;
    private _selectionMode: SELECTION_MODE;
    private _appearance: Appearance;
    private _maximumDate: Date;
    private _minimumDate: Date;
    private _firstWeekday: number;


    public getDisplayMode() {
        return this._displayMode;
    }

    public setDisplayMode(calendarDisplayMode: any): void {
        this._displayMode = calendarDisplayMode;
    }

    public getEvents() {
        return this._events;
    }

    public setEvents(calendarEvents: any): void {
        this._events = calendarEvents;
    }

    public getSelectionMode(): SELECTION_MODE {
        return this._selectionMode;
    }

    public setSelectionMode(calendarSelectionMode: SELECTION_MODE): void {
        this._selectionMode = calendarSelectionMode;
    }

    public getAppearance(): Appearance {
        return this._appearance;
    }

    public setAppearance(calendarAppearance: Appearance): void {
        this._appearance = calendarAppearance;
    }
    public getMaximumDate(): Date {
        return this._maximumDate;
    }

    public setMaximumDate(calendarMaxDate: Date): void {
        this._maximumDate = calendarMaxDate;
    }
    public getMinimumDate(): Date {
        return this._minimumDate;
    }

    public setMinimumDate(calendarMinDate: Date): void {
        this._minimumDate = calendarMinDate;
    }

    public getFirstWeekday(): number {
        return this._firstWeekday;
    }

    public setFirstWeekDay(calendarFirstWeekDay: number): void {
        this._firstWeekday = calendarFirstWeekDay;
    }

    public setWeekdayTextColor(colorValue: string) {
        this._appearance.weekdayTextColor = colorValue;
    }

    public getWeekdayTextColor(): string {
        return this._appearance.weekdayTextColor;
    }

    public setHeaderTitleColor(colorValue: string) {
        this._appearance.headerTitleColor = colorValue;
    }

    public getHeaderTitleColor(): string {
        return this._appearance.headerTitleColor;
    }

    public setEventColor(colorValue: string) {
        this._appearance.eventColor = colorValue;
    }

    public getEventColor(): string {
        return this._appearance.eventColor;
    }

    public setSelectionColor(colorValue: string) {
        this._appearance.selectionColor = colorValue;
    }

    public getSelectionColor(): string {
        return this._appearance.selectionColor;
    }

    public setTodayColor(colorValue: string) {
        this._appearance.todayColor = colorValue;
    }
    public getTodayColor(): string {
        return this._appearance.todayColor;
    }

    public setTodaySelectionColor(colorValue: string) {
        this._appearance.todaySelectionColor = colorValue;
    }
    public getTodaySelectionColor(): string {
        return this._appearance.todaySelectionColor;
    }

    public setBorderRadiusSelectedDay(borderRadiusValue: number) {
        this._appearance.borderRadius = borderRadiusValue;
    }
    public getBorderRadiusSelectedDay(): number {
        return this._appearance.borderRadius;
    }
}