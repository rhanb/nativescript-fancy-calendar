import { View } from 'ui/core/view';
import { Color } from "color";

declare const com;
const MaterialCalendar = com.prolificinteractive.materialcalendarview,
    MaterialCalendarView = MaterialCalendar.MaterialCalendarView,
    MaterialCalendarOnDateSelectedListener = MaterialCalendar.OnDateSelectedListener,
    MaterialCalendarOnMonthChangedListener = MaterialCalendar.OnMonthChangedListener,
    MaterialCalendarMode = MaterialCalendar.CalendarMode,
    MaterialCalendarDecorator = MaterialCalendar.DayViewDecorator,
    MaterialCalendarDot = MaterialCalendar.spans.DotSpan;


export enum SELECTION_MODE {
    "NONE" = 0,
    "SINGLE" = 1,
    "MULTIPLE" = 2,
    "RANGE" = 3
}

export enum SCROLL_ORIENTATION {
    "VERTICAL" = 0,
    "HORIZONTAL" = 1
}

export enum DISPLAY_MODE {
    "WEEK" = MaterialCalendarMode.WEEKS,
    "MONTH" = MaterialCalendarMode.MONTHS
}

export class EventDecorator {
    private color: string;
    private dates: Array<any>;
    private _owner: Calendar;

    constructor(color: string, date: Array<any>, owner) {
        this.color = color;
        this.dates = new Array<any>(date);
        this._owner = owner;
        console.log('event decorator');
    }
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
    private _displayMode: DISPLAY_MODE;
    private _eventDecorator: any;
    private _events: Array<any>;


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

    public get arrowColor(): string {
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

    public get selectionMode(): SELECTION_MODE {
        return this._selectionMode;
    }

    public set selectionMode(calendarSelectionMode: SELECTION_MODE) {
        if (this._selectionMode !== calendarSelectionMode) {
            this._selectionMode = calendarSelectionMode;
            this._android.setSelectionMode(this._selectionMode);
        }
    }

    public get displayMode(): DISPLAY_MODE {
        return this._displayMode;
    }

    public set displayMode(calendarDisplayMode: DISPLAY_MODE) {
        if (this._displayMode !== calendarDisplayMode) {
            this._displayMode = calendarDisplayMode;
            this._android.state().edit()
                .setCalendarDisplayMode(calendarDisplayMode)
                .commit()
        }
    }

    public get events(): Array<any> {
        return this._events;
    }

    public set events(calendarEvents: Array<any>) {
        if (this._events !== calendarEvents) {
            if (this._events) {
                this._android.removeDecorators();
            }
            this._events = calendarEvents;
            console.log('set events');
            console.dir(this._events);
            this.addDecorator();
        }
    }

    private addDecorator() {
        this._eventDecorator = new EventDecorator("green", this._events, this);
        let _that = this;
        this._android.addDecorator(
            new MaterialCalendarDecorator({
                shouldDecorate: (day: any) => {
                    let should = false;
                    console.log('shouldDecorate');
                    if (_that.events) {
                        let i = 0;
                        while (!should && i < _that._events.length) {
                            if (_that.isSameDate(day, _that._events[i])) {
                                should = true;
                            }
                            i++;
                        }
                    }
                    return should;
                },
                decorate: (view) => {
                    view.addSpan(new MaterialCalendarDot(5, new Color("green").android));
                }
            })
        );
    }
    public shouldDecorate(day: any) {
        let should = false;
        if (this.events) {
            should = this.dateHasEvent(day);
        }
        return should;
    }
    public decorate(view): void {
        view.addSpan(new MaterialCalendarDot(5, new Color("green").android));
    }

    public dateHasEvent(date): boolean {
        let i = 0, found = false;
        while (!found && i < this._events.length) {

            if (this.isSameDate(date, this._events[i])) {
                found = true;
            }
            i++;
        }
        return found;
    }

    private isSameDate(dateOne, dateTwo) {
        console.log('----- Calendar dates ----');
        console.log(dateOne.getDay());
        console.log(dateOne.getMonth());
        console.log(dateOne.getDate());
        console.log(dateOne.getYear());
        console.log('----- Event dates ----');
        console.log(dateTwo.getDay());
        console.log(dateTwo.getMonth());
        console.log(dateTwo.getDate());
        console.log(dateTwo.getYear());
        return dateOne.getMonth() === dateTwo.getMonth() && dateOne.getDay() === dateTwo.getDate();
    }
}