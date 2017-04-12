import { View } from 'ui/core/view';
import { Color } from "color";

declare const com;
const MaterialCalendar = com.prolificinteractive.materialcalendarview,
    MaterialCalendarView = MaterialCalendar.MaterialCalendarView,
    MaterialCalendarOnDateSelectedListener = MaterialCalendar.OnDateSelectedListener,
    MaterialCalendarOnMonthChangedListener = MaterialCalendar.OnMonthChangedListener


export enum SELECTION_MODE {
    "NONE" = 0,
    "SINGLE" = 1,
    "MULTIPLE" = 2,
    "RANGE" = 3
}
export class Calendar extends View {

    private _android: any;
    private _selectedDateListenerNative: any;
    private _selectedDateListener: any;
    private _selectedMonthListenerNative: any;
    private _selectedMonthListener: any;
    private _arrowColor: string;
    private _selectionColor: string;
    private _selectionMode: SELECTION_MODE;

    public get android() {
        return this._android;
    }

    public get _nativeView(): any {
        return this._android;
    }

    public _createUI() {
        this._android = new MaterialCalendarView(this._context);
    }

    public get selectedDateListener(): any {
        return this._selectedDateListener;
    }

    public set selectedDateListener(calendarSelectedDateListener: any) {
        let _that = this;
        this._selectedDateListener = calendarSelectedDateListener;
        this._selectedDateListenerNative = new MaterialCalendarOnDateSelectedListener({
            onDateSelected: _that._selectedDateListener
        });
        this._android.setOnDateChangedListener(this._selectedDateListenerNative);
    }

    public get selectedMonthListener(): any {
        return this._selectedMonthListener;
    }

    public set selectedMonthListener(calendarSelectedMontheListener: any) {
        let _that = this;
        this._selectedMonthListener = calendarSelectedMontheListener;
        this._selectedMonthListenerNative = new MaterialCalendarOnMonthChangedListener({
            onMonthChanged: _that._selectedMonthListener
        });
        this._android.setOnMonthChangedListener(this._selectedMonthListenerNative);
    }

    public get arrowColor():string {
        return this._arrowColor;
    }

    public set arrowColor(calendarArrowColor: string) {
        if (this._arrowColor !== calendarArrowColor) {
            this._arrowColor = calendarArrowColor;
            this._android.setArrowColor(new Color(this._arrowColor).android);
        }
    }

    public get selectionColor(): string {
        return this._selectionColor;
    }

    public set selectionColor(calendarSelectionColor: string) {
        if (this._selectionColor !== calendarSelectionColor) {
            this._selectionColor = calendarSelectionColor
            this._android.setSelectionColor(new Color(this._selectionColor).android);
        }
    }

    public get selectionMode():SELECTION_MODE {
        return this._selectionMode;
    }

    public set selectionMode(calendarSelectionMode: SELECTION_MODE) {
        if (this._selectionMode !== calendarSelectionMode) {
            this._selectionMode = calendarSelectionMode;
            this._android.setSelectionMode(this._selectionMode);
        }
    }
}