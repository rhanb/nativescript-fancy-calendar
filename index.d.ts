import { View } from 'ui/core/view';
export declare enum SELECTION_MODE {
    "NONE" = 0,
    "SINGLE" = 1,
    "MULTIPLE" = 2,
    "RANGE" = 3,
}
export declare enum SCROLL_ORIENTATION {
    "VERTICAL" = 0,
    "HORIZONTAL" = 1,
}
export declare enum DISPLAY_MODE {
    "WEEK",
    "MONTH",
}
export declare class EventDecorator {
    private color;
    private dates;
    private _owner;
    constructor(color: string, date: Array<any>);
    shouldDecorate(day: any): boolean;
    decorate(view: any): void;
}
export declare class Calendar extends View {
    private _android;
    private _selectedDateListenerNative;
    private _selectedDateListener;
    private _selectedMonthListenerNative;
    private _selectedMonthListener;
    private _arrowColor;
    private _selectionColor;
    private _selectionMode;
    private _displayMode;
    private _eventDecorator;
    private _events;
    readonly android: any;
    readonly _nativeView: any;
    _createUI(): void;
    selectedDateListener: any;
    selectedMonthListener: any;
    arrowColor: string;
    selectionColor: string;
    selectionMode: SELECTION_MODE;
    displayMode: DISPLAY_MODE;
    events: Array<any>;
    private addDecorator();
    shouldDecorate: (day: any) => boolean;
    decorate: (view: any) => void;
    dateHasEvent(date: any): boolean;
    private isSameDate(dateOne, dateTwo);
}
