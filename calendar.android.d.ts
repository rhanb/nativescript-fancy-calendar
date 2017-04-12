import { View } from 'ui/core/view';
export declare enum SELECTION_MODE {
    "NONE" = 0,
    "SINGLE" = 1,
    "MULTIPLE" = 2,
    "RANGE" = 3,
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
    readonly android: any;
    readonly _nativeView: any;
    _createUI(): void;
    selectedDateListener: any;
    selectedMonthListener: any;
    arrowColor: string;
    selectionColor: string;
    selectionMode: SELECTION_MODE;
}
