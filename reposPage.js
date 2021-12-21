const request = require('request')
const cheerio = require('cheerio')
const getRepoIssues = require('./repoIssues')

function getReposPageHtml(url, topicName) {
    request(url, cb)


    function cb(err, res, html) {
        if (err) {
            console.log(err)
        } else if (res.statusCode == 404) {
            console.log('Page Not Found')
        } else {
            extractReposLinks(html)
        }
    }

    function extractReposLinks(html) {
        let $ = cheerio.load(html);
        let reposElementsArr = $('.f3.color-fg-muted');
        //console.log(topicName)
        for (i = 0; i < 7; i++) {
            let anchorArr = $(reposElementsArr[i]).find('a');
            let repoLink = $(anchorArr[1]).attr('href');
            let repoName = repoLink.split('/').pop();
            let repoFullLink = 'https://github.com/' + repoLink;
            let repoIssuePageLink = repoFullLink + '/issues';
            // console.log(repoIssuePageLink);
            getRepoIssues(repoIssuePageLink, topicName, repoName, repoLink);
        }
        //console.log('**************************')
    }
}
module.exports = getReposPageHtml