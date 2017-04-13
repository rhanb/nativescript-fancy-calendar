import { View } from 'ui/core/view';
import { Color } from "color";
import { CalendarEvent, CalendarCommon, SELECTION_MODE, Appearance, NSEvents } from "../common";

declare const com, ColorDrawable;
const MaterialCalendar = com.prolificinteractive.materialcalendarview,
    MaterialCalendarView = MaterialCalendar.MaterialCalendarView,
    MaterialCalendarOnDateSelectedListener = MaterialCalendar.OnDateSelectedListener,
    MaterialCalendarOnMonthChangedListener = MaterialCalendar.OnMonthChangedListener,
    MaterialCalendarMode = MaterialCalendar.CalendarMode,
    MaterialCalendarDecorator = MaterialCalendar.DayViewDecorator,
    MaterialCalendarDot = MaterialCalendar.spans.DotSpan,
    MaterialCalendarDay = MaterialCalendar.day;


export enum SCROLL_ORIENTATION {
    "VERTICAL" = MaterialCalendarView.VERTICAL,
    "HORIZONTAL" = MaterialCalendarView.HORIZONTAL
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
    private _scrollOrientation: SCROLL_ORIENTATION;
    private _selectionColor: string;


    public get android() {
        return this._android;
    }

    public get _nativeView(): any {
        return this._android;
    }

    public _createUI() {
        this._android = new MaterialCalendarView(this._context);
        this.setSelectedMonthListener();
        this.setSelectedDateListener();
        super.setAppearance(<Appearance>{});
        this.appearance = <Appearance>{
            weekdayTextColor: "",
            headerTitleColor: "",
            eventColor: "",
            selectionColor: "",
            todayColor: "",
            todaySelectionColor: "",
            borderRadius: 0
        }
    }

    public get scrollOrientation():SCROLL_ORIENTATION {
        return this._scrollOrientation
    }

    public set scrollOrientation(calendarScrollOrientation: SCROLL_ORIENTATION) {
        if (this._scrollOrientation !== calendarScrollOrientation) {
            this._scrollOrientation = calendarScrollOrientation;
            this._android.setTitleAnimationOrientation(this._scrollOrientation);
        }
    }
    public get selectedDateListener(): any {
        return this._selectedDateListener;
    }

    public setSelectedDateListener() {
        let _that = this;
        let selectedDateListener = new MaterialCalendarOnDateSelectedListener({
            onDateSelected: function (widget, date, selected) {
                _that.notify({
                    eventName: NSEvents.dateSelected,
                    object: _that,
                    data: { date: date, selected: selected }
                });
            }
        });
        this._android.setOnDateChangedListener(selectedDateListener);
    }

    public get selectedMonthListener(): any {
        return this._selectedMonthListener;
    }

    public setSelectedMonthListener() {
        let _that = this;
        let selectedMonthListenerNative = new MaterialCalendarOnMonthChangedListener({
            onMonthChanged: function (widget, date) {
                _that.notify({
                    eventName: NSEvents.monthChanged,
                    object: _that,
                    data: date
                });
            }
        });
        this._android.setOnMonthChangedListener(selectedMonthListenerNative);
    }

    public get arrowColor(): string {
        return this._arrowColor;
    }

    public set arrowColor(calendarArrowColor: string) {
        if (this._arrowColor !== calendarArrowColor) {
            this._arrowColor = calendarArrowColor;
            if (this._arrowColor !== "") {
                this._android.setArrowColor(new Color(this._arrowColor).android);
            }
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

    public get appearance() {
        return super.getAppearance();
    }

    private set weekdayTextColor(colorValue: string) {
        if (super.getWeekdayTextColor() !== colorValue) {
            super.setWeekdayTextColor(colorValue);
            //this._android.setWeekDayTextAppearance(new Color(super.getWeekdayTextColor()).android);
            //this._android.setDateTextAppearance(new Color(super.getWeekdayTextColor()).android);
        }
    }
    private set headerTitleColor(colorValue: string) {
        if (super.getHeaderTitleColor() !== colorValue) {
            super.setHeaderTitleColor(colorValue);
            if (colorValue !== "") {
                this._android.setArrowColor(new Color(colorValue).android);
                //this._android.setHeaderTextAppearance(new android.text.style)
                //android.graphics.drawable
                //setHeaderTextAppearance
            }
            //this._android.setHeaderTextAppearance(new Color(super.getHeaderTitleColor()).android);
        }
    }
    private set eventColor(colorValue: string) {
        if (super.getEventColor() !== colorValue) {
            super.setEventColor(colorValue);
            this._android.removeDecorators();
            this.addDecoratorDot();
            //this.ios.appearance.eventColor = new Color(super.getEventColor()).android;
        }//android.view.View.generateViewId()
    }
    private set selectionColor(colorValue: string) {
        if (super.getSelectionColor() !== colorValue) {
            super.setSelectionColor(colorValue);
            if (super.getSelectionColor() !== "") {
                this._android.setSelectionColor(new Color(super.getSelectionColor()).android);
            }
        }
    }
    private set todayColor(colorValue: string) {
        if (super.getTodayColor() !== colorValue) {
            super.setTodayColor(colorValue);
            this.addDecoratorToday(new Date());
            //this._ios.appearance.todayColor = new Color(this.appearance.todayColor).ios;
        }
    }
    private set todaySelectionColor(colorValue: string) {
        if (super.getTodaySelectionColor() !== colorValue) {
            super.setTodaySelectionColor(colorValue);
            //<this._android.setSelectedDate(new Date());
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
            this.addDecoratorDot();
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

    private addDecoratorToday(date: Date) {
        let _that = this;
        this._android.addDecorator(new MaterialCalendarDecorator({
            shouldDecorate: (day: any) => {
                let should = false;
                if (this.isSameDate(date, day)) {
                    should = true;
                }
                console.log(should);
                return should;
            },
            decorate: (view) => {
                let newColor;
                if (super.getTodayColor() === "") {
                    newColor = new Color("red").android;
                } else {
                    newColor = new Color(super.getTodayColor()).android;
                }
                console.log('decorate');
                let highlightDrawable = new android.graphics.drawable.ColorDrawable(newColor);
                view.setBackgroundDrawable(highlightDrawable);                
            }
        }));
    }

    private addDecoratorDot() {
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
                    let newColor;
                    if (super.getEventColor() === "") {
                        newColor = new Color("green").android;
                    } else {
                        newColor = new Color(super.getEventColor()).android;
                    }
                    view.addSpan(new MaterialCalendarDot(5, newColor));
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