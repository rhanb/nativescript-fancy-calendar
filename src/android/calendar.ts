import { View } from 'ui/core/view';
import { Color } from "color";
import { CalendarEvent, CalendarCommon, SELECTION_MODE, Appearance, NSEvents } from "../common";
import { isDefined } from "utils/types";
import { PropertyChangeData } from "ui/core/dependency-observable";
import { SCROLL_ORIENTATION } from "../../calendar.android";

declare const com, ColorDrawable, android, R;
const MaterialCalendar = com.prolificinteractive.materialcalendarview,
    MaterialCalendarView = MaterialCalendar.MaterialCalendarView,
    MaterialCalendarOnDateSelectedListener = MaterialCalendar.OnDateSelectedListener,
    MaterialCalendarOnMonthChangedListener = MaterialCalendar.OnMonthChangedListener,
    MaterialCalendarMode = MaterialCalendar.CalendarMode,
    MaterialCalendarDecorator = MaterialCalendar.DayViewDecorator,
    MaterialCalendarDot = MaterialCalendar.spans.DotSpan,
    MaterialCalendarDay = MaterialCalendar.CalendarDay;



export class Calendar extends CalendarCommon {

    private _android: any;
    private _selectedDateListener: any;
    private _selectedMonthListener: any;


    public get android() {
        return this._android;
    }

    public get _nativeView(): any {
        return this._android;
    }

    public _createUI() {
        this._android = new MaterialCalendarView(this._context);
        this.appearance = <Appearance>{
            weekdayTextColor: "black",
            headerTitleColor: "black",
            eventColor: "red",
            selectionColor: "blue",
            todayColor: "yellow",
            todaySelectionColor: "orange",
            borderRadius: 25
        }
        console.dir(android.R.style.TextAppearance_AppCompat_Medium);
        console.dir(android.R);

        this._android.setHeaderTextAppearance(android.R.style.TextAppearance_AppCompat_Medium);
        this._android.setWeekDayTextAppearance(android.R.style.TextAppearance_AppCompat_Medium);
        this._android.setDateTextAppearance(android.R.style.CustomDayTextAppearance);
        let _that = this;
        this._selectedDateListener = new MaterialCalendarOnDateSelectedListener({
            onDateSelected: function (widget, date, selected) {
                console.log('onDateSelected');
                _that.notify({
                    eventName: NSEvents.dateSelected,
                    object: _that,
                    data: { date: date, selected: selected }
                });
            }
        });
        this._selectedMonthListener = new MaterialCalendarOnMonthChangedListener({
            onMonthChanged: function (widget, date) {
                console.log('onMonthSelected');
                _that.notify({
                    eventName: NSEvents.monthChanged,
                    object: _that,
                    data: date
                });
            }
        });
        this._android.setOnDateChangedListener(this._selectedDateListener);
        this._android.setOnMonthChangedListener(this._selectedMonthListener);
    }



