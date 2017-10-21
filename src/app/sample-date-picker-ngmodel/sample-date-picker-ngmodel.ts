import {Component, OnInit, ViewChild} from '@angular/core';
import {IMyOptions, IMyDateModel, IMyInputFieldChanged, IMyCalendarViewChanged} from 'ngx-mydatepicker';
import {NgxMyDatePickerDirective} from 'ngx-mydatepicker';

@Component({
    selector: 'sample-date-picker-ngmodel',
    templateUrl: 'sample-date-picker-ngmodel.html',
    moduleId: module.id,
})

export class SampleDatePickerNgModel implements OnInit {

    myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd mmm yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        markCurrentDay: true,
        alignSelectorRight: false,
        openSelectorTopOfInput: false,
        minYear: 1900,
        maxYear: 2200,
        showSelectorArrow: true,
        disableDates:[],
        highlightDates: [],
        showWeekNumbers: false,
        markDates: [],
        selectorHeight: '232px',
        selectorWidth: '252px',
        allowSelectionOnlyInCurrentMonth: true,
        appendSelectorToBody: false
    };

    @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;

    selectedTextNormal: string = '';
    validDate: boolean = false;
    inputText: string = "";

    model: string = '';   // not initial date set

    defMonth: string = '';

    selectorSizes: Array<string> = new Array('252*232', '220*200', '290*260');

    constructor() {}

    clearDate(): void {
        this.ngxdp.clearDate();
    }

    onSelectorSize(size:string) {
        let copy = this.getCopyOfOptions();
        if (size === '252*232') {
            copy.selectorHeight = '232px';
            copy.selectorWidth = '252px';
            this.myDatePickerOptions = copy;
        }
        else if (size === '220*200') {
            copy.selectorHeight = '200px';
            copy.selectorWidth = '220px';
            this.myDatePickerOptions = copy;
        }
        else {
            copy.selectorHeight = '260px';
            copy.selectorWidth = '290px';
            this.myDatePickerOptions = copy;
        }
    }

    onShowTodayButton(checked: boolean): void {
        let copy = this.getCopyOfOptions();
        copy.showTodayBtn = checked;
        this.myDatePickerOptions = copy;
    }

    onOpenSelectorTopOfInput(checked: boolean): void {
        let copy = this.getCopyOfOptions();
        copy.openSelectorTopOfInput = checked;
        this.myDatePickerOptions = copy;
    }

    onAlignSelectorRight(checked: boolean): void {
        let copy = this.getCopyOfOptions();
        copy.alignSelectorRight = checked;
        this.myDatePickerOptions = copy;
    }

    onShowSelectorArrow(checked: boolean): void {
        let copy = this.getCopyOfOptions();
        copy.showSelectorArrow = checked;
        this.myDatePickerOptions = copy;
    }

    onDisableToday(checked: boolean): void {
        let d: Date = new Date();
        let copy = this.getCopyOfOptions();
        copy.disableDates = checked ? [{year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}] : [];
        this.myDatePickerOptions = copy;
    }

    onMarkToday(checked: boolean): void {
        let d: Date = new Date();
        let copy = this.getCopyOfOptions();
        copy.markDates = checked ? [{dates: [{year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}], color: 'green'}] : [];
        this.myDatePickerOptions = copy;
    }

    onHighlightToday(checked: boolean): void {
        let d: Date = new Date();
        let copy = this.getCopyOfOptions();
        copy.highlightDates = checked ? [{year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}] : [];
        this.myDatePickerOptions = copy;
    }

    onShowWeekNumbers(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.showWeekNumbers = checked;
        this.myDatePickerOptions = copy;
    }

    onAllowSelectionOnlyCurrentMonth(checked: boolean): void {
        let copy = this.getCopyOfOptions();
        copy.allowSelectionOnlyInCurrentMonth = checked;
        this.myDatePickerOptions = copy;
    }

    onAppendSelectorToBody(checked: boolean): void {
      let copy = this.getCopyOfOptions();
      copy.appendSelectorToBody = checked;
      this.myDatePickerOptions = copy;
    }

    getCopyOfOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.myDatePickerOptions));
    }

    ngOnInit(): void {
        console.log('onInit(): SampleDatePickerNgModel');
    }

    // callbacks
    onDateChanged(event: IMyDateModel): void {
        console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if(event.formatted !== '') {
            this.selectedTextNormal = 'Formatted: ' + event.formatted + ' - epoc timestamp: ' + event.epoc;
            this.validDate = true;
            this.inputText = event.formatted;
        }
        else {
            this.selectedTextNormal = '';
        }
    }

    onInputFieldChanged(event: IMyInputFieldChanged): void {
        console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
        this.validDate = event.valid;
        this.inputText = event.value;
    }

    onCalendarToggle(event: number): void {
        console.log('onCalendarToggle(): Reason: ', event);
    }

    onCalendarViewChanged(event: IMyCalendarViewChanged): void {
        console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
    }

}
