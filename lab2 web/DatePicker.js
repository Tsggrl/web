"use strick";

class DatePicker {
  constructor(id, callback) {
    this.id = id;
    this.callback = callback;
  }

  render(date) {
    var parent = document.getElementById(this.id);
    parent.appendChild(this._createCalender(date));
  }

  _createCalender(date) {
    var table = document.createElement("table");
    table.style.border = "dotted black";

    var header = this._createCalenderHeader(table, date);

    var daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    var rowWeek = header.insertRow(1);
    for (var i = 0; i < 7; ++i) {
      var cell = rowWeek.insertCell(i);
      cell.innerHTML = daysOfWeek[i];
    }

    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var curDate = new Date(firstDay.getTime());
    curDate.setDate(-firstDay.getDay() + 1);
    //console.log(curDate);
    //console.log(curDate.getDate());
    var rowIndex = 2;
    while (true) {
      var row = table.insertRow(rowIndex);
      rowIndex = rowIndex + 1;
      for (i = 0; i < 7; ++i) {
        var cel = row.insertCell(i);
        cel.innerHTML = curDate.getDate();

        if (curDate.getMonth() === date.getMonth()) {
          cel.setAttribute("id", "CurMonth");
          let ob = {
            month: curDate.getMonth() + 1,
            day: cel.innerHTML,
            year: curDate.getFullYear()
          };
          cel.addEventListener("click", () => {
            this.callback(this.id, ob);
          });
        } else {
          cel.setAttribute("id", "OtherMonth");
        }

        curDate.setDate(curDate.getDate() + 1);
      }

      if (curDate.getMonth() !== date.getMonth()) {
        break;
      }
    }
    return table;
  }

  _createCalenderHeader(table, date) {
    var header = table.createTHead();
    var headerRow = header.insertRow(0);
    var leftArrowCell = headerRow.insertCell(0);
    leftArrowCell.innerHTML = "<";
    leftArrowCell.setAttribute("id", "LeftArrow");

    var monthCell = headerRow.insertCell(1);
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    monthCell.innerHTML = months[date.getMonth()] + "   " + date.getFullYear();
    monthCell.colSpan = 5;

    var rightArrowCell = headerRow.insertCell(2);
    rightArrowCell.innerHTML = ">";
    rightArrowCell.setAttribute("id", "RightArrow");

    // event handler.
    leftArrowCell.addEventListener("click", () => {
      table.remove();
      date.setMonth(date.getMonth() - 1);
      console.log(date);
      this.render(date);
    });

    rightArrowCell.addEventListener("click", () => {
      table.remove();
      date.setMonth(date.getMonth() + 1);
      //console.log(date);
      this.render(date);
    });

    return header;
  }
}
