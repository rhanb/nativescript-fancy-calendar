import { CalendarEvent, CalendarCommon, SELECTION_MODE, Appearance } from "../common";
export declare enum SCROLL_ORIENTATION {
    "VERTICAL" = 0,
    "HORIZONTAL" = 1,
}
export declare enum DISPLAY_MODE {
    "WEEK",
    "MONTH",
}
export declare class Calendar extends CalendarCommon {
    private _android;
    private _selectedDateListenerNative;
    private _selectedDateListener;
    private _selectedMonthListenerNative;
    private _selectedMonthListener;
    private _arrowColor;
    private _selectionColor;
    readonly android: any;
    readonly _nativeView: any;
    _createUI(): void;
    selectedDateListener: any;
    selectedMonthListener: any;
    arrowColor: string;
    appearance: Appearance;
    private weekdayTextColor;
    private headerTitleColor;
    private eventColor;
    private selectionColor;
    private todayColor;
    private todaySelectionColor;
    private borderRadiusSelectedDay;
    selectionMode: SELECTION_MODE;
    displayMode: DISPLAY_MODE;
    events: Array<CalendarEvent>;
    firstWeekday: number;
    maximumDate: Date;
    minimumDate: Date;
    private addDecorator();
    dateHasEvent(date: any): boolean;
    private isSameDate(dateOne, dateTwo);
}
