var submit_button = document.getElementById("submit-button");
submit_button.addEventListener('click', cutr);

var advop = document.getElementById("sf-advanced-op");
advop.addEventListener('click', show_op);

function copy() {
  var text = document.getElementById("output");
  text.select();
  document.execCommand("copy");
}

function show_op() {
  var custom_alias = document.getElementById("custom-alias");
  if (custom_alias.style.display === "none") {
    custom_alias.style.display = "block";
  } else {
    custom_alias.style.display = "none";
  }
}

function cutr() {
  var text_field = document.getElementById("text-field");
  var custom_alias = document.getElementById("custom-alias");
  var submit_button = document.getElementById("submit-button");
  var fieldset = document.getElementById("field");
  var advop = document.getElementById("sf-advanced-op");

  var url = text_field.value;
  var alias = custom_alias.value;

  if (url == "") {
    return false;
  }
 
  var payload = {"url":url,"alias":alias}

  var output = document.createElement("input");
  output.setAttribute('readonly', true)
  output.setAttribute('id', "output")


  $.ajax({
    type: "POST",
    url: "/api/short" ,
    data: payload,
    dataType: 'json',
    success: function(data) {

      output_text = data['short']
      output.setAttribute('value', output_text)

    },
    error: function(jqXHR, error, errorThrown) {

      json = JSON.parse(jqXHR.responseText);
      output_text = json['err']
      output.setAttribute('value', output_text)

    }
  });


  var copy_button = document.createElement("input");
  copy_button.setAttribute('type', 'button')
  copy_button.setAttribute('class', 'next action-button')
  copy_button.setAttribute('value', 'Copy')
  copy_button.setAttribute('onClick', "copy()")


  if (text_field.style.display === "none") {
    text_field.style.display = "block";
  } else {
    text_field.style.display = "none";
  }

  if (custom_alias.style.display === "none") {
    custom_alias.style.display = "block";
  } else {
    custom_alias.style.display = "none";
  }

  if (advop.style.display === "none") {
    advop.style.display = "block";
  } else {
    advop.style.display = "none";
  }
  if (submit_button.style.display === "none") {
    submit_button.style.display = "block";
  } else {
    submit_button.style.display = "none";
  }


  fieldset.appendChild(output);
  fieldset.appendChild(copy_button);

}

