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
export declare class Calendar extends View {
    private _ios;
    private _scrollOrientation;
    private _displayMode;
    private _allowsMultipleSelection;
    private _firstWeekday;
    private _appearance;
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
    dateSelected(date: any): void;
    onLoaded(): void;
}
