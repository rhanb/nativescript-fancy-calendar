import { Component, ElementRef, ViewChild } from "@angular/core";
import {
    Calendar,
    SELECTION_MODE,
    DISPLAY_MODE,
    CalendarEvent,
    Appearance,
    SCROLL_ORIENTATION,
    CalendarSubtitle,
    Settings
} from 'nativescript-fancy-calendar';
import { registerElement } from 'nativescript-angular';
import { Color } from "color";
import { isIOS } from "platform";
import { AnimationCurve } from "ui/enums";

declare const NSDate, UIView, UIViewAnimationOptions;

registerElement('Calendar', () => Calendar);
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    @ViewChild("layout") layout: ElementRef;
    @ViewChild("calendar") calendar: ElementRef;
    @ViewChild("container") container: ElementRef;

    appearanceOptions: Array<Appearance>;
    settings: Settings;
    subtitles: CalendarSubtitle[];
    events: CalendarEvent[];
    public appearance: Appearance;
    private _calendar: Calendar;
    private _layout: any;

    public calendarLoaded(event) {
        console.log("calendarLoaded");
        this.appearanceOptions = new Array<Appearance>({
            weekdayTextColor: "blue",
            headerTitleColor: "black",
            eventColor: "black",
            selectionColor: "blue",
            todayColor: "blue",
            todaySelectionColor: "white",
            borderRadius: 0,
            hasBorder: true
        }, {
                weekdayTextColor: "yellow",
                headerTitleColor: "black",
                eventColor: "black",
                selectionColor: "yellow",
                todayColor: "yellow",
                todaySelectionColor: "white",
                borderRadius: 10,
                hasBorder: true
            }, {
                weekdayTextColor: "pink",
                headerTitleColor: "black",
                eventColor: "black",
                selectionColor: "pink",
                todayColor: "pink",
                todaySelectionColor: "white",
                borderRadius: 15,
                hasBorder: false
            });
        var lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        var nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        this.settings = <Settings>{
            displayMode: DISPLAY_MODE.MONTH,
            scrollOrientation: SCROLL_ORIENTATION.HORIZONTAL,
            selectionMode: SELECTION_MODE.MULTIPLE,
            firstWeekday: 3,
            maximumDate: nextMonth,
            minimumDate: lastMonth
        };
        this.appearance = <Appearance>{
            weekdayTextColor: "white",
            headerTitleColor: "white",
            eventColor: "white",
            selectionColor: "#FF3366",
            todayColor: "#831733",
            hasBorder: true,
            todaySelectionColor: "#FF3366",
            borderRadius: 50
        };
        this._calendar = <Calendar>event.object;
        let temp = new Date();
        let tommorow = new Date().getDate() + 1;
        temp.setDate(tommorow);
        this.events = new Array<CalendarEvent>(new CalendarEvent(new Date()), new CalendarEvent(new Date()), new CalendarEvent(temp));
        if (isIOS) {
            let calendarSubtitle = new CalendarSubtitle(new Date(), "lol");
            this._calendar.subtitles = new Array<CalendarSubtitle>(calendarSubtitle);
        }
    }

    public changeDisplayMode() {
        let newDisplayMode: DISPLAY_MODE;
        let displayModeValue;
        displayModeValue = this.settings.displayMode === DISPLAY_MODE.MONTH ? DISPLAY_MODE.WEEK : DISPLAY_MODE.MONTH;
        this.settings = <Settings>{
            displayMode: displayModeValue,
            scrollOrientation: this.settings.scrollOrientation,
            selectionMode: this.settings.selectionMode,
            firstWeekday: this.settings.firstWeekday,
            maximumDate: this.settings.maximumDate,
            minimumDate: this.settings.minimumDate
        }

        //// this._calendar.reload();
    }
    public layoutLoaded(event) {
        this._layout = <any>event.object;
    }
    public displayModeChanged(event) {
        //let newHeight = this.container.nativeElement.nativeView.frame.size.height - event.data.size.height;
        //this.layout.nativeElement.height = newHeight;
        if (isIOS) {
            let newY = 0;
            if (this.settings.displayMode !== DISPLAY_MODE.MONTH) {
                newY = this.container.nativeElement.nativeView.frame.size.height - this._layout.nativeView.frame.size.height - event.data.size.height + 1;
            }
            this._layout.animate({
                translate: {
                    x: 0,
                    y: - newY
                },
                duration: 300,
                curve: AnimationCurve.easeInOut
            });
        }

        //getRows
    }
    public changeOrientation() {
        let newOrientation: SCROLL_ORIENTATION;
        let orientationValue;
        orientationValue = this.settings.scrollOrientation === SCROLL_ORIENTATION.HORIZONTAL ? SCROLL_ORIENTATION.VERTICAL : SCROLL_ORIENTATION.HORIZONTAL;
        let newSettings = <Settings>{
            displayMode: this.settings.displayMode,
            scrollOrientation: orientationValue,
            selectionMode: this.settings.selectionMode,
            firstWeekday: this.settings.firstWeekday,
            maximumDate: this.settings.maximumDate,
            minimumDate: this.settings.minimumDate
        }
        this.settings = newSettings;
        console.log('changeOrientation');
    }

    public changeFirstWeekDay() {
        let newFirstWeekDay = Math.floor(Math.random() * (1 + 7 - 1)) + 1;
        this.settings = <Settings>{
            displayMode: this.settings.displayMode,
            scrollOrientation: this.settings.scrollOrientation,
            selectionMode: this.settings.selectionMode,
            firstWeekday: newFirstWeekDay,
            maximumDate: this.settings.maximumDate,
            minimumDate: this.settings.minimumDate
        }
        console.log('changeFirstWeekDay');
    }

    public changeSelectionMode() {
        let newSelectionMode: SELECTION_MODE;
        newSelectionMode = this.settings.selectionMode === SELECTION_MODE.MULTIPLE ? SELECTION_MODE.SINGLE : SELECTION_MODE.MULTIPLE;
        this.settings = <Settings>{
            displayMode: this.settings.displayMode,
            scrollOrientation: this.settings.scrollOrientation,
            selectionMode: newSelectionMode,
            firstWeekday: this.settings.firstWeekday,
            maximumDate: this.settings.maximumDate,
            minimumDate: this.settings.minimumDate
        }
    }

    public changeAppearance() {
        let appearanceIndex = Math.floor(Math.random() * (1 + this.appearanceOptions.length - 1 - 0)) + 0;
        this.appearance = this.appearanceOptions[appearanceIndex];
    }

    public changeEvents() {
        if (this.events.length > 1) {
            this.events = new Array<CalendarEvent>(new CalendarEvent(new Date()));
        } else {
            let temp = new Date();
            let tommorow = new Date().getDate() + 1;
            temp.setDate(tommorow);
            this.events = new Array<CalendarEvent>(new CalendarEvent(new Date()), new CalendarEvent(temp));
        }
        this._calendar.reload();
    }




    public dateSelected(event) {
        console.log('date selected');
    }


    public monthChanged(event) {
        console.log('month selected');
    }
}

