$(document).ready(function() {
        $('.tweet').click(function(e){
          //We tell our browser not to follow that link
          e.preventDefault();
         
          //Get the URL
          var loc = escape($(this).attr('href'));
         
          //Get the title of the link
          var title  = escape($(this).attr('title'));
         
          //We trigger a new window with the Twitter dialog, in the middle of the page
          window.open('http://twitter.com/share?url=' + '&text=' + title + loc + ' @onattyso' + ' @jakekahana', '&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        });
      });