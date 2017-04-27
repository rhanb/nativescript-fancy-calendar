import { CalendarCommon } from "../common";
import { PropertyChangeData } from "ui/core/dependency-observable";
export declare class CalendarSubtitle {
    private _date;
    private _text;
    constructor(subtitleDate: any, subtitleText: string);
    date: any;
    text: string;
}
export declare class Calendar extends CalendarCommon {
    private _ios;
    private _subtitles;
    constructor();
    readonly ios: any;
    readonly _nativeView: any;
    _settingsPropertyChanged(data: PropertyChangeData): void;
    _appearancePropertyChanged(data: PropertyChangeData): void;
    subtitles: Array<CalendarSubtitle>;
    dateSelectedEvent(date: any): void;
    pageChanged(calendar: any): void;
    dateHasEvent(date: any): boolean;
    _eventsPropertyChanged(data: PropertyChangeData): void;
    dateHasEventImage(date: any): string;
    dateHasSubtitle(date: any): string;
    private isSameDate(dateOne, dateTwo);
    reload(): void;
    onLoaded(): void;
}
