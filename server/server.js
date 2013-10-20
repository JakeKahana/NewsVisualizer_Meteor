Meteor.startup(function () {
    function checkTime() {
        var now = new Date();
        console.log('checking time to run?', now);
        // if (now.getHours() == 5 || now.getHours() == 17) {
        //     console.log('yup');
        //     processNews();
        // }else{
        //     console.log('nope');
        // 
        processNews();
    }
    checkTime();
    Meteor.setInterval(checkTime, 3600000);
});

function processNews() {

    var monthNames = new Array(
        "january", "february", "march", "april", "may", "june", "july",
        "august", "september", "october", "november", "december");
    var now = new Date();
    displaydate = monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();


    //get data from BBC
    HTTP.get('http://www.bbc.co.uk', function (err, result) {
        //create the date
        var monthNames = new Array(
            "january", "february", "march", "april", "may", "june", "july",
            "august", "september", "october", "november", "december");
        var now = new Date();
        displaydate = monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();

        //strip content and put into an array of single words
        var testcontent = stripUnwantedText(result.content);
        testcontent = testcontent.toLowerCase();
        var wordlist = testcontent.split(" ");

        var processedWords = {};
        for (i = 0; i < wordlist.length; i++) {
            if (processedWords[wordlist[i]] !== " " || processedWords[wordlist[i]] != "") {
                if (processedWords[wordlist[i]]) {
                    processedWords[wordlist[i]].frequency += 1;
                } else {
                    processedWords[wordlist[i]] = {
                        word: wordlist[i],
                        date: displaydate,
                        frequency: 1,
                    }
                }
            }
        };

        _.each(processedWords, function (word, wordName) {
            // if we already have a item with the same word and date, update it
            if (Words.findOne({word: wordName, date: word.date})) {
                Words.update({word: wordName,date: word.date}, {$inc: {frequency: word.frequency}});
            }
            // otherwise just insert our new item
            else {
                Words.insert(word)
            }

            //CREATE A COLLECTION WHERE WE COUNT THE TOTAL USES OVER TIME. CALLED TopWords
            if (processedWords[word] !== " " || processedWords[word] != "") {
                if (MostUsed.findOne({word: wordName})){
                    MostUsed.update({word: wordName}, {$inc: {totalfrequency: word.frequency}});
                } else {
                    MostUsed.insert(word)
                    MostUsed.set({word: wordName}, {totalfrequency: word.frequency});
                }
            };
        });
    });
    //get data from AlJazeera
       HTTP.get('http://america.aljazeera.com', function (err, result) {
        //create the date
        var monthNames = new Array(
            "january", "february", "march", "april", "may", "june", "july",
            "august", "september", "october", "november", "december");
        var now = new Date();
        displaydate = monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();

        //strip content and put into an array of single words
        var testcontent = stripUnwantedText(result.content);
        testcontent = testcontent.toLowerCase();
        var wordlist = testcontent.split(" ");

        var processedWords = {};
        for (i = 0; i < wordlist.length; i++) {
            if (processedWords[wordlist[i]] !== " " || processedWords[wordlist[i]] != "") {
                if (processedWords[wordlist[i]]) {
                    processedWords[wordlist[i]].frequency += 1;
                } else {
                    processedWords[wordlist[i]] = {
                        word: wordlist[i],
                        date: displaydate,
                        frequency: 1,
                    }
                }
            }
        };

        _.each(processedWords, function (word, wordName) {
            // if we already have a item with the same word and date, update it
            if (Words.findOne({word: wordName, date: word.date})) {
                Words.update({word: wordName,date: word.date}, {$inc: {frequency: word.frequency}});
            }
            // otherwise just insert our new item
            else {
                Words.insert(word)
            }

            //CREATE A COLLECTION WHERE WE COUNT THE TOTAL USES OVER TIME. CALLED TopWords
            if (processedWords[word] !== " " || processedWords[word] != "") {
                if (MostUsed.findOne({word: wordName})){
                    MostUsed.update({word: wordName}, {$inc: {totalfrequency: word.frequency}});
                } else {
                    MostUsed.insert(word)
                    MostUsed.set({word: wordName}, {totalfrequency: word.frequency});
                }
            };
        });
    });



//get data from NYT
    HTTP.get('http://www.nytimes.com', function (err, result) {
        //create the date
        var monthNames = new Array(
            "january", "february", "march", "april", "may", "june", "july",
            "august", "september", "october", "november", "december");
        var now = new Date();
        displaydate = monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();

        //strip content and put into an array of single words
        var testcontent = stripUnwantedText(result.content);
        testcontent = testcontent.toLowerCase();
        var wordlist = testcontent.split(" ");

        var processedWords = {};
        for (i = 0; i < wordlist.length; i++) {
            if (processedWords[wordlist[i]] !== " " || processedWords[wordlist[i]] != "") {
                if (processedWords[wordlist[i]]) {
                    processedWords[wordlist[i]].frequency += 1;
                } else {
                    processedWords[wordlist[i]] = {
                        word: wordlist[i],
                        date: displaydate,
                        frequency: 1,
                    }
                }
            }
        };

        _.each(processedWords, function (word, wordName) {
            // if we already have a item with the same word and date, update it
            if (Words.findOne({word: wordName, date: word.date})) {
                Words.update({word: wordName,date: word.date}, {$inc: {frequency: word.frequency}});
            }
            // otherwise just insert our new item
            else {
                Words.insert(word)
            }

            //CREATE A COLLECTION WHERE WE COUNT THE TOTAL USES OVER TIME. CALLED TopWords
            if (processedWords[word] !== " " || processedWords[word] != "") {
                if (MostUsed.findOne({word: wordName})){
                    MostUsed.update({word: wordName}, {$inc: {totalfrequency: word.frequency}});
                } else {
                    MostUsed.insert(word)
                    MostUsed.set({word: wordName}, {totalfrequency: word.frequency});
                }
            };
        });
    });

//get data from Reuters
    HTTP.get('http://www.reuters.com', function (err, result) {
        //create the date
        var monthNames = new Array(
            "january", "february", "march", "april", "may", "june", "july",
            "august", "september", "october", "november", "december");
        var now = new Date();
        displaydate = monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();

        //strip content and put into an array of single words
        var testcontent = stripUnwantedText(result.content);
        testcontent = testcontent.toLowerCase();
        var wordlist = testcontent.split(" ");

        var processedWords = {};
        for (i = 0; i < wordlist.length; i++) {
            if (processedWords[wordlist[i]] !== " " || processedWords[wordlist[i]] != "") {
                if (processedWords[wordlist[i]]) {
                    processedWords[wordlist[i]].frequency += 1;
                } else {
                    processedWords[wordlist[i]] = {
                        word: wordlist[i],
                        date: displaydate,
                        frequency: 1,
                    }
                }
            }
        };

        _.each(processedWords, function (word, wordName) {
            // if we already have a item with the same word and date, update it
            if (Words.findOne({word: wordName, date: word.date})) {
                Words.update({word: wordName,date: word.date}, {$inc: {frequency: word.frequency}});
            }
            // otherwise just insert our new item
            else {
                Words.insert(word)
            }

            //CREATE A COLLECTION WHERE WE COUNT THE TOTAL USES OVER TIME. CALLED TopWords
            if (processedWords[word] !== " " || processedWords[word] != "") {
                if (MostUsed.findOne({word: wordName})){
                    MostUsed.update({word: wordName}, {$inc: {totalfrequency: word.frequency}});
                } else {
                    MostUsed.insert(word)
                    MostUsed.set({word: wordName}, {totalfrequency: word.frequency});
                }
            };
        });
    });
};

