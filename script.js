//displaying the date and hour in the header
var today = moment();
$("#currentDay").text(today.format("MMM Do, YYYY, h:mm a"));
//parseInt changes a string to a number. know the current time 
var currentHour = parseInt(moment().format("H"));
console.log(currentHour);

//hours is for the comparision in the if statments and labels is for what is shown on the screen.
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const labels = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]


function createRow(hour, label) {
    console.log(hour)
    //create HTML elments
    var rowDiv = $("<div>");
    var article = $("<article>");
    var textArea = $("<textarea>");
    var button = $("<button>");
    //adding classes to the created HTML elements
    rowDiv.addClass("row hour");
    article.addClass("hourdisplay col-md-1");
    article.text(label);
    //showing the time blocks in relation to the current time
    if (currentHour < hour) {
        textArea.addClass("col-md-10 description future");

    } else if (currentHour == hour) {
        textArea.addClass("col-md-10 description present");
    } else {
        textArea.addClass("col-md-10 description past");
    }

    //save button classes
    button.addClass("saveBtn col-md-1");
    button.text("Save");

//Ruxin helped with the data storage 
//making it save on screen 
    const saveToDo=event=>{
        //keeps info on screen even after refresh
        event.preventDefault()
        //
        const toDoTime = $(event.currentTarget).siblings('.hourdisplay').text();
        const toDo = $(event.currentTarget).siblings('.description').val();
        localStorage.setItem(toDoTime,JSON.stringify(toDo))
    }
    $('button').on('click',saveToDo)


    const renderToDo=()=>{
        $('.hourdisplay').each(function() {
            let text = JSON.parse(localStorage.getItem($(this).text()));
            $(this).siblings('.description').val(text);
        })
    }
    renderToDo();

    //putting all the elments in a single time block row
    rowDiv.append(article, textArea, button);
    $("main").append(rowDiv);

}

//activate function by calling the function which loops through the 10 items in the hours array and since labels is the same the labels are switched out from the military time

for (i = 0; i < 10; i++) {
    createRow(hours[i], labels[i]);
}
