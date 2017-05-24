import {
    CalendarEvent,
    CalendarBase,
    SELECTION_MODE,
    Appearance,
    NSEvents,
    Settings,
    settingsProperty,
    appearanceProperty,
    eventsProperty
} from "../common";
import { isDefined } from "utils/types";
import { Color } from "tns-core-modules/color";

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

export enum DISPLAY_MODE {
    "WEEK" = FSCalendarScopeWeek,
    "MONTH" = FSCalendarScopeMonth
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
        let delegate = <CalendarDelegate>CalendarDelegate.new() as CalendarDelegate;
        delegate._owner = owner;
        return delegate;
    }

    public get owner(): WeakRef<Calendar> {
        return this._owner;
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
    public calendarBoundingRectWillChangeAnimated(calendar: any, bounds: CGRect, animated: boolean): void {
        //this._owner.get().ios.frame.size.height = bounds.size.height;
        //this._owner.get().height = bounds.size.height;
        //this._owner.get().setSalendarHeightConstraint(bounds.size.height);
        /*let _that = new WeakRef(this);
        UIView.animateWithDurationDelayOptionsAnimationsCompletion(0.3, 0, UIViewAnimationOptions.CurveEaseInOut, () => {
            /*let view = _that.get()._owner.get().ios;
            let theView = new UIView({ frame: CGRectMake(0, 0, view.width, bounds.size.height) });
            view = theView;
            let container = _that.get()._owner;
            container.get().height = bounds.size.height;
            _that.get()._owner = container;
        }, (bool) => {
        });*/
        this._owner.get().displayModeChanged(bounds);
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
        let maximumDate = this._owner && this._owner.get().settings && isDefined(this._owner.get().settings.maximumDate) ? this._owner.get().settings.maximumDate : null;
        return maximumDate;
    }
    public minimumDateForCalendar(calendar: any): Date {
        let minimumDate = this._owner.get().settings && isDefined(this._owner.get().settings.minimumDate) ? this._owner.get().settings.minimumDate : null;
        return minimumDate;
    }

    public calendarNumberOfEventsForDate(calendar, date: Date): number {
        if (this._owner)
            return this._owner.get().dateHasEvent(date);
        return 0;
    }

}
export class Calendar extends CalendarBase {
    private _subtitles: Array<CalendarSubtitle>;
    private _delegate: CalendarDelegate;
    private _dataSource: CalendarDataSource;
    private _calendarHeightConstraint: NSLayoutConstraint;

    constructor() {

        super();
        this.nativeView = FSCalendar.alloc().initWithFrame(CGRectMake(0, 0, 320, 300));
        this._delegate = CalendarDelegate.initWithOwner(new WeakRef(this));
        this._dataSource = CalendarDataSource.initWithOwner(new WeakRef(this));
        this._calendarHeightConstraint = new NSLayoutConstraint();
        this.appearance = <Appearance>{
            weekdayTextColor: "black",
            headerTitleColor: "black",
            eventColor: "red",
            selectionColor: "blue",
            todayColor: "yellow",
            todaySelectionColor: "orange",
            borderRadius: 25
        }
        this.settings = <Settings>{
            displayMode: DISPLAY_MODE.MONTH,
            scrollOrientation: SCROLL_ORIENTATION.HORIZONTAL,
            selectionMode: SELECTION_MODE.SINGLE,
            firstWeekday: 3,
            maximumDate: undefined,
            minimumDate: undefined
        };
    }

    public get ios() {
        return this.nativeView;
    }

    public onLoaded() {
        super.onLoaded();
        if (this.height) {
            this.nativeView.frame.size.height = this.height;
            this.nativeView.frame.size.height = this.height;
            //this._calendarHeightConstraint.constant = this.height;
        }
        if (this.width) {
            this.nativeView.frame.size.width = this.width;
            this.nativeView.frame.size.width = this.width;
        }
        this.nativeView.delegate = this._delegate;
        this.nativeView.dataSource = this._dataSource;
    }

    public onUnloaded() {

    }

    public disposeNativeView() {

    }

    public get calendarHeightConstraint(): NSLayoutConstraint {
        return this._calendarHeightConstraint
    }

    public setSalendarHeightConstraint(height: number) {
        this._calendarHeightConstraint.constant = height;
    }

    [settingsProperty.setNative](newSettings: Settings) {
        console.dir(newSettings);

        this.nativeView.setScopeAnimated(newSettings.displayMode, true);

        this.nativeView.allowsMultipleSelection = newSettings.selectionMode === SELECTION_MODE.MULTIPLE ? true : false;

        this.nativeView.scrollDirection = newSettings.scrollOrientation === 0 ? SCROLL_ORIENTATION.VERTICAL : SCROLL_ORIENTATION.HORIZONTAL;

        let firstWeekdayTemp = newSettings.firstWeekday <= 7 && newSettings.firstWeekday > 0 ? newSettings.firstWeekday : 1;

        this.nativeView.firstWeekday = firstWeekdayTemp;

        //maximumDate

        //minimumDate
    }

    [appearanceProperty.setNative](newAppearanceValue: Appearance) {
        console.dir(newAppearanceValue);

        this.nativeView.appearance.weekdayTextColor = new Color(newAppearanceValue.weekdayTextColor).ios;

        this.nativeView.appearance.headerTitleColor = new Color(newAppearanceValue.headerTitleColor).ios;

        this.nativeView.appearance.eventColor = new Color(newAppearanceValue.eventColor).ios;

        this.nativeView.appearance.selectionColor = new Color(newAppearanceValue.selectionColor).ios;

        this.nativeView.appearance.todayColor = new Color(newAppearanceValue.todayColor).ios;

        this.nativeView.appearance.todaySelectionColor = new Color(newAppearanceValue.todaySelectionColor).ios;

        this.nativeView.appearance.borderRadius = newAppearanceValue.borderRadius;

        this.nativeView.clipsToBounds = newAppearanceValue.hasBorder;

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

    [eventsProperty.setNative](newEvents: CalendarEvent) {
        this.nativeView.dataSource = CalendarDataSource.initWithOwner(new WeakRef(this));
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
        this.nativeView.reloadData();
    }

    public displayModeChanged(bounds) {
        this.notify({
            eventName: NSEvents.displayModeChanged,
            object: this,
            data: bounds
        });
    }
}