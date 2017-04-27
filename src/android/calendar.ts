import { View } from 'ui/core/view';
import { Color } from "color";
import { CalendarEvent, CalendarCommon, SELECTION_MODE, Appearance, NSEvents } from "../common";
import { isDefined } from "utils/types";
import { PropertyChangeData } from "ui/core/dependency-observable";
import { SCROLL_ORIENTATION } from "../../calendar.android";

declare const com, ColorDrawable;
const MaterialCalendar = com.prolificinteractive.materialcalendarview,
    MaterialCalendarView = MaterialCalendar.MaterialCalendarView,
    MaterialCalendarOnDateSelectedListener = MaterialCalendar.OnDateSelectedListener,
    MaterialCalendarOnMonthChangedListener = MaterialCalendar.OnMonthChangedListener,
    MaterialCalendarMode = MaterialCalendar.CalendarMode,
    MaterialCalendarDecorator = MaterialCalendar.DayViewDecorator,
    MaterialCalendarDot = MaterialCalendar.spans.DotSpan,
    MaterialCalendarDay = MaterialCalendar.day;



export class Calendar extends CalendarCommon {

    private _android: any;
    private _selectedDateListenerNative: any;
    private _selectedDateListener: any;
    private _selectedMonthListenerNative: any;
    private _selectedMonthListener: any;


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



    public _appearancePropertyChanged(data: PropertyChangeData) {
        let newAppearanceValue = <Appearance>data.newValue;
        let oldAppearanceValue = <Appearance>data.oldValue;
        if (newAppearanceValue && newAppearanceValue !== oldAppearanceValue) {
            if (!oldAppearanceValue || newAppearanceValue.headerTitleColor !== oldAppearanceValue.headerTitleColor) {
                this._android.setArrowColor(new Color(newAppearanceValue.headerTitleColor).android);
            }
            if (!oldAppearanceValue || newAppearanceValue.eventColor !== oldAppearanceValue.eventColor) {
                this._android.removeDecorators();
                this.addDecoratorDot(newAppearanceValue.eventColor);
            }
            if (!oldAppearanceValue || newAppearanceValue.selectionColor !== oldAppearanceValue.selectionColor) {
                this._android.setSelectionColor(new Color(newAppearanceValue.selectionColor).android);
            }
            if (!oldAppearanceValue || newAppearanceValue.todayColor !== oldAppearanceValue.todayColor) {
                this.addDecoratorToday(new Date(), newAppearanceValue.todayColor);
            }
        }
    }


    public _settingsPropertyChanged(data: PropertyChangeData) {
        let newSettings = data.newValue,
            oldSettings = data.oldValue;
        if (isDefined(newSettings) && newSettings !== oldSettings) {
            if (!oldSettings || newSettings.displayMode !== oldSettings.displayMode) {
                this._android.state().edit()
                    .setCalendarDisplayMode(newSettings.displayMode)
                    .commit()
            }
            if (!oldSettings || newSettings.selectionMode !== oldSettings.selectionMode) {
                this._android.setSelectionMode(newSettings.selectionMode);
            }
            if (!oldSettings || newSettings.scrollOrientation !== oldSettings.scrollOrientation) {
                this._android.setTitleAnimationOrientation(newSettings.scrollOrientation);
            }
            if (!oldSettings || newSettings.firstWeekday !== oldSettings.firstWeekday) {
                let firstWeekdayTemp = newSettings.firstWeekday <= 7 && oldSettings.firstWeekday > 0 ? 1 : newSettings.firstWeekday;
                this._android.state().edit()
                    .setFirstDayOfWeek(firstWeekdayTemp)
                    .commit();
            }
            let calendarMaxDate = newSettings.maximumDate;
            if (!oldSettings || calendarMaxDate !== oldSettings.maximumDate) {
                this._android.state().edit()
                .setMaximumDate(MaterialCalendarDay.from(calendarMaxDate.getFullYear(), calendarMaxDate.getMonth(), calendarMaxDate.getDate()))
                .commit();
            }
            let calendarMinDate = newSettings.minimumDate;
            if (!oldSettings || newSettings.minimumDate !== oldSettings.minimumDate) {
                this._android.state().edit()
                .setMinimumDate(MaterialCalendarDay.from(calendarMinDate.getFullYear(), calendarMinDate.getMonth(), calendarMinDate.getDate()))
                .commit();
            }
        }
    }


    private addDecoratorToday(date: Date, colorValue) {
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
                if (colorValue === "") {
                    newColor = new Color("red").android;
                } else {
                    newColor = new Color(colorValue).android;
                }
                console.log('decorate');
                let highlightDrawable = new android.graphics.drawable.ColorDrawable(newColor);
                view.setBackgroundDrawable(highlightDrawable);
            }
        }));
    }

    private addDecoratorDot(colorValue: string) {
        let _that = this;
        this._android.addDecorator(
            new MaterialCalendarDecorator({
                shouldDecorate: (day: any) => {
                    let should = false;
                    if (this.events) {
                        let i = 0;
                        while (!should && i < this.events.length) {
                            if (_that.isSameDate(day, this.events[i].date)) {
                                should = true;
                            }
                            i++;
                        }
                    }
                    return should;
                },
                decorate: (view) => {
                    let newColor;
                    if (colorValue === "") {
                        newColor = new Color("green").android;
                    } else {
                        newColor = new Color(colorValue).android;
                    }
                    view.addSpan(new MaterialCalendarDot(5, newColor));
                }
            })
        );
    }

    public dateHasEvent(date): boolean {
        let i = 0, found = false;
        while (!found && i < this.events.length) {

            if (this.isSameDate(date, this.events[i].date)) {
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