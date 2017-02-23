var querystring = require('querystring');
var http = require('http');

var postData = querystring.stringify({
    'msg' : 'Hello World!'
});

var options = {
    hostname: 'kan.juanpi.com',
    port: 80,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};

var req = http.request(options, function(res){
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`主体: ${chunk}`);
    });
    res.on('end', function(){
        console.log('响应中已无数据。');
    });
});

req.on('error', function(e){
      console.log(`请求遇到问题: ${e.message}`);
});

// 写入数据到请求主体
req.write(postData);
console.log('end');
req.end();
