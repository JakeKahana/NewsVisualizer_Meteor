Meteor.subscribe("fromtoday", function(){
  // this subscription is ready
  $("#today").show().addClass('current-page');
});

Meteor.subscribe("mostused");

//getting today's date
var monthNames = new Array(
"january","february","march","april","may","june","july",
"august","september","october", "november","december");
var now = new Date();
displaydate = monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();

// Meteor.startup(function(){
//   $("#today").show().addClass('current-page');
// });

Template.header.events({
  'click #getaboutpage': function(){
    $('.current-page').fadeOut(300, function(){
      $("#about").fadeIn(300).addClass('current-page');
    }).removeClass('current-page');
  }
});
Template.header.events({
  'click #backtotoday': function(){
    $('.current-page').fadeOut(300, function(){
      $("#today").fadeIn(300).addClass('current-page');
    }).removeClass('current-page');
  }
});


Template.buttons.events({
  'click #trendbtn': function(){
    $('.current-page').fadeOut(300, function(){
      $("#trends").fadeIn(300).addClass('current-page');
    }).removeClass('current-page');
  }
});

function changeDates(){
    $('.current-page').fadeOut(300, function(){
      $("#newdate").fadeIn(300).addClass('current-page');
    }).removeClass('current-page');
  anewdate = $( "#dates" ).val().toLowerCase();
  Session.set("anewdate", anewdate);
  Meteor.subscribe("fromanotherdate", anewdate);
}

Template.buttons.events({
  'change #dates': function(){
    changeDates();
  }
});

Template.buttons.rendered = function(){
  $("#dates").datepicker({
    format: "MM d, yyyy",
    autoclose: true,
    startDate: new Date(2013, 9, 11),
    endDate: now
  }).on('changeDate', function(e){
    changeDates();
  })
  $("#dates").val(displaydate);

};


Template.buttons.events({
  'keyup #somenewword': function(e){
    if(e.keyCode == 13){
        $('.current-page').fadeOut(300, function(){
        $("#newword").fadeIn(300).addClass('current-page');
      }).removeClass('current-page');
    var selectedword = $( "#somenewword" ).val().toLowerCase()
    Session.set("anewword", selectedword);
    Meteor.subscribe("wordsubset", selectedword);
    }
  }
});

Template.today.wordofday = function(){
  var todaysdate = Words.findOne({date: displaydate}, {sort: {frequency: -1}, limit: 1})
  return todaysdate;
}

Template.newdate.searcheddate = function(){
  var anewdate = Session.get("anewdate");
  var wordInfo = Words.findOne({date: anewdate}, {sort: {frequency: -1}, limit: 1});
  return wordInfo;
}


Template.newword.searchedword = function(){
  var anewword = Session.get("anewword");
  var wordInfo = Words.findOne({word: anewword});
  if(wordInfo){
    wordInfo.uses = 0;
    var totalused = Words.find({word: anewword});
      totalused.forEach(function(word){
      wordInfo.uses += word.frequency;
    });
  }
  return wordInfo;
}
Template.newword.todaysword = function(){
  var anewword = Session.get("anewword");
  var wordInfo = Words.findOne({word: anewword, date: displaydate});
  return wordInfo;
}

Template.newdate.events({
  'click #tomorrow': function(){
  var monthNames = new Array(
    "january","february","march","april","may","june","july",
    "august","september","october", "november","december");
  var selecteddate = document.getElementById("dates").value.toLowerCase();
  var losecomma = /[,]\s/g;
  selecteddate = selecteddate.replace(losecomma, ' ');
  var updateddate = new Date(selecteddate);    
  updateddate.setDate(updateddate.getDate() +1);
  updateddate = monthNames[updateddate.getMonth()] + " " + updateddate.getDate() + ", " + updateddate.getFullYear();
  document.getElementById("dates").value = updateddate;
  Session.set("anewdate", updateddate);
  changeDates();
  }
});

Template.newdate.events({
  'click #yesterday': function(){
  var monthNames = new Array(
    "january","february","march","april","may","june","july",
    "august","september","october", "november","december");
  var selecteddate = document.getElementById("dates").value.toLowerCase();
  var losecomma = /[,]\s/g;
  selecteddate = selecteddate.replace(losecomma, ' ');
  var updateddate = new Date(selecteddate);    
  updateddate.setDate(updateddate.getDate() -1);
  updateddate = monthNames[updateddate.getMonth()] + " " + updateddate.getDate() + ", " + updateddate.getFullYear();
    $("#dates").val(updateddate);
  Session.set("anewdate", $( "#dates" ).val().toLowerCase())
  changeDates();
}
});

Template.trends.listofwords = function(){
    return MostUsed.find({}, {sort: {totalfrequency: -1}, limit: 1});
}




