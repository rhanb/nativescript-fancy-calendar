import {
    CalendarEvent,
    CalendarBase,
    SELECTION_MODE,
    Appearance,
    NSEvents,
    eventsProperty,
    settingsProperty,
    Settings,
    appearanceProperty
} from "../common";
import { Color } from "tns-core-modules/color";
import { isDefined } from "utils/types";
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



export class Calendar extends CalendarBase {

    public get android() {
        return this.nativeView;
    }

    public createNativeView() {
        let nativeView = new MaterialCalendarView(this._context);

        this.appearance = <Appearance>{
            weekdayTextColor: "black",
            headerTitleColor: "black",
            eventColor: "red",
            selectionColor: "blue",
            todayColor: "yellow",
            todaySelectionColor: "orange",
            borderRadius: 25
        }

        nativeView.setHeaderTextAppearance(android.R.style.TextAppearance_AppCompat_Medium);
        nativeView.setWeekDayTextAppearance(android.R.style.TextAppearance_AppCompat_Medium);
        nativeView.setDateTextAppearance(android.R.style.CustomDayTextAppearance);

        let _that = new WeakRef(this);

        let selectedDateListener = new MaterialCalendarOnDateSelectedListener({
            get owner(): Calendar {
                return _that.get();
            },
            onDateSelected: function (widget, date, selected) {
                this.owner.notify({
                    eventName: NSEvents.dateSelected,
                    object: _that,
                    data: { date: date, selected: selected }
                });
            }
        });

        nativeView.setOnDateChangedListener(selectedDateListener);

        let selectedMonthListener = new MaterialCalendarOnMonthChangedListener({
            get owner(): Calendar {
                return _that.get();
            },
            onMonthChanged: function (widget, date) {
                this.owner.notify({
                    eventName: NSEvents.monthChanged,
                    object: _that,
                    data: date
                });
            }
        });

        nativeView.setOnMonthChangedListener(selectedMonthListener);

        return nativeView;
    }

    [appearanceProperty.setNative](newAppearanceValue: Appearance) {
        this.nativeView.setArrowColor(new Color(newAppearanceValue.headerTitleColor).android);
        //this.nativeView.setHeaderTextAppearance(android.R.style.android)

        this.nativeView.removeDecorators();
        this.addDecoratorDot(newAppearanceValue.eventColor);

        this.nativeView.setSelectionColor(new Color(newAppearanceValue.selectionColor).android);

        if (!newAppearanceValue.todaySelectionColor) {
            newAppearanceValue.todaySelectionColor = newAppearanceValue.selectionColor;
        }
        if (!newAppearanceValue.borderRadius) {
            newAppearanceValue.borderRadius = 50;
        }
        this.nativeView.removeDecorators();
        this.addDecoratorToday(new Date(), newAppearanceValue.todayColor, newAppearanceValue.todaySelectionColor, newAppearanceValue.borderRadius);
        this.addDecoratorDot(this.appearance.eventColor);
        /*
        if (!oldAppearanceValue || newAppearanceValue.weekdayTextColor !== oldAppearanceValue.weekdayTextColor) {
            this._ios.appearance.weekdayTextColor = new Color(newAppearanceValue.weekdayTextColor).ios;
        }*/

    }

    [settingsProperty.setNative](newSettings: Settings) {
        let oldSettings = this.settings;
        this.nativeView.state().edit()
            .setCalendarDisplayMode(newSettings.displayMode)
            .commit()

        this.nativeView.setSelectionMode(newSettings.selectionMode);

        this.nativeView.setTitleAnimationOrientation(newSettings.scrollOrientation);

        let firstWeekdayTemp = newSettings.firstWeekday <= 7 && newSettings.firstWeekday > 0 ? newSettings.firstWeekday : 1;
        this.nativeView.state().edit()
            .setFirstDayOfWeek(firstWeekdayTemp)
            .commit();

        let calendarMaxDate = newSettings.maximumDate;
        this.nativeView.state().edit()
            .setMaximumDate(new MaterialCalendarDay(calendarMaxDate.getFullYear(), calendarMaxDate.getMonth(), calendarMaxDate.getDate()))
            .commit();

        let calendarMinDate = newSettings.minimumDate;
        this.nativeView.state().edit()
            .setMinimumDate(new MaterialCalendarDay(calendarMinDate.getFullYear(), calendarMinDate.getMonth(), calendarMinDate.getDate()))
            .commit();
    }

    [eventsProperty.setNative](newEvents: Array<CalendarEvent>) {
        this.nativeView.removeDecorators();
        this.addDecoratorDot(this.appearance.eventColor);
    }


    private addDecoratorToday(date: Date, colorBackgroundValue: string, colorSelectionValue: string, borderRadiusValue: number) {
        let _that = this;
        this.nativeView.addDecorator(new MaterialCalendarDecorator({
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
        this.nativeView.addDecorator(
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