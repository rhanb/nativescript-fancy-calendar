import { View } from "tns-core-modules/ui/core/view";
import { Property } from "tns-core-modules/ui/core/properties";
import { EventData } from "tns-core-modules/data/observable";
import { isDefined } from "utils/types";
import { CalendarEvent, Settings, Appearance } from "./common";


export interface INSEvents {
    dateSelected: string;
    monthChanged: string;
    displayModeChanged: string;
}
export const NSEvents: INSEvents = {
    dateSelected: "dateSelected",
    monthChanged: "monthChanged",
    displayModeChanged: "displayModeChanged"
}

export abstract class CalendarBase extends View {
    public events: CalendarEvent[];
    public settings: Settings;
    public appearance: Appearance;
}

export const settingsProperty = new Property<CalendarBase, Settings>({
    name: "settings",
    valueChanged: (target: CalendarBase, oldValue: Settings, newValue: Settings): void => {
        console.dir(oldValue);
        console.dir(newValue);
    },
    valueConverter: (value: string): any => {
        console.dir(value);
        return value;
    }
});

settingsProperty.register(CalendarBase);

export const appearanceProperty = new Property<CalendarBase, Appearance>({
    name: "appearance"
});

appearanceProperty.register(CalendarBase);

export const eventsProperty = new Property<CalendarBase, CalendarEvent[]>({
    name: "events"
});

eventsProperty.register(CalendarBase);
