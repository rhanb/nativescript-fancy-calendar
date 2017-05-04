import { View } from 'ui/core/view';
import { Color } from "color";
import { CalendarEvent, CalendarCommon, SELECTION_MODE, Appearance, NSEvents, Settings } from "../common";
import { isDefined } from "utils/types";
import { PropertyChangeData } from "ui/core/dependency-observable";

declare const FSCalendar,
    FSCalendarScrollDirectionVertical,
    FSCalendarScrollDirectionHorizontal,
    FSCalendarScopeWeek,
    FSCalendarScopeMonth,
    FSCalendarDelegate,
    FSCalendarDataSource
CGRectMake;

export enum SCROLL_ORIENTATION {
    "VERTICAL" = FSCalendarScrollDirectionVertical,
    "HORIZONTAL" = FSCalendarScrollDirectionHorizontal
}

export class CalendarSubtitle {
    private _date: any;
    private _text: string
    constructor(subtitleDate: any, subtitleText: string) {
        this._date = subtitleDate;
        this._text = subtitleText;
    }

    public get date() {
        return this._date;
    }

    public set date(subtitleDate: any) {
        this._date = subtitleDate;
    }

    public get text(): string {
        return this._text;
    }

    public set text(subtitleText: string) {
        this._text = subtitleText;
    }
}

class CalendarDelegate extends NSObject {
    public static ObjCProtocols = [FSCalendarDelegate];
    private _owner: WeakRef<Calendar>;

    public static initWithOwner(owner: WeakRef<Calendar>): CalendarDelegate {
        let delegate = <CalendarDelegate>CalendarDelegate.new();
        delegate._owner = owner;
        return delegate;
    }
    public calendarDidSelectDateAtMonthPosition?(calendar: any, date: Date, monthPosition: any): void {
        if (this._owner) {
            this._owner.get().dateSelectedEvent(date);
        }
    }
    public calendarDidDeselectDateAtMonthPosition(calendar: any, date: Date, monthPosition: any): void {
        if (this._owner) {
            this._owner.get().dateSelectedEvent(date);
        }
    }
    public calendarCurrentMonthDidChange(calendar) {
        if (this._owner) {
            this._owner.get().pageChanged(calendar);
        }
    }

    public calendarBoundingRectWillChangeAnimated(calendar: any, bounds: CGRect, animated: boolean) {
        let frame = this._owner.get().ios.frame;
        var rect = new CGRect({
            origin: frame.origin,
            size: frame.size
        });
        this._owner.get().ios.frame = rect;
    }

}

class CalendarDataSource extends NSObject {
    public static ObjCProtocols = [FSCalendarDataSource];
    private _owner: WeakRef<Calendar>;

    public static initWithOwner(owner: WeakRef<Calendar>): CalendarDataSource {
        let source = <CalendarDataSource>CalendarDataSource.new();
        source._owner = owner;
        return source;
    }

    public calendarSubtitleForDate(calendar, date: NSDate): string {
        if (this._owner)
            return this._owner.get().dateHasSubtitle(date);
        return undefined;
    }

    public maximumDateForCalendar(calendar: any): Date {
        return this._owner.get().settings.maximumDate;
    }
    public minimumDateForCalendar(calendar: any): Date {
        return this._owner.get().settings.minimumDate;
    }

    public calendarNumberOfEventsForDate(calendar, date: Date): number {
        if (this._owner)
            return this._owner.get().dateHasEvent(date);
        return 0;
    }

}
export class Calendar extends CalendarCommon {

    private _ios: any;
    private _subtitles: Array<CalendarSubtitle>;
    private _delegate: CalendarDelegate;
    private _dataSource: CalendarDataSource;

    constructor() {
        super();
        this._ios = FSCalendar.alloc().initWithFrame(CGRectMake(0, 0, 0, 0));
        this._delegate = CalendarDelegate.initWithOwner(new WeakRef(this));
        this._dataSource = CalendarDataSource.initWithOwner(new WeakRef(this));
        this.appearance = <Appearance>{
            weekdayTextColor: "black",
            headerTitleColor: "black",
            eventColor: "red",
            selectionColor: "blue",
            todayColor: "yellow",
            todaySelectionColor: "orange",
            borderRadius: 25
        }
    }

    public get ios() {
        return this._ios;
    }

    public get _nativeView() {
        return this._ios;
    }

