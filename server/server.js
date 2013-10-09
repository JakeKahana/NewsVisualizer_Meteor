
Meteor.startup(function () {
  HTTP.get('http://www.bbc.co.uk', function(err, result){
  
	//create the date
    var monthNames = new Array(
	"january","february","march","april","may","june","july",
	"august","september","october", "november","december");
	var now = new Date();
	displaydate = monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();

	//strip content and put into an array of single words
	console.log('news server responded: ', result ? result.status : 'no it did not');
    var testcontent = stripUnwantedText(result.content);
  	testcontent = testcontent.toLowerCase();
    var wordlist = testcontent.split(" ");

    var processedWords = {};
    Words.remove({});
    for(i = 0; i < wordlist.length; i ++){
    	if(processedWords[wordlist[i]] !== " " || processedWords[wordlist[i]] != ""){
	    	if(processedWords[wordlist[i]]){
	    		processedWords[wordlist[i]].frequency += 1;
	    	}else{
				processedWords[wordlist[i]] = {
		    		word: wordlist[i],
		    		date: displaydate,
		    		frequency: 1,
		    		article: "#"
		    	}
	    	}
	    }
	};

	_.each(processedWords, function(wordMetrics, wordName){
		Words.insert(wordMetrics)
	});		

	var todaysword = Words.find({date: displaydate}, {sort: {frequency: -1}, limit: 10})
	console.log(todaysword.fetch())
});


function stripUnwantedText(html){
    var bodyRegex = /<body[^>]*>((.|[\n\r])*)<\/body>/im
    // var bodyRegex = /<div class="colB column"[^>]*>((.|[\n\r])*)<div id="exploreTray">/im
      , scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
      , noScriptRegex = /<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi
      , styleRegex = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi
      , commentRegex = /<!--(.|\s)*?-->/gi
      , htmlTagRegex = /<.+?>/igm
      , characterEntityRegex = /&.+?;/gim
      , nonAlphaCharacterRegex = /[^A-Za-z ']/gi
      , apostropheRegex = /'/g
      , stopWords = [
        '\\ba',
        'able',
        'about',
        'above',
        'abroad',
        'accessibility',
        'accordingcontent',
        'accordingly',
        'across',
        'actually',
        'ad',
        'adj',
        'advertisement',
        'advertising',
        'after',
        'afterwards',
        'again',
        'against',
        'ago',
        'ahead',
        'aint',
        'all',
        'allow',
        'allows',
        'almost',
        'alone',
        'along',
        'alongside',
        'already',
        'also',
        'although',
        'always',
        'am',
        'amid',
        'amidst',
        'among',
        'amongst',
        'an',
        'and',
        'another',
        'any',
        'anybody',
        'anyhow',
        'anyone',
        'anything',
        'anyway',
        'anyways',
        'anywhere',
        'apart',
        'appear',
        'appreciate',
        'appropriate',
        'are',
        'arent',
        'around',
        'as',
        'as',
        'aside',
        'ask',
        'asking',
        'association',
        'associated',
        'at',
        'available',
        'away',
        'awfully',
        'b',
        'back',
        'backward',
        'backwards',
        'bbc',
        'be',
        'became',
        'because',
        'become',
        'becomes',
        'becoming',
        'been',
        'before',
        'beforehand',
        'begin',
        'behind',
        'being',
        'believe',
        'below',
        'beside',
        'besides',
        'best',
        'better',
        'between',
        'beyond',
        'bn',
        'both',
        'brief',
        'browser',
        'but',
        'by',
        'c',
        'came',
        'can',
        'cannot',
        'cant',
        'cant',
        'caption',
        'cause',
        'causes',
        'certain',
        'certainly',
        'changes',
        'clearly',
        'cmon',
        'co',
        'co.',
        'com',
        'come',
        'comes',
        'concerning',
        'consequently',
        'consider',
        'considering',
        'contain',
        'containing',
        'contains',
        'content',
        'corresponding',
        'could',
        'couldnt',
        'course',
        'cs',
        'css',
        'currently',
        'd',
        'dare',
        'darent',
        'de',
        'definitely',
        'described',
        'despite',
        'did',
        'didnt',
        'different',
        'directly',
        'do',
        'does',
        'doesnt',
        'doing',
        'done',
        'dont',
        'down',
        'downwards',
        'during',
        'e',
        'each',
        'edu',
        'eg',
        'eight',
        'eighty',
        'either',
        'else',
        'elsewhere',
        'end',
        'ending',
        'enough',
        'entirely',
        'especially',
        'est',
        'et',
        'etc',
        'even',
        'ever',
        'evermore',
        'every',
        'everybody',
        'everyone',
        'everything',
        'everywhere',
        'ex',
        'exactly',
        'example',
        'except',
        'f',
        'fairly',
        'far',
        'farther',
        'february',
        'few',
        'fewer',
        'fifth',
        'first',
        'five',
        'followed',
        'following',
        'follows',
        'for',
        'forecast',
        'forever',
        'former',
        'formerly',
        'forth',
        'forward',
        'found',
        'four',
        'fri',
        'friday',
        'from',
        'further',
        'furthermore',
        'g',
        'get',
        'gets',
        'getting',
        'given',
        'gives',
        'go',
        'goes',
        'going',
        'gone',
        'got',
        'gotten',
        'greetings',
        'h',
        'had',
        'hadnt',
        'half',
        'happens',
        'hardly',
        'has',
        'hasnt',
        'have',
        'havent',
        'having',
        'he',
        'hed',
        'hell',
        'hello',
        'help',
        'hence',
        'her',
        'here',
        'hereafter',
        'hereby',
        'herein',
        'heres',
        'hereupon',
        'hers',
        'herself',
        'hes',
        'hi',
        'him',
        'himself',
        'his',
        'hither',
        'hopefully',
        'how',
        'howbeit',
        'however',
        'hundred',
        'i',
        'id',
        'ie',
        'if',
        'ignored',
        'ill',
        'im',
        'img',
        'immediate',
        'in',
        'inasmuch',
        'inc',
        'inc.',
        'indeed',
        'indicate',
        'indicated',
        'indicates',
        'inner',
        'inside',
        'insofar',
        'instead',
        'into',
        'inward',
        'is',
        'isnt',
        'it',
        'itd',
        'itll',
        'its',
        'its',
        'itself',
        'ive',
        'j',
        'just',
        'k',
        'keep',
        'keeps',
        'kept',
        'know',
        'known',
        'knows',
        'l',
        'last',
        'lately',
        'later',
        'latter',
        'latterly',
         'le',
        'least',
        'less',
        'lest',
        'let',
        'lets',
        'like',
        'liked',
        'likely',
        'likewise',
        'little',
        'lo',
        'look',
        'looking',
        'looks',
        'low',
        'lower',
        'ltd',
        'm',
        'made',
        'mainly',
        'make',
        'makes',
        'many',
        'max',
        'may',
        'maybe',
        'maynt',
        'me',
        'mean',
        'meantime',
        'meanwhile',
        'merely',
        'might',
        'mightnt',
        'min',
        'mine',
        'minus',
        'miss',
        'mon',
        'monday',
        'more',
        'moreover',
        'most',
        'mostly',
        'mr',
        'mrs',
        'much',
        'must',
        'mustnt',
        'my',
        'myself',
        'n',
        'name',
        'namely',
        'nd',
        'near',
        'nearly',
        'necessary',
        'need',
        'neednt',
        'needs',
        'neither',
        'never',
        'neverf',
        'neverless',
        'nevertheless',
        'new',
        'news',
        'next',
        'nine',
        'ninety',
        'no',
        'nobody',
        'non',
        'none',
        'nonetheless',
        'noone',
        'no-one',
        'nor',
        'normally',
        'not',
        'nothing',
        'notwithstanding',
        'novel',
        'now',
        'nowhere',
        'nytimes',
        'nyt',
        'o',
        'obviously',
        'of',
        'off',
        'often',
        'oh',
        'ok',
        'okay',
        'old',
        'on',
        'once',
        'one',
        'ones',
        'ones',
        'only',
        'onto',
        'op',
        'op-ed',
        'opinion',
        'opposite',
        'or',
        'other',
        'others',
        'otherwise',
        'ought',
        'oughtnt',
        'our',
        'ours',
        'ourselves',
        'out',
        'outside',
        'over',
        'overall',
        'own',
        'p',
        'particular',
        'particularly',
        'past',
        'per',
        'perhaps',
        'placed',
        'please',
        'plus',
        'pm',
        'possible',
        'post',
        'presumably',
        'probably',
        'provided',
        'provides',               
        'pst',
        'q',
        'que',
        'quite',
        'qv',
        'r',
        'rather',
        'rd',
        're',
        'really',
        'reasonably',
        'recent',
        'recently',
        'regarding',
        'regardless',
        'regards',
        'relatively',
        'respectively',
        'review',
        'reviews',
        'right',
        'round',
        's',
        'said',
        'same',
        'sat',
        'saturday',
        'saw',
        'say',
        'saying',
        'says',
        'se',
        'second',
        'secondly',
        'see',
        'seeing',
        'seem',
        'seemed',
        'seeming',
        'seems',
        'seen',
        'self',
        'selves',
        'sensible',
        'sent',
        'serious',
        'seriously',
        'seven',
        'several',
        'shall',
        'shant',
        'she',
        'shed',
        'shell',
        'shes',
        'should',
        'shouldnt',
        'since',
        'six',
        'so',
        'some',
        'somebody',
        'someday',
        'somehow',
        'someone',
        'something',
        'sometime',
        'sometimes',
        'somewhat',
        'somewhere',
        'soon',
        'sorry',
        'specified',
        'specify',
        'specifying',
        'src',
        'still',
        'story',
        'stories',
        'sub',
        'such',
        'sun',
        'sunday',
        'sup',
        'sure',
        't',
        'take',
        'taken',
        'taking',
        'tell',
        'temp',
        'temperature',
        'tends',
        'th',
        'than',
        'thank',
        'thanks',
        'thanx',
        'that',
        'thatll',
        'thats',
        'thats',
        'thatve',
        'the',
        'their',
        'theirs',
        'them',
        'themselves',
        'then',
        'thence',
        'there',
        'thereafter',
        'thereby',
        'thered',
        'therefore',
        'therein',
        'therell',
        'therere',
        'theres',
        'theres',
        'thereupon',
        'thereve',
        'these',
        'they',
        'theyd',
        'theyll',
        'theyre',
        'theyve',
        'thing',
        'things',
        'think',
        'third',
        'thirty',
        'this',
        'thorough',
        'thoroughly',
        'those',
        'though',
        'three',
        'through',
        'throughout',
        'thru',
        'thu',
        'thur',
        'thursday',
        'thus',
        'till',
        'times',
        'to',
        'together',
        'top',
        'too',
        'took',
        'toward',
        'towards',
        'tried',
        'tries',
        'truly',
        'try',
        'trying',
        'ts',
        'tue',
        'tues',
        'twice',
        'two',
        'u',
        'un',
        'under',
        'underneath',
        'undoing',
        'unfortunately',
        'unless',
        'unlike',
        'unlikely',
        'until',
        'unto',
        'up',
        'upon',
        'upwards',
        'us',
        'use',
        'used',
        'useful',
        'uses',
        'using',
        'usually',
        'v',
        'value',
        'various',
        'versus',
        'very',
        'via',
        'viz',
        'vs',
        'w',
        'want',
        'wants',
        'was',
        'wasnt',
        'way',
        'we',
        'wed',
        'wednesday',
        'welcome',
        'well',
        'well',
        'went',
        'were',
        'were',
        'werent',
        'weve',
        'what',
        'whatever',
        'whatll',
        'whats',
        'whatve',
        'when',
        'whence',
        'whenever',
        'where',
        'whereafter',
        'whereas',
        'whereby',
        'wherein',
        'wheres',
        'whereupon',
        'wherever',
        'whether',
        'which',
        'whichever',
        'while',
        'whilst',
        'whither',
        'who',
        'whod',
        'whoever',
        'whole',
        'wholl',
        'whom',
        'whomever',
        'whos',
        'whose',
        'why',
        'will',
        'willing',
        'wish',
        'with',
        'within',
        'without',
        'wonder',
        'wont',
        'world',
        'would',
        'wouldnt',
        'x',
        'y',
        'yes',
        'yet',
        'you',
        'youd',
        'youll',
        'your',
        'youre',
        'yours',
        'yourself',
        'yourselves',
        'youve',
        'z',
        'zero\\b'
      ].join('\\b|\\b')
      , stopWordsRegex = new RegExp(stopWords, "gi")
      , extraSpaceRegex = /\s+/g;

    var content = bodyRegex.exec(html)[1];
    content = content.replace(scriptRegex, ' ') // strip everything in-between <script></script>
                     .replace(noScriptRegex, ' ') // strip everything in-between <noscript></noscript>
                     .replace(styleRegex, ' ') // strip everything in-between <style></style>
                     .replace(commentRegex, ' ') // strip everything in-between <!-- -->
                     .replace(htmlTagRegex, ' ') // strip everything in-between <...>
                     .replace(characterEntityRegex, ' ') // string everything in-between &...;
                     .replace(apostropheRegex, '') // remove apostrophes from words
                     .replace(nonAlphaCharacterRegex, ' ') // remove any non-alphabet characters
                     .replace(stopWordsRegex, ' ') // remove stop words
                     .replace(extraSpaceRegex, ' '); // collapse extra spaces

    return content;
		// Porter stemmer in Javascript. Few comments, but it's easy to follow against the rules in the original
	// paper, in
	//
	//  Porter, 1980, An algorithm for suffix stripping, Program, Vol. 14,
	//  no. 3, pp 130-137,
	//
	// see also http://www.tartarus.org/~martin/PorterStemmer

	// Release 1 be 'andargor', Jul 2004
	// Release 2 (substantially revised) by Christopher McKenzie, Aug 2009

	var stemmer = (function(){
		var step2list = {
				"ational" : "ate",
				"tional" : "tion",
				"enci" : "ence",
				"anci" : "ance",
				"izer" : "ize",
				"bli" : "ble",
				"alli" : "al",
				"entli" : "ent",
				"eli" : "e",
				"ousli" : "ous",
				"ization" : "ize",
				"ation" : "ate",
				"ator" : "ate",
				"alism" : "al",
				"iveness" : "ive",
				"fulness" : "ful",
				"ousness" : "ous",
				"aliti" : "al",
				"iviti" : "ive",
				"biliti" : "ble",
				"logi" : "log"
			},

			step3list = {
				"icate" : "ic",
				"ative" : "",
				"alize" : "al",
				"iciti" : "ic",
				"ical" : "ic",
				"ful" : "",
				"ness" : ""
			},

			c = "[^aeiou]",          // consonant
			v = "[aeiouy]",          // vowel
			C = c + "[^aeiouy]*",    // consonant sequence
			V = v + "[aeiou]*",      // vowel sequence

			mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
			meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
			mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
			s_v = "^(" + C + ")?" + v;                   // vowel in stem

		return function (w) {
			var 	stem,
				suffix,
				firstch,
				re,
				re2,
				re3,
				re4,
				origword = w;

			if (w.length < 3) { return w; }

			firstch = w.substr(0,1);
			if (firstch == "y") {
				w = firstch.toUpperCase() + w.substr(1);
			}

			// Step 1a
			re = /^(.+?)(ss|i)es$/;
			re2 = /^(.+?)([^s])s$/;

			if (re.test(w)) { w = w.replace(re,"$1$2"); }
			else if (re2.test(w)) {	w = w.replace(re2,"$1$2"); }

			// Step 1b
			re = /^(.+?)eed$/;
			re2 = /^(.+?)(ed|ing)$/;
			if (re.test(w)) {
				var fp = re.exec(w);
				re = new RegExp(mgr0);
				if (re.test(fp[1])) {
					re = /.$/;
					w = w.replace(re,"");
				}
			} else if (re2.test(w)) {
				var fp = re2.exec(w);
				stem = fp[1];
				re2 = new RegExp(s_v);
				if (re2.test(stem)) {
					w = stem;
					re2 = /(at|bl|iz)$/;
					re3 = new RegExp("([^aeiouylsz])\\1$");
					re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
					if (re2.test(w)) {	w = w + "e"; }
					else if (re3.test(w)) { re = /.$/; w = w.replace(re,""); }
					else if (re4.test(w)) { w = w + "e"; }
				}
			}

			// Step 1c
			re = /^(.+?)y$/;
			if (re.test(w)) {
				var fp = re.exec(w);
				stem = fp[1];
				re = new RegExp(s_v);
				if (re.test(stem)) { w = stem + "i"; }
			}

			// Step 2
			re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
			if (re.test(w)) {
				var fp = re.exec(w);
				stem = fp[1];
				suffix = fp[2];
				re = new RegExp(mgr0);
				if (re.test(stem)) {
					w = stem + step2list[suffix];
				}
			}

			// Step 3
			re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
			if (re.test(w)) {
				var fp = re.exec(w);
				stem = fp[1];
				suffix = fp[2];
				re = new RegExp(mgr0);
				if (re.test(stem)) {
					w = stem + step3list[suffix];
				}
			}

			// Step 4
			re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
			re2 = /^(.+?)(s|t)(ion)$/;
			if (re.test(w)) {
				var fp = re.exec(w);
				stem = fp[1];
				re = new RegExp(mgr1);
				if (re.test(stem)) {
					w = stem;
				}
			} else if (re2.test(w)) {
				var fp = re2.exec(w);
				stem = fp[1] + fp[2];
				re2 = new RegExp(mgr1);
				if (re2.test(stem)) {
					w = stem;
				}
			}

			// Step 5
			re = /^(.+?)e$/;
			if (re.test(w)) {
				var fp = re.exec(w);
				stem = fp[1];
				re = new RegExp(mgr1);
				re2 = new RegExp(meq1);
				re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
				if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
					w = stem;
				}
			}

			re = /ll$/;
			re2 = new RegExp(mgr1);
			if (re.test(w) && re2.test(w)) {
				re = /.$/;
				w = w.replace(re,"");
			}

			// and turn initial Y back to y

			if (firstch == "y") {
				w = firstch.toLowerCase() + w.substr(1);
			}

			return w;
		}
	})();
	stemmer(content);
	};
});

