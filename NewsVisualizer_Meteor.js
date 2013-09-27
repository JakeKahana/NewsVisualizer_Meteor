if (Meteor.isClient) {

  Template.today.events({
    'click #jumptodate' : function(){
      $("#today").fadeOut(500, function(){
        $("#newdate").fadeIn(500);
      })
    },
    'click #jumptoword': function(){

    },
    'click #trend': function(){
      $("#today").fadeOut(500, function(){
        $("#trends").fadeIn(500);
      })
    }
  });
  Template.newdate.events({
    'click #jumptodate' : function(){
      $("#newdate").fadeOut(500, function(){
        $("#newdate").fadeIn(500);
      })
    },
    'click #jumptoword': function(){

    },
    'click #trend': function(){
      $("#newdate").fadeOut(500, function(){
        $("#trends").fadeIn(500);
      })
    }
  });
  Template.trends.events({
    'click #jumptodate' : function(){
      $("#trends").fadeOut(500, function(){
        $("#newdate").fadeIn(500);
      })
    },
    'click #jumptoword': function(){
  
    },
    'click #trend': function(){
      
      }
  });
  Template.today.wordofday = function(){
    return "lorem";
  }
  Template.today.thedate = function(){
    return "june 19, 2013";
  }
  Template.today.references = function(){
    return "26 mentions";
  }
  Template.today.links = function(){
    return "recent article";
  }
  Template.newdate.word = function(){
    return "lorem";
  }
  Template.newdate.thedate = function(){
    return "february 27, 2007";
  }
  Template.newdate.references = function(){
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
