import { Component } from "@angular/core";
import { Calendar, SELECTION_MODE, DISPLAY_MODE, CalendarEvent, Appearance } from 'nativescript-fancy-calendar';

import { registerElement } from 'nativescript-angular';
import { Color } from "color";
import { SCROLL_ORIENTATION, CalendarSubtitle, Settings } from "nativescript-fancy-calendar";
import { isIOS } from "platform";

declare const NSDate;

registerElement('Calendar', () => Calendar);
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    appearanceOptions: Array<Appearance>;
    settings: any;
    subtitles: CalendarSubtitle[];
    events: CalendarEvent[];
    public appearance: Appearance;
    private _calendar: Calendar;

    public calendarLoaded(event) {
        console.log("calendarLoaded");
        this.appearanceOptions = new Array<Appearance>({
            weekdayTextColor: "blue",
            headerTitleColor: "black",
            eventColor: "black",
            selectionColor: "blue",
            todayColor: "blue",
            todaySelectionColor: "white",
            borderRadius: 0
        }, {
                weekdayTextColor: "yellow",
                headerTitleColor: "black",
                eventColor: "black",
                selectionColor: "yellow",
                todayColor: "yellow",
                todaySelectionColor: "white",
                borderRadius: 10
            }, {
                weekdayTextColor: "pink",
                headerTitleColor: "black",
                eventColor: "black",
                selectionColor: "pink",
                todayColor: "pink",
                todaySelectionColor: "white",
                borderRadius: 15
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
            headerTitleColor: "#FFFFFF",
            eventColor: "white",
            selectionColor: "green",
            todayColor: "",
            todaySelectionColor: "pink",
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
        this.settings = {
            displayMode: displayModeValue,
            scrollOrientation: this.settings.scrollOrientation,
            selectionMode: this.settings.selectionMode,
            firstWeekday: this.settings.firstWeekday
        }
        //// this._calendar.reload();
    }

    public changeOrientation() {
        let newOrientation: SCROLL_ORIENTATION;
        let orientationValue;
        orientationValue = this.settings.scrollOrientation === SCROLL_ORIENTATION.HORIZONTAL ? SCROLL_ORIENTATION.VERTICAL : SCROLL_ORIENTATION.HORIZONTAL;
        this.settings = {
            displayMode: this.settings.displayMode,
            scrollOrientation: orientationValue,
            selectionMode: this.settings.selectionMode,
            firstWeekday: this.settings.firstWeekday
        }
        console.log('changeOrientation');
    }

    public changeFirstWeekDay() {
        let newFirstWeekDay = Math.floor(Math.random() * (1 + 7 - 1)) + 1;
        this.settings = {
            displayMode: this.settings.displayMode,
            scrollOrientation: this.settings.scrollOrientation,
            selectionMode: this.settings.selectionMode,
            firstWeekday: newFirstWeekDay
        }
        console.log('changeFirstWeekDay');
    }

    public changeSelectionMode() {
        let newSelectionMode: SELECTION_MODE;
        newSelectionMode = this.settings.selectionMode === SELECTION_MODE.MULTIPLE ? SELECTION_MODE.SINGLE : SELECTION_MODE.MULTIPLE;
        this.settings = {
            displayMode: this.settings.displayMode,
            scrollOrientation: this.settings.scrollOrientation,
            selectionMode: newSelectionMode,
            firstWeekday: this.settings.firstWeekday
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
        //this._calendar.reload();
    }



    public dateSelected(event) {

        console.log('date selected');
    }


    public monthChanged(event) {
        console.log('month selected');
    }
}

