import { View } from "ui/core/view";
import { Property, PropertyChangeData } from "ui/core/dependency-observable";
import { CalendarBase } from './src/common';

export * from './src/common';

export interface INSEvents {
    dateSelected: string;
    monthChanged: string;
}

export declare const NSEvents: INSEvents;

export declare class CalendarEvent {
    private _date;
    private _source;
    constructor(eventDate: Date, eventSource?: string);
    date: Date;
    source: string;
}

export declare class CalendarSubtitle {
    private _date;
    private _text;
    constructor(subtitleDate: any, subtitleText: string);
    date: any;
    text: string;
}

export declare class Calendar extends CalendarBase {
    readonly android: any;
    createNativeView(): any;
    private addDecoratorToday(date, colorBackgroundValue, colorSelectionValue, borderRadiusValue);
    private addDecoratorDot(colorValue);
    dateHasEvent(date: any): any;
    private _subtitles;
    private _delegate;
    private _dataSource;
    private _calendarHeightConstraint;
    constructor();
    readonly ios: any;
    onLoaded(): void;
    onUnloaded(): void;
    disposeNativeView(): void;
    readonly calendarHeightConstraint: any;
    setSalendarHeightConstraint(height: number): void;
    subtitles: Array<CalendarSubtitle>;
    dateSelectedEvent(date: any): void;
    pageChanged(calendar: any): void;
    dateHasEventImage(date: any): string;
    dateHasSubtitle(date: any): string;
    private isSameDate(dateOne, dateTwo);
    reload(): void;
    displayModeChanged(bounds: any): void;
    selectDate(date: any): void;
    deselectDate(date: any): void;
    getDate(): any;
}
