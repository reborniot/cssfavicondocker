const request = require('request');
// const jsdom = require('jsdom');
const https = require('https');
//const { JSDOM } = jsdom;

exports.getFavIcon = (req, res) => {
  const url = req.params.url;
  let fullpath;

  if (!url) {
    res.status(400).send({
      message: "URL can not be empty!"
    });
    return;
  }

  request(url + '/favicon.ico', function (err, resp, body) {
    if (resp.statusCode === 200) {
      fullpath = url + "/favicon.ico";
    } else {
      /* request(url, function (err, resp, body) {
        if (resp.statusCode === 200) {
          let dom = new JSDOM(body);
          let favurl = dom.window.document.querySelector('[rel*=icon]')?.href;
    
          if(!favurl) {
            fullpath = url + "/favicon.ico";
          } else {
            fullpath = favurl.split("/")[0] == "" ? url + favurl : favurl;
          }
        }
      }); */
      fullpath = url + "/favicon.png";
    }

    res.writeHead(200,{'content-type':'image/x-icon'});
    https.get(fullpath, (stream) => {
      stream.pipe(res);
    });

  });
};
