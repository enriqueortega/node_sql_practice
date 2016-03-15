$(document).ready(function() {

    $('#submit-button').on('click', postData);
    $('.people').append('<div class="person-list"></div>');


});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            console.log(data);
            appendDom(data);
        }
    });
}

function appendDom(data){
  $('.person-list').empty();

  var $el = $('.person-list');

  for(var i=0; i < data.length; i++){
    $el.append('<p>1. ' + data[i].name + '</p>');
    $el.append('<p>2. ' + data[i].address + '</p>');
    $el.append('<p>3. ' + data[i].city + '</p>');
    $el.append('<p>4. ' + data[i].state + '</p>');
    $el.append('<p>5. ' + data[i].zip + '</p>');
  }
}
