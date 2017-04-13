import { View } from 'ui/core/view';
import { Color } from "color";
import { CalendarEvent, CalendarCommon, SELECTION_MODE, Appearance } from "../common";

declare const com;
const MaterialCalendar = com.prolificinteractive.materialcalendarview,
    MaterialCalendarView = MaterialCalendar.MaterialCalendarView,
    MaterialCalendarOnDateSelectedListener = MaterialCalendar.OnDateSelectedListener,
    MaterialCalendarOnMonthChangedListener = MaterialCalendar.OnMonthChangedListener,
    MaterialCalendarMode = MaterialCalendar.CalendarMode,
    MaterialCalendarDecorator = MaterialCalendar.DayViewDecorator,
    MaterialCalendarDot = MaterialCalendar.spans.DotSpan,
    MaterialCalendarDay = MaterialCalendar.day;


export enum SCROLL_ORIENTATION {
    "VERTICAL" = 0,
    "HORIZONTAL" = 1
}

export enum DISPLAY_MODE {
    "WEEK" = MaterialCalendarMode.WEEKS,
    "MONTH" = MaterialCalendarMode.MONTHS
}

export class Calendar extends CalendarCommon {

    private _android: any;
    private _selectedDateListenerNative: any;
    private _selectedDateListener: any;
    private _selectedMonthListenerNative: any;
    private _selectedMonthListener: any;
    private _arrowColor: string;
    private _selectionColor: string;


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

    public set appearance(appearanceValue: Appearance) {
        if (appearanceValue !== super.getAppearance()) {
            this.weekdayTextColor = appearanceValue.weekdayTextColor;
            this.headerTitleColor = appearanceValue.headerTitleColor;
            this.eventColor = appearanceValue.eventColor;
            this.selectionColor = appearanceValue.selectionColor;
            this.todayColor = appearanceValue.todayColor;
            this.todaySelectionColor = appearanceValue.todaySelectionColor;
            this.borderRadiusSelectedDay = appearanceValue.borderRadius;
        }
    }

    private set weekdayTextColor(colorValue: string) {
        if (super.getWeekdayTextColor() !== colorValue) {
            super.setWeekdayTextColor(colorValue);
            this._android.setWeekDayTextAppearance(new Color(super.getWeekdayTextColor()).android);
            this._android.setDateTextAppearance(new Color(super.getWeekdayTextColor()).android);
        }
    }
    private set headerTitleColor(colorValue: string) {
        if (super.getHeaderTitleColor() !== colorValue) {
            super.setHeaderTitleColor(colorValue);
            this._android.setHeaderTextAppearance(new Color(super.getHeaderTitleColor()).android);
        }
    }
    private set eventColor(colorValue: string) {
        if (super.getEventColor() !== colorValue) {
            super.setEventColor(colorValue);
            this.ios.appearance.eventColor = new Color(super.getEventColor()).android;
        }
    }
    private set selectionColor(colorValue: string) {
        if (super.getSelectionColor() !== colorValue) {
            super.setSelectionColor(colorValue);
            this._android.setSelectionColor(new Color(super.getSelectionColor()).android);
        }
    }
    private set todayColor(colorValue: string) {
        if (super.getTodayColor() !== colorValue) {
            super.setTodayColor(colorValue);
            //this._ios.appearance.todayColor = new Color(this.appearance.todayColor).ios;
        }
    }
    private set todaySelectionColor(colorValue: string) {
        if (super.getTodaySelectionColor() !== colorValue) {
            super.setTodaySelectionColor(colorValue);
            //this._ios.appearance.todaySelectionColor = new Color(this.appearance.todaySelectionColor).ios;
        }
    }

    private set borderRadiusSelectedDay(borderRadiusValue: number) {
        if (super.getBorderRadiusSelectedDay() !== borderRadiusValue) {
            super.setBorderRadiusSelectedDay(borderRadiusValue);
            //this._ios.appearance.borderRadius = this.appearance.borderRadius;
        }
    }

    public set selectionMode(calendarSelectionMode: SELECTION_MODE) {
        if (super.getSelectionMode() !== calendarSelectionMode) {
            super.setSelectionMode(calendarSelectionMode);
            this._android.setSelectionMode(super.getSelectionMode());
        }
    }

    public set displayMode(calendarDisplayMode: DISPLAY_MODE) {
        if (super.getDisplayMode() !== calendarDisplayMode) {
            super.setDisplayMode(calendarDisplayMode);
            this._android.state().edit()
                .setCalendarDisplayMode(calendarDisplayMode)
                .commit()
        }
    }

    public set events(calendarEvents: Array<CalendarEvent>) {
        if (super.getEvents() !== calendarEvents) {
            if (super.getEvents()) {
                this._android.removeDecorators();
            }
            super.setEvents(calendarEvents);
            this.addDecorator();
        }
    }

    public set firstWeekday(firstWeekDayValue: number) {
        if (super.getFirstWeekday() !== firstWeekDayValue) {
            let firstWeekdayTemp = firstWeekDayValue <= 7 && this.firstWeekday > 0 ? 1 : firstWeekDayValue;
            super.setFirstWeekDay(firstWeekdayTemp);
            this._android.state().edit()
                .setFirstDayOfWeek(super.getFirstWeekday())
                .commit();
        }
    }

    public set maximumDate(calendarMaxDate: Date) {
        if (super.getMaximumDate() !== calendarMaxDate) {
            super.setMaximumDate(calendarMaxDate);
            this._android.state().edit()
                .setMaximumDate(MaterialCalendarDay.from(calendarMaxDate.getFullYear(), calendarMaxDate.getMonth(), calendarMaxDate.getDate()))
                .commit();
        }
    }

    public set minimumDate(calendarMinDate: Date) {
        if (super.getMinimumDate() !== calendarMinDate) {
            super.setMinimumDate(calendarMinDate);
            this._android.state().edit()
                .setMaximumDate(MaterialCalendarDay.from(calendarMinDate.getFullYear(), calendarMinDate.getMonth(), calendarMinDate.getDate()))
                .commit();
        }
    }

    private addDecorator() {
        let _that = this;
        this._android.addDecorator(
            new MaterialCalendarDecorator({
                shouldDecorate: (day: any) => {
                    let should = false;
                    if (super.getEvents) {
                        let i = 0;
                        while (!should && i < super.getEvents().length) {
                            if (_that.isSameDate(day, super.getEvents()[i].date)) {
                                should = true;
                            }
                            i++;
                        }
                    }
                    return should;
                },
                decorate: (view) => {
                    view.addSpan(new MaterialCalendarDot(5, new Color(super.getEventColor()).android));
                }
            })
        );
    }

    public dateHasEvent(date): boolean {
        let i = 0, found = false;
        while (!found && i < super.getEvents().length) {

            if (this.isSameDate(date, super.getEvents()[i].date)) {
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