function stripUnwantedText(html) {
    var bodyRegex = /<body[^>]*>((.|[\n\r])*)<\/body>/im
    // var bodyRegex = /<div class="colB column"[^>]*>((.|[\n\r])*)<div id="exploreTray">/im
        ,
        scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        noScriptRegex = /<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi,
        styleRegex = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
        commentRegex = /<!--(.|\s)*?-->/gi,
        htmlTagRegex = /<.+?>/igm,
        characterEntityRegex = /&.+?;/gim,
        nonAlphaCharacterRegex = /[^A-Za-z ']/gi,
        apostropheRegex = /'/g,
        stopWords = [
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
            'al',
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
            'alt',
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
            'april',
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
            'august',
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
            'december',
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
            'ed',
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
            'height',
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
            'http',
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
            'international',
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
            'jazeera',
            'june',
            'july',
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
            'march',
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
            'october',
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
            'reuters',
            'reutersmedia',
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
            'september',
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
            'topics',
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
            'video',
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
            'width',
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
            'york',
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
        ].join('\\b|\\b'),
        stopWordsRegex = new RegExp(stopWords, "gi"),
        extraSpaceRegex = /\s+/g;

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
};

Meteor.publish("fromtoday", function () {
    var monthNames = new Array(
        "january", "february", "march", "april", "may", "june", "july",
        "august", "september", "october", "november", "december");
    var now = new Date();
    displaydate = monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();
    return Words.find({
        date: displaydate
    }, {
        sort: {
            frequency: -1
        },
        limit: 10
    });
});

Meteor.publish("fromanotherdate", function (somenewdate) {
    return Words.find({
        date: somenewdate
    }, {
        sort: {
            frequency: -1
        },
        limit: 10
    });
});

Meteor.publish("wordsubset", function (arg) {
    return Words.find({
        word: arg
    });
});

Meteor.publish("mostused", function () {
    return TopWords.find({}, {
        sort: {
            totalfrequency: -1
        },
        limit: 1
    });
});