    public _settingsPropertyChanged(data: PropertyChangeData) {
        let newSettings = <Settings>data.newValue,
            oldSettings = <Settings>data.oldValue;
        if (isDefined(newSettings) && newSettings !== oldSettings) {
            if (!oldSettings || newSettings.displayMode !== oldSettings.displayMode) {
                this._ios.setScopeAnimated(newSettings.displayMode, true);
            }
            if (!oldSettings || newSettings.selectionMode !== oldSettings.selectionMode) {
                this._ios.allowsMultipleSelection = newSettings.selectionMode === SELECTION_MODE.MULTIPLE ? true : false;
            }
            if (!oldSettings || newSettings.scrollOrientation !== oldSettings.scrollOrientation) {
                this._ios.scrollDirection = newSettings.scrollOrientation === 0 ? SCROLL_ORIENTATION.VERTICAL : SCROLL_ORIENTATION.HORIZONTAL;
            }
            if (!oldSettings || newSettings.firstWeekday !== oldSettings.firstWeekday) {
                let firstWeekdayTemp = newSettings.firstWeekday <= 7 && newSettings.firstWeekday > 0 ? newSettings.firstWeekday : 1;
                this._ios.firstWeekday = firstWeekdayTemp;
            }
            if (!oldSettings || newSettings.maximumDate !== oldSettings.maximumDate) {
                //maximumDate
            }
            if (!oldSettings || newSettings.minimumDate !== oldSettings.minimumDate) {
                //minimumDate
            }
        }
    }



    public _appearancePropertyChanged(data: PropertyChangeData) {
        let newAppearanceValue = <Appearance>data.newValue;
        let oldAppearanceValue = <Appearance>data.oldValue;
        if (newAppearanceValue && newAppearanceValue !== oldAppearanceValue) {
            if (!oldAppearanceValue || newAppearanceValue.weekdayTextColor !== oldAppearanceValue.weekdayTextColor) {
                this._ios.appearance.weekdayTextColor = new Color(newAppearanceValue.weekdayTextColor).ios;
            }
            if (!oldAppearanceValue || newAppearanceValue.headerTitleColor !== oldAppearanceValue.headerTitleColor) {
                this._ios.appearance.headerTitleColor = new Color(newAppearanceValue.headerTitleColor).ios;
            }
            if (!oldAppearanceValue || newAppearanceValue.eventColor !== oldAppearanceValue.eventColor) {
                this._ios.appearance.eventColor = new Color(newAppearanceValue.eventColor).ios;
            }
            if (!oldAppearanceValue || newAppearanceValue.selectionColor !== oldAppearanceValue.selectionColor) {
                this._ios.appearance.selectionColor = new Color(newAppearanceValue.selectionColor).ios;
            }
            if (!oldAppearanceValue || newAppearanceValue.todayColor !== oldAppearanceValue.todayColor) {
                this._ios.appearance.todayColor = new Color(newAppearanceValue.todayColor).ios;
            }
            if (!oldAppearanceValue || newAppearanceValue.todaySelectionColor !== oldAppearanceValue.todaySelectionColor) {
                this._ios.appearance.todaySelectionColor = new Color(newAppearanceValue.todaySelectionColor).ios;
            }
            if (!oldAppearanceValue || newAppearanceValue.borderRadius !== oldAppearanceValue.borderRadius) {
                this._ios.appearance.borderRadius = newAppearanceValue.borderRadius;
            }
            if (!oldAppearanceValue || newAppearanceValue.hasBorder !== oldAppearanceValue.hasBorder) {
                this._ios.clipsToBounds = newAppearanceValue.hasBorder;
            }
        }
    }

    public set subtitles(calendarSubtitles: Array<CalendarSubtitle>) {
        if (this._subtitles !== calendarSubtitles) {
            this._subtitles = calendarSubtitles;
        }
    }

    public dateSelectedEvent(date) {
        this.notify({
            eventName: NSEvents.dateSelected,
            object: this,
            data: date
        });
    }

    public pageChanged(calendar) {
        this.notify({
            eventName: NSEvents.monthChanged,
            object: this,
            data: calendar
        });
    }

    public dateHasEvent(date): number {
        let countEventsDate = 0;
        let _that = this;
        this.events.forEach(function (event) {
            if (_that.isSameDate(date, event.date)) {
                countEventsDate++;
            }
        })
        return countEventsDate;
    }
    public _eventsPropertyChanged(data: PropertyChangeData) {
        this._ios.dataSource = CalendarDataSource.initWithOwner(new WeakRef(this));
    }

    public dateHasEventImage(date): string {
        let i = 0, found = undefined;
        while (!found && i < this.events.length) {
            if (this.isSameDate(date, this.events[i].date) && this.events[i].source) {
                found = this.events[i].source;
            }
            i++;
        }
        return found;
    }

    public dateHasSubtitle(date): string {
        let found = undefined;
        if (this._subtitles) {
            let i = 0;
            while (!found && i < this._subtitles.length) {
                if (this.isSameDate(date, this._subtitles[i].date)) {
                    found = this._subtitles[i].text;
                }
                i++;
            }
        }
        return found;
    }

    private isSameDate(dateOne, dateTwo) {
        return dateOne.getMonth() === dateTwo.getMonth() && dateOne.getDay() === dateTwo.getDay() && dateOne.getYear() === dateTwo.getYear() && dateOne.getDate() === dateTwo.getDate();
    }


    public reload() {
        this._ios.reloadData();
    }

    onLoaded() {
        super.onLoaded();
        this._ios.delegate = this._delegate;
        this._ios.dataSource = this._dataSource;
    }
}