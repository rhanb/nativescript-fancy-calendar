import { View } from "ui/core/view";
import { Property, PropertyChangeData } from "ui/core/dependency-observable";
export declare enum SELECTION_MODE {
    "SINGLE" = 1,
    "MULTIPLE" = 2,
}
export declare const CALENDAR = "Calendar";
export interface Appearance {
    weekdayTextColor: string;
    headerTitleColor: string;
    eventColor: string;
    selectionColor: string;
    todayColor: string;
    todaySelectionColor: string;
    borderRadius: number;
    hasBorder: boolean;
}
export declare enum SCROLL_ORIENTATION {
    "VERTICAL",
    "HORIZONTAL",
}
export declare enum DISPLAY_MODE {
    "WEEK",
    "MONTH",
}
export interface Settings {
    displayMode: DISPLAY_MODE;
    selectionMode: SELECTION_MODE;
    scrollOrientation: SCROLL_ORIENTATION;
    firstWeekday: number;
    minimumDate: Date;
    maximumDate: Date;
}
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
export declare class CalendarCommon extends View {
    static events: Property;
    static settings: Property;
    static appearance: Property;
    settings: Settings;
    _settingsPropertyChanged(data: PropertyChangeData): void;
    appearance: Appearance;
    _appearancePropertyChanged(data: PropertyChangeData): void;
    events: Array<CalendarEvent>;
    _eventsPropertyChanged(data: PropertyChangeData): void;
}
