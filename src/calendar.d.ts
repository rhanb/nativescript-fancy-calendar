import { View } from "tns-core-modules/ui/core/view";
import { Property } from "tns-core-modules/ui/core/properties";
import { CalendarEvent, Settings, Appearance } from "./common";
export interface INSEvents {
    dateSelected: string;
    monthChanged: string;
    displayModeChanged: string;
}
export declare const NSEvents: INSEvents;
export declare abstract class CalendarBase extends View {
    events: CalendarEvent[];
    settings: Settings;
    appearance: Appearance;
}
export declare const settingsProperty: Property<CalendarBase, Settings>;
export declare const appearanceProperty: Property<CalendarBase, Appearance>;
export declare const eventsProperty: Property<CalendarBase, CalendarEvent[]>;
