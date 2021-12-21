let URL = 'https://github.com/topics'
const request = require('request')
const cheerio = require('cheerio')
const getReposPageHtml = require('./reposPage')

request(URL, cb)

function cb(err, res, html) {
    if (err) {
        console.log(err)
    } else if (res.statusCode == 404) {
        console.log('Page Not Found')
    } else {
        extractTopicsLinks(html)
    }
}

function extractTopicsLinks(html) {
    let $ = cheerio.load(html);
    let topicsElementsArr = $('.no-underline.d-flex.flex-column.flex-justify-center');
    for (let i = 0; i < topicsElementsArr.length; i++) {
        let topicLink = $(topicsElementsArr[i]).attr('href');
        let topicName = topicLink.split('/').pop();
        let fullTopicLink = `https://github.com/${topicLink}`;
        // console.log(fullTopicLink);
        getReposPageHtml(fullTopicLink, topicName);
    }
}