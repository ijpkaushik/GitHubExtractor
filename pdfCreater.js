const pdfkit = require('pdfkit');
const fs = require('fs')


function pdfCreater(filePath, repoName, repoLink, issuesLinkArr) {
    let pdfDoc = new pdfkit;

    pdfDoc.pipe(fs.createWriteStream(filePath));

    pdfDoc.moveDown(1);

    pdfDoc
        .fillColor('black')
        .fontSize(26)
        .text('RepoName: ' + repoName, {
            align: 'center',
            underline: true,
            link: repoLink
        })


    pdfDoc.moveDown(1);

    pdfDoc
        .fillColor('black')
        .fontSize(18)
        .font('Times-Roman')
        .list(issuesLinkArr)

    pdfDoc.end();
}

module.exports = pdfCreater