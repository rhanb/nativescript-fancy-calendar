import { CalendarCommon } from "../common";
import { PropertyChangeData } from "ui/core/dependency-observable";
export declare class Calendar extends CalendarCommon {
    private _android;
    private _selectedDateListener;
    private _selectedMonthListener;
    readonly android: any;
    readonly _nativeView: any;
    _createUI(): void;
    _appearancePropertyChanged(data: PropertyChangeData): void;
    _settingsPropertyChanged(data: PropertyChangeData): void;
    _eventsPropertyChanged(data: PropertyChangeData): void;
    private addDecoratorToday(date, colorBackgroundValue, colorSelectionValue, borderRadiusValue);
    private addDecoratorDot(colorValue);
    dateHasEvent(date: any): boolean;
    private isSameDate(dateOne, dateTwo);
}
