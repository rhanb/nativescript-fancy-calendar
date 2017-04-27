import { View } from "ui/core/view";
import { PropertyMetadata } from "ui/core/proxy";
import { Property, PropertyChangeData, PropertyMetadataSettings } from "ui/core/dependency-observable";
import { isDefined } from "utils/types";

export enum SELECTION_MODE {
    "SINGLE" = 1,
    "MULTIPLE" = 2
}

export const CALENDAR = "Calendar";
export interface Appearance {
    weekdayTextColor: string,
    headerTitleColor: string,
    eventColor: string,
    selectionColor: string,
    todayColor: string,
    todaySelectionColor: string,
    borderRadius: number,
    hasBorder: boolean
}
export declare enum SCROLL_ORIENTATION {
    "VERTICAL",
    "HORIZONTAL"
}
export declare enum DISPLAY_MODE {
    "WEEK",
    "MONTH",
}
export interface Settings {
    displayMode: DISPLAY_MODE,
    selectionMode: SELECTION_MODE,
    scrollOrientation: SCROLL_ORIENTATION,
    firstWeekday: number,
    minimumDate: Date,
    maximumDate: Date
}
export interface INSEvents {
    dateSelected: string;
    monthChanged: string;
}
export const NSEvents: INSEvents = {
    dateSelected: "dateSelected",
    monthChanged: "monthChanged"
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
const
    SETTINGS = "settings",
    APPEARANCE = "appearance",
    EVENTS = "events";

const
    settingsProperty = new Property(SETTINGS, CALENDAR, new PropertyMetadata(undefined)),
    appearanceProperty = new Property(APPEARANCE, CALENDAR, new PropertyMetadata(undefined)),
    eventsProperty = new Property(EVENTS, CALENDAR, new PropertyMetadata(undefined));

(<PropertyMetadata>settingsProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    let calendar = <CalendarCommon>data.object;
    calendar._settingsPropertyChanged(data);
};
(<PropertyMetadata>appearanceProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    let calendar = <CalendarCommon>data.object;
    calendar._appearancePropertyChanged(data);
};
(<PropertyMetadata>eventsProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    let calendar = <CalendarCommon>data.object;
    calendar._eventsPropertyChanged(data);
};

export class CalendarCommon extends View {
    public static events = eventsProperty;
    public static settings = settingsProperty;
    public static appearance = appearanceProperty;


    public get settings(): Settings {
        return this._getValue(CalendarCommon.settings);
    }

    public set settings(calendarSettingsValue: Settings) {
        if (this.settings !== calendarSettingsValue && calendarSettingsValue) {
            this._setValue(CalendarCommon.settings, calendarSettingsValue);
        }
    }

    public _settingsPropertyChanged(data: PropertyChangeData) { }

    public get appearance(): Appearance {
        return this._getValue(CalendarCommon.appearance);
    }

    public set appearance(appearanceValue: Appearance) {
        if (this.appearance !== appearanceValue && appearanceValue) {
            this._setValue(CalendarCommon.appearance, appearanceValue);
        }
    }

    public _appearancePropertyChanged(data: PropertyChangeData) { }

    public get events() {
        return this._getValue(CalendarCommon.events);
    }

    public set events(calendarEvents: Array<CalendarEvent>) {
        if (this.events !== calendarEvents && calendarEvents) {
            this._setValue(CalendarCommon.events, calendarEvents);
        }
    }

    public _eventsPropertyChanged(data: PropertyChangeData) { }
}