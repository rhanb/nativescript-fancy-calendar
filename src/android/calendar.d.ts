import { CalendarEvent, CalendarCommon, SELECTION_MODE, Appearance } from "../common";
export declare enum SCROLL_ORIENTATION {
    "VERTICAL",
    "HORIZONTAL",
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
    private _scrollOrientation;
    private _selectionColor;
    readonly android: any;
    readonly _nativeView: any;
    _createUI(): void;
    scrollOrientation: SCROLL_ORIENTATION;
    readonly selectedDateListener: any;
    setSelectedDateListener(): void;
    readonly selectedMonthListener: any;
    setSelectedMonthListener(): void;
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
    private addDecoratorToday(date);
    private addDecoratorDot();
    dateHasEvent(date: any): boolean;
    private isSameDate(dateOne, dateTwo);
}
