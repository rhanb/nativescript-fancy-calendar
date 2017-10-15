import { CalendarBase } from "../common";
export declare class Calendar extends CalendarBase {
    readonly android: any;
    createNativeView(): any;
    private addDecoratorToday(date, colorBackgroundValue, colorSelectionValue, borderRadiusValue);
    private addDecoratorDot(colorValue);
    dateHasEvent(date: any): boolean;
    private isSameDate(dateOne, dateTwo);
    selectDate(date: Date): void;
    deselectDate(date: Date): void;
}
