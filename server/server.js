Meteor.startup(function(){
var word1 = {
	word: "Coffee",
	date: "june 19, 2013",
	otherdates: ["june 12, 2013", "may 22, 2013", "may 21, 2013"],
	freqtoday: 23,
	freqtotal: 130,
	article: "http://www.linktoarticle.com"
	};
var word2 = {
	word: "Guitar",
	date: "january 1, 2000",
	otherdates: ["february 3, 2003", "may 10, 2008", "august 30, 2009"],
	freqtoday: 3,
	freqtotal: 29,
	article: "http://www.linktoarticle.com"
	};

Words.remove({});
Words.insert(word1);
Words.insert(word2);

});