var request = require('request');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;

exports.getFavIcon = (req, res) => {
  const url = req.params.url;
  let fullpath;

  if (!url) {
    res.status(400).send({
      message: "URL can not be empty!"
    });
    return;
  }

  function icoParser() {
    request(url, function (err, resp, body) {
      if (resp.statusCode === 200) {
        let dom = new JSDOM(body);
        let favurl = dom.window.document.querySelector('[rel*=icon]')?.href;

        if(!favurl) {
          fullpath = url + "/favicon.ico";
        } else {
          fullpath = favurl.split("/")[0] == "" ? url + favurl : favurl;
        }
        // Promise.resolve(fullpath);
        return fullpath;
      }
    });
  }

  function icoChecker() {
    request(url + '/favicon.ico', function (err, resp, body) {
      if (resp.statusCode === 200) {
        let fullpath = url + "/favicon.ico";
        // Promise.resolve(fullpath);
        return fullpath;
      } else {
        icoParser();
      }
    });
  }

  let iconFullPath = icoChecker();
  res.send("<img src='" + iconFullPath + "'>");

  // Promise.resolve(icoChecker()).then((fullpath) => {res.send("<img src='" + fullpath + "'>")});

  // request(url + '/favicon.ico', function (err, resp, body) {
  //   if (resp.statusCode === 200) {
  //     let fullpath = url + "/favicon.ico";
  //     res.send("<img src='" + fullpath + "'>");
  //   } else {
  //     request(url, function (err, resp, body) {
  //       if (resp.statusCode === 200) {
  //         let dom = new JSDOM(body);
  //         let favurl = dom.window.document.querySelector('[rel*=icon]')?.href;
  //         let fullpath;
    
  //         if(!favurl) {
  //           fullpath = url + "/favicon.ico";
  //         } else {
  //           fullpath = favurl.split("/")[0] == "" ? url + favurl : favurl;
  //         }
    
  //         res.send("<img src='" + fullpath + "'>");
  //       }
  //     });
  //   }
  // });
};