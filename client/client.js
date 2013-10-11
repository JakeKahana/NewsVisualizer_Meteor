Meteor.subscribe("fromtoday");


var currenttemplate = "today";
//getting today's date
var monthNames = new Array(
"january","february","march","april","may","june","july",
"august","september","october", "november","december");
var now = new Date();
displaydate = monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();

var backtotoday = function(){
    if(currenttemplate == "today"){
        $("#today").fadeOut(300, function(){
        $("#today").fadeIn(300);
        })
    }else if(currenttemplate == "newdate"){
        $("#newdate").fadeOut(300, function(){
        $("#today").fadeIn(300);
        })
    }else if(currenttemplate == "trends"){
        $("#trends").fadeOut(300, function(){
        $("#today").fadeIn(300);
        })
    }else if(currenttemplate == "newword"){
        $("#newword").fadeOut(300, function(){
        $("#today").fadeIn(300);
        })
    }else {
        null;
    }
  currenttemplate = "today";
}


Template.buttons.events({
  'click #trendbtn': function(){
      if(currenttemplate == "today"){
          $("#today").fadeOut(300, function(){
          $("#trends").fadeIn(300);
          })
      }else if(currenttemplate == "newdate"){
          $("#newdate").fadeOut(300, function(){
          $("#trends").fadeIn(300);
          })
      }else if(currenttemplate == "trends"){
          $("#trends").fadeOut(300, function(){
          $("#trends").fadeIn(300);
          })
      }else if(currenttemplate == "newword"){
          $("#newword").fadeOut(300, function(){
          $("#trends").fadeIn(300);
          })
      }else {
          null;
      }
    currenttemplate = "trends";
  }
});

function changeDates(){
    if(currenttemplate == "today"){
      $("#today").fadeOut(300, function(){
        $("#newdate").fadeIn(300);
      });
    }else if(currenttemplate == "newdate"){
      $("#newdate").fadeOut(300, function(){
        $("#newdate").fadeIn(300);
      });
    }else if(currenttemplate == "trends"){
      $("#trends").fadeOut(300, function(){
        $("#newdate").fadeIn(300);
      });
    }else if(currenttemplate == "newword"){
      $("#newword").fadeOut(300, function(){
        $("#newdate").fadeIn(300);
      });
    }
  currenttemplate = "newdate";
  Session.set("anewdate", $( "#dates" ).val().toLowerCase());
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
    startDate: new Date(2013, 9, 11)
  }).on('changeDate', function(e){
    changeDates();
  })
  $("#dates").val(displaydate);

};


Template.buttons.events({
  'change #somenewword': function(){
    if(currenttemplate == "today"){
        $("#today").fadeOut(300, function(){
        $("#newword").fadeIn(300);
        })
    }else if(currenttemplate == "newdate"){
        $("#newdate").fadeOut(300, function(){
        $("#newword").fadeIn(300);
        })
    }else if(currenttemplate == "trends"){
        $("#trends").fadeOut(300, function(){
        $("#newword").fadeIn(300);
        })
    }else if(currenttemplate == "newword"){
        $("#newword").fadeOut(300, function(){
        $("#newword").fadeIn(300);
        })
    }else {
        null;
    }
    currenttemplate = "newword";
    var selectedword = $( "#somenewword" ).val().toLowerCase()
    Session.set("anewword", selectedword);
    Meteor.subscribe("wordsubset", selectedword);
  }
});

Template.today.wordofday = function(){
  var todaysdate = Words.findOne({date: displaydate}, {sort: {frequency: -1}, limit: 1})
  return todaysdate;
}

Template.newdate.searcheddate = function(){
  var anewdate = Session.get("anewdate");
  var wordInfo = Words.findOne({date: anewdate}, {sort: {frequency: -1}, limit: 5});
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


Template.trends.listofwords = function(){
    return Words.find({}, {sort: {frequency: -1}, limit: 25});
}

Template.trends.trendfreq = function(){
    return "frequency";
}
Template.trends.thedate = function(){
    return "top words in the news";
}
