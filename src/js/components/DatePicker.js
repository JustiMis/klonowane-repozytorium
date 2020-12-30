import { BaseWidget } from './BaseWidget.js';
import { select, settings } from '../settings.js';
import { utils } from '../utils.js';


export class DatePicker extends BaseWidget{
  constructor(wrapper){
    super(wrapper, utils.dateToStr(new Date()));
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);

    thisWidget.initPlugin();

  }

  initPlugin(){
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = utils.addDays(thisWidget.value, settings.datePicker.maxDaysInFuture);

    flatpickr(thisWidget.dom.input, {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      disable: [
        function(date) {
          return (date.getDay() === 1);
        }
      ],
      locale: {
        firstDayOfWeek: 1
      },
      onChange: function(selectedDates, dateStr) {
        thisWidget.value = dateStr;
      },

    });
  }

  parseValue(value){
    return value;
  }

  isValid(){
    return true;
  }

  renderValue(){
    const thisWidget = this;

    console.log('widget value:', thisWidget.value);
  }
}
