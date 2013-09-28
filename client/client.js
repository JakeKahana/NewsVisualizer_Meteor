var currenttemplate = "today";

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

Template.buttons.events({
'click #dates': function(){
    if(currenttemplate == "today"){
        $("#today").fadeOut(300, function(){
        $("#newdate").fadeIn(300);
        })
    }else if(currenttemplate == "newdate"){
        $("#newdate").fadeOut(300, function(){
        $("#newdate").fadeIn(300);
        })
    }else if(currenttemplate == "trends"){
        $("#trends").fadeOut(300, function(){
        $("#newdate").fadeIn(300);
        })
    }else if(currenttemplate == "newword"){
        $("#newword").fadeOut(300, function(){
        $("#newdate").fadeIn(300);
        })
    }else {
        null;
    }
    currenttemplate = "newdate";
  }
});


  

Template.today.events({
    'click .jumptodate' : function(){
 
    },
    'click .jumptoword': function(){

    },
    'click #trend': function(){

    }
  });
  Template.newdate.events({
    'click .jumptodate' : function(){
   
    },
    'click .jumptoword': function(){

    },
    'click #trend': function(){
     
    }
  });
  Template.trends.events({
    'click .jumptodate' : function(){
   
    },
    'click .jumptoword': function(){
  
    },
    'click #trend': function(){
      
      }
  
  });


  Template.today.wordofday = function(){
    var todaysdate = Words.findOne({date: "june 19, 2013"});
    if(todaysdate){
    var todaysword = todaysdate.word;
    return todaysword;
    }
  }
  Template.today.thedate = function(){
  var todaysdate = Words.findOne({date: "june 19, 2013"});
    if(todaysdate){
    return todaysdate.date;
    }
  }
  Template.today.references = function(){
  var todaysdate = Words.findOne({date: "june 19, 2013"});
    if(todaysdate){
    return todaysdate.freqtoday + " mentions today";
    }
  }
  Template.today.links = function(){
    var todaysdate = Words.findOne({date: "june 19, 2013"});
    if(todaysdate){
    var todayswordlink = todaysdate.article;
    return todayswordlink;
    }  
  }


  Template.newdate.word = function(){
   var todaysdate = Words.findOne({date: "january 1, 2000"});
    if(todaysdate){
    var todaysword = todaysdate.word;
    return todaysword;
    } 
  }
  
  Template.newdate.thedate = function(){
    return "february 27, 2007";
  }
  Template.newdate.references = function(){
    var todaysdate = Words.findOne({date: "january 1, 2000"});
    if(todaysdate){
       return todaysdate.freqtoday + " references today";
    }

    return "26 mentions";
  }
  Template.newdate.links = function(){
    return "recent article";
  }


  Template.trends.listofwords = function(){
    return "crisis";
  }
  Template.trends.thedate = function(){
    return "top words and frequency since 2003";
  }


