let event = {
  "resource": "/v1/reports/{id}",
  "path": "/reports/v1/reports/8",
  "httpMethod": "GET",
  "queryStringParameters": {
		"filter": "tenant=telia",
		"select": "deviceid=354315086424011"
	},
  "pathParameters": {
    "id": "1"
  },
  "body": null,
  "isBase64Encoded": false
};

let url = "http://www.reports.com/reports/v1/reports/8?query=select * from foo; truncate";

function createUrl(event) {
  return event.path + '?' + Object.keys(event.queryStringParameters).map(function(key) {
        return [key, event.queryStringParameters[key]].map(encodeURIComponent).join("=");
    }).join("&");
}

function hasSql (url) {
    if (url === null || url === undefined) {
        return false;
    }
    // sql regex reference: http://www.symantec.com/connect/articles/detection-sql-injection-and-cross-site-scripting-attacks
    let sql_meta = new RegExp('(')|(\')|(--)|(#)|(#)', 'i');
    if (sql_meta.test(url)) {
        return true;
    }
    let sql_meta2 = new RegExp('((=)|(=))[^\n]*((')|(\')|(--)|(;)|(;))', 'i');
    if (sql_meta2.test(url)) {
        return true;
    }
    let sql_typical = new RegExp('w*((')|(\'))((o)|o|(O))((r)|r|(R))', 'i');
    if (sql_typical.test(url)) {
        return true;
    }
    let sql_union = new RegExp('((')|(\'))union', 'i');
    if (sql_union.test(url)) {
        return true;
    }
    return false;
}
console.log(encodeURI(url));
console.log(this.hasSql(url));
console.log(this.hasSql(encodeURI(url)));
console.log(this.createUrl(event));
this.hasSql(this.createUrl(event));
