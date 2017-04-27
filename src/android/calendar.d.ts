import { CalendarCommon } from "../common";
import { PropertyChangeData } from "ui/core/dependency-observable";
export declare class Calendar extends CalendarCommon {
    private _android;
    private _selectedDateListenerNative;
    private _selectedDateListener;
    private _selectedMonthListenerNative;
    private _selectedMonthListener;
    readonly android: any;
    readonly _nativeView: any;
    _createUI(): void;
    readonly selectedDateListener: any;
    setSelectedDateListener(): void;
    readonly selectedMonthListener: any;
    setSelectedMonthListener(): void;
    _appearancePropertyChanged(data: PropertyChangeData): void;
    _settingsPropertyChanged(data: PropertyChangeData): void;
    private addDecoratorToday(date, colorValue);
    private addDecoratorDot(colorValue);
    dateHasEvent(date: any): boolean;
    private isSameDate(dateOne, dateTwo);
}
