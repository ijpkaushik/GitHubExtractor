const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path');
const pdfCreater = require('./pdfCreater');

function getRepoIssues(url, topicName, repoName, repoLink) {
    request(url, cb)


    function cb(err, res, html) {
        if (err) {
            console.log(err)
        } else if (res.statusCode == 404) {
            console.log('Page Not Found')
        } else {
            extractIssue(html)
        }
    }

    function extractIssue(html) {
        let $ = cheerio.load(html);
        let issuesElementArr = $('.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title');
        let issuesLinkArr = []
        for (let i = 0; i < issuesElementArr.length; i++) {
            let issueLink = $(issuesElementArr[i]).attr('href');
            // console.log(issueLink);
            issuesLinkArr.push(issueLink)
        }
        // console.log(topicName, issuesLinkArr);
        issuesLinkJSON = JSON.stringify(issuesLinkArr);
        console.log(issuesLinkArr);

        let folderPath = path.join(__dirname, '/topicsData', topicName);
        dirCreater(folderPath);

        let filePath = path.join(folderPath, repoName + ".pdf");

        pdfCreater(filePath, repoName, repoLink, issuesLinkArr);

        // let filePath = path.join(folderPath, repoName + ".json");
        // fs.writeFileSync(filePath, issuesLinkJSON);
    }
}

function dirCreater(folderPath) {
    if (fs.existsSync(folderPath) == false) {
        fs.mkdirSync(folderPath);
    }
}

module.exports = getRepoIssues