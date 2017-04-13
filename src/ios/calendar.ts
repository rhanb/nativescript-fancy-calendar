import { View } from 'ui/core/view';
import { Color } from "color";
import { CalendarEvent, CalendarCommon, SELECTION_MODE, Appearance } from "../common";

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
        let delegate = <CalendarDelegate>CalendarDelegate.new();
        delegate._owner = owner;
        return delegate;
    }
    public calendarDidSelectDate(calendar, date: any) {
        this._owner.get().dateSelected(date);
    }
    public calendarCurrentPageDidChange(calendar) {
        this._owner.get().pageChanged();
    }

    public calendarBoundingRectWillChange(calendar, bounds, animated) {
        this._owner.get().ios.frame = CGRectMake(calendar.frame.origin.x, calendar.frame.origin.y, bounds.size.width, bounds.size.height);
    }

    public calendarCurrentScopeWillChangeAnimated(calendar, animated: boolean): void {
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
    public calendarHasEventForDate(calendar, date: any): boolean {
        return this._owner.get().dateHasEvent(date);
    }

    public calendarSubtitleForDate(calendar, date: any): string {
        return this._owner.get().dateHasSubtitle(date);
    }

    public calendarImageForDate(calendar, date: any): string {
        return this._owner.get().dateHasEventImage(date);
    }
    public calendarMinimumDateForCalendar(calendar, date: any): any {
        return this._owner.get().minimumDate;
    }

    public calendarMaxDateForCalendar(calendar, date: any): any {
        return this._owner.get().maximumDate;
    }

}
export class Calendar extends CalendarCommon {

    private _ios: any;
    private _scrollOrientation: SCROLL_ORIENTATION;
    private _subtitles: Array<CalendarSubtitle>;
    private _hasBorder: boolean;

    constructor() {
        super();
        this._ios = FSCalendar.alloc().initWithFrame(CGRectMake(0, 0, 0, 0));
        this._ios.delegate = CalendarDelegate.initWithOwner(new WeakRef(this));
        this._ios.dataSource = CalendarDataSource.initWithOwner(new WeakRef(this));
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

    public get ios() {
        return this._ios;
    }

    public get _nativeView() {
        return this._ios;
    }

    public get scrollOrientation(): SCROLL_ORIENTATION {
        return this._scrollOrientation;
    }

    public set scrollOrientation(scrollOrientationValue: SCROLL_ORIENTATION) {
        if (scrollOrientationValue !== this._scrollOrientation) {
            this._scrollOrientation = scrollOrientationValue;
            this._ios.scrollDirection = this._scrollOrientation;
        }

    }


    public set displayMode(displayModeValue: any) {
        if (displayModeValue !== super.getDisplayMode()) {
            super.setDisplayMode(displayModeValue);
            this._ios.scope = this.displayMode;
        }
    }

    public set selectionMode(calendarSelectionMode: SELECTION_MODE) {
        if (super.getSelectionMode() !== calendarSelectionMode) {
            super.setSelectionMode(calendarSelectionMode);
            switch (super.getSelectionMode()) {
                case SELECTION_MODE.MULTIPLE:
                    this._ios.allowsMultipleSelection = true;
                    break;
                case SELECTION_MODE.SINGLE:
                    this._ios.allowsMultipleSelection = false;
                    break;
            }
        }
    }


    public set firstWeekday(firstWeekDayValue: number) {
        if (super.getFirstWeekday() !== firstWeekDayValue) {
            let firstWeekdayTemp = firstWeekDayValue <= 7 && super.getFirstWeekday() > 0 ? 1 : firstWeekDayValue;
            super.setFirstWeekDay(firstWeekdayTemp);
            this._ios.firstWeekday = super.getFirstWeekday();
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
            super.setWeekdayTextColor(colorValue)
            this._ios.appearance.weekdayTextColor = new Color(super.getWeekdayTextColor()).ios;
        }
    }
    private set headerTitleColor(colorValue: string) {
        if (super.getHeaderTitleColor() !== colorValue) {
            super.setHeaderTitleColor(colorValue);
            this._ios.appearance.headerTitleColor = new Color(super.getHeaderTitleColor()).ios;
        }
    }
    private set eventColor(colorValue: string) {
        if (super.getEventColor() !== colorValue) {
            super.setEventColor(colorValue);
            this.ios.appearance.eventColor = new Color(super.getEventColor()).ios;
        }
    }
    private set selectionColor(colorValue: string) {
        if (super.getSelectionColor() !== colorValue) {
            super.setSelectionColor(colorValue);
            this.ios.appearance.selectionColor = new Color(super.getSelectionColor()).ios;
        }
    }
    private set todayColor(colorValue: string) {
        if (super.getTodayColor() !== colorValue) {
            super.setTodayColor(colorValue);
            this._ios.appearance.todayColor = new Color(super.getTodayColor()).ios;
        }
    }
    private set todaySelectionColor(colorValue: string) {
        if (super.getTodaySelectionColor() !== colorValue) {
            super.setTodaySelectionColor(colorValue);
            this._ios.appearance.todaySelectionColor = new Color(super.getTodaySelectionColor()).ios;
        }
    }

    private set borderRadiusSelectedDay(borderRadiusValue: number) {
        if (super.getBorderRadiusSelectedDay() !== borderRadiusValue) {
            super.setBorderRadiusSelectedDay(borderRadiusValue);
            this._ios.appearance.borderRadius = super.getBorderRadiusSelectedDay();
        }
    }

    public set events(calendarEvents: Array<CalendarEvent>) {
        if (super.getEvents() !== calendarEvents) {
            super.setEvents(calendarEvents);
        }
    }

    public set subtitles(calendarSubtitles: Array<CalendarSubtitle>) {
        if (this._subtitles !== calendarSubtitles) {
            this._subtitles = calendarSubtitles;
        }
    }

    public dateSelected(date) {
    }

    public pageChanged() {
    }

    public dateHasEvent(date): boolean {
        let i = 0, found = false;
        while (!found && i < super.getEvents().length) {
            if (this.isSameDate(date, super.getEvents()[i].date) && !super.getEvents()[i].source) {
                found = true;
            }
            i++;
        }
        return found;
    }
    public dateHasEventImage(date): string {
        let i = 0, found = undefined;
        while (!found && i < super.getEvents().length) {
            if (this.isSameDate(date, super.getEvents()[i].date) && super.getEvents()[i].source) {
                found = super.getEvents()[i].source;
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

    public get hasBorder(): boolean {
        return this._hasBorder;
    }

    public set hasBorder(calendarHasBorder: boolean) {
        if (this._hasBorder !== calendarHasBorder) {
            this._ios.clipsToBounds = this._hasBorder;
        }
    }

    public set maximumDate(calendarMaxDate: Date) {
        if (this.maximumDate !== calendarMaxDate) {
            super.setMaximumDate(calendarMaxDate);
        }
    }

    public set minimumDate(calendarMinDate: Date) {
        if (this.minimumDate !== calendarMinDate) {
            super.setMinimumDate(calendarMinDate);
        }
    }

    onLoaded() {
        super.onLoaded();
        if (this.width && this.height) {
            this._ios.frame = CGRectMake(0, 0, this.width, this.height);
        } else {
            this._ios.frame = CGRectMake(0, 0, 300, 300);
        }
    }
}