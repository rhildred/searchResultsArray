const readlineSync = require('readline-sync');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
require('url');


const sSearch = readlineSync.question('Enter your search terms: ');
const sUrl ='https://www.google.com/search?q=' + encodeURI(sSearch);
fetch(sUrl)
    .then(res => res.text())
    .then(body => {
        $ = cheerio.load(body);
        const aAnchors = $("a");
        let aUrls = [];
        for(let n = 0; n < aAnchors.length; n++){
            const sHref = $(aAnchors[n]).attr("href");
            if(sHref.match(/^\/url/)){
                const myUrl = new URL("https://www.google.com" + sHref);
                aUrls.push(myUrl.searchParams.get("q"));
            }
        }
        console.log(aUrls);
    })
    .catch(e =>{
        console.log(e.toString());
    });