    public _appearancePropertyChanged(data: PropertyChangeData) {
        let newAppearanceValue = <Appearance>data.newValue;
        let oldAppearanceValue = <Appearance>data.oldValue;
        if (newAppearanceValue && newAppearanceValue !== oldAppearanceValue) {
            if (!oldAppearanceValue || newAppearanceValue.headerTitleColor !== oldAppearanceValue.headerTitleColor) {
                this._android.setArrowColor(new Color(newAppearanceValue.headerTitleColor).android);
                //this._android.setHeaderTextAppearance(android.R.style.android)
            }
            if (!oldAppearanceValue || newAppearanceValue.eventColor !== oldAppearanceValue.eventColor) {
                this._android.removeDecorators();
                this.addDecoratorDot(newAppearanceValue.eventColor);
            }
            if (!oldAppearanceValue || newAppearanceValue.selectionColor !== oldAppearanceValue.selectionColor) {
                this._android.setSelectionColor(new Color(newAppearanceValue.selectionColor).android);
            }
            if (!oldAppearanceValue || newAppearanceValue.todayColor !== oldAppearanceValue.todayColor || newAppearanceValue.todaySelectionColor !== oldAppearanceValue.todaySelectionColor || newAppearanceValue.borderRadius !== oldAppearanceValue.borderRadius) {
                if (!newAppearanceValue.todaySelectionColor) {
                    newAppearanceValue.todaySelectionColor = newAppearanceValue.selectionColor;
                }
                if (!newAppearanceValue.borderRadius) {
                    newAppearanceValue.borderRadius = 50;
                }
                this._android.removeDecorators();
                this.addDecoratorToday(new Date(), newAppearanceValue.todayColor, newAppearanceValue.todaySelectionColor, newAppearanceValue.borderRadius);
                this.addDecoratorDot(this.appearance.eventColor);
            }
            /*
            if (!oldAppearanceValue || newAppearanceValue.weekdayTextColor !== oldAppearanceValue.weekdayTextColor) {
                this._ios.appearance.weekdayTextColor = new Color(newAppearanceValue.weekdayTextColor).ios;
            }*/
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
                let firstWeekdayTemp = newSettings.firstWeekday <= 7 && newSettings.firstWeekday > 0 ? 1 : newSettings.firstWeekday;
                console.log(firstWeekdayTemp);
                this._android.state().edit()
                    .setFirstDayOfWeek(firstWeekdayTemp)
                    .commit();
            }
            let calendarMaxDate = newSettings.maximumDate;
            if (!oldSettings || calendarMaxDate && calendarMaxDate !== oldSettings.maximumDate) {
                this._android.state().edit()
                    .setMaximumDate(new MaterialCalendarDay(calendarMaxDate.getFullYear(), calendarMaxDate.getMonth(), calendarMaxDate.getDate()))
                    .commit();
            }
            let calendarMinDate = newSettings.minimumDate;
            if (!oldSettings || calendarMaxDate && newSettings.minimumDate !== oldSettings.minimumDate) {
                this._android.state().edit()
                    .setMinimumDate(new MaterialCalendarDay(calendarMinDate.getFullYear(), calendarMinDate.getMonth(), calendarMinDate.getDate()))
                    .commit();
            }
        }
    }

    public _eventsPropertyChanged(data: PropertyChangeData) {
        let newEvents = <Array<CalendarEvent>>data.newValue;
        let oldEvents = <Array<CalendarEvent>>data.oldValue;
        if (!oldEvents || newEvents && newEvents !== oldEvents) {
            this._android.removeDecorators();
            this.addDecoratorDot(this.appearance.eventColor);
        }
    }


    private addDecoratorToday(date: Date, colorBackgroundValue: string, colorSelectionValue: string, borderRadiusValue: number) {
        let _that = this;
        this._android.addDecorator(new MaterialCalendarDecorator({
            shouldDecorate: (day: any) => {
                let should = false;
                if (this.isSameDate(day, date)) {
                    should = true;
                }
                return should;
            },
            decorate: (view) => {
                let newBackgroundColor = colorBackgroundValue === "" ? new Color("red").android : new Color(colorBackgroundValue).android;
                let newSelectionColor = colorSelectionValue === "" ? new Color("blue").android : new Color(colorSelectionValue).android;
                let highlightDrawable = new android.graphics.drawable.GradientDrawable();
                let setSelectionDrawable = new android.graphics.drawable.GradientDrawable();

                highlightDrawable.setCornerRadius(borderRadiusValue * 2);
                highlightDrawable.setColor(newBackgroundColor);
                highlightDrawable.setSize(40, 40);
                highlightDrawable.getPadding(new android.graphics.Rect(10, 10, 10, 10));

                setSelectionDrawable.setCornerRadius(borderRadiusValue * 2);
                setSelectionDrawable.setColor(newSelectionColor);
                setSelectionDrawable.setSize(40, 40);
                setSelectionDrawable.getPadding(new android.graphics.Rect(10, 10, 10, 10));
                view.setBackgroundDrawable(highlightDrawable);
                view.setSelectionDrawable(setSelectionDrawable);
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
        return dateOne.getMonth() === dateTwo.getMonth() && dateOne.getDay() === dateTwo.getDate();
    }
}