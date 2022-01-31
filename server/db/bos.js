// const { BosClient } = require('@baiducloud/sdk')
const { AK, SK } = require('../config/config.default')
var Auth = require('@baiducloud/sdk').Auth;


// const client = new BosClient({
//     endpoint: "http://bj.bcebos.com", //传入Bucket所在区域域名
//     credentials: {
//         ak: AK, //您的AccessKey
//         sk: SK, //您的SecretAccessKey
//     }
// })


function getAuth() {
    var auth = new Auth(AK, SK);
    var method = 'PUT';
    var uri = '/v1/bucket/object1';
    var params = {
        // A: null,
        // b: '',
        // C: 'd'
    };
    var headers = {
        'Host': 'bj.bcebos.co'
        // 'abc': '123',
        // 'x-bce-meta-key1': 'ABC'
    };

    var signature = auth.generateAuthorization(method, uri, params, headers, 1800);
    console.log(signature);
}


// expect(signature).to.eql('bce-auth-v1/my_ak/2014-06-13T05:57:36Z/1800/host;x-bce-meta-key1/'
//     + '80c9672aca2ea9af4bb40b9a8ff458d72df94e97d550840727f3a929af271d25');

// signature = auth.generateAuthorization(method, uri, params, headers, 1402639056, 1800);
// expect(signature).to.eql('bce-auth-v1/my_ak/2014-06-13T05:57:36Z/1800/host;'
//     + 'x-bce-meta-key1/80c9672aca2ea9af4bb40b9a8ff458d72'
//     + 'df94e97d550840727f3a929af271d25');

// method = 'DELETE';
// uri = '/v1/test-bucket1361199862';
// params = {};
// headers = {
//     'Content-Type': 'application/json; charset=utf-8',
//     'Content-Length': 0,
//     'User-Agent': 'This is the user-agent'
// };
// signature = auth.generateAuthorization(method, uri, params, headers, 1402639056, 1800);
// expect(signature).to.eql('bce-auth-v1/my_ak/2014-06-13T05:57:36Z/1800/'
//     + 'content-length;content-type/'
//     + 'c9386b15d585960ae5e6972f73ed92a9a682dc81025480ba5b41206d3e489822');