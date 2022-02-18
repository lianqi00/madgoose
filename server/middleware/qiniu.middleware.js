const qiniu = require('qiniu')
const { AK, SK, BUCKET, BUCKETDOMAIN } = require('../config/config.default')

// const accessKey = AK;
// const secretKey = SK;
const mac = new qiniu.auth.digest.Mac(AK, SK);
class QiniuMiddleware {
    async qiniuToken(ctx, next) {
        // console.log('走上传接口');
        var options = {
            scope: BUCKET,
            // expires: 7200,
            returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)"}'
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken = putPolicy.uploadToken(mac);
        // ctx.state.qiniuToken = uploadToken
        ctx.body = {
            code: 0,
            message: '上传token获取成功',
            result: uploadToken
        }
    }
    async getDownLoadUrl(ctx, next) {
        // console.log(ctx.query);
        const { key } = ctx.query
        var config = new qiniu.conf.Config();
        // 空间对应的机房
        config.zone = qiniu.zone.Zone_z1;
        // 是否使用https域名
        //config.useHttpsDomain = true;
        // 上传是否使用cdn加速
        //config.useCdnDomain = true;
        var bucketManager = new qiniu.rs.BucketManager(mac, config);
        var privateBucketDomain = BUCKETDOMAIN;
        var deadline = parseInt(Date.now() / 1000) + 3600; // 1小时过期
        var privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, key, deadline);
        var cdnManager = new qiniu.cdn.CdnManager(mac);
        var urlsToRefresh = [
            privateDownloadUrl
        ];
        cdnManager.refreshUrls(urlsToRefresh, function (err, respBody, respInfo) {
            if (err) {
                throw err;
            }
            // console.log(respInfo.statusCode);
            if (respInfo.statusCode == 200) {
                // console.log(respBody);

            }
        });
        // console.log(privateDownloadUrl);
        ctx.body = {
            code: 0,
            message: '下载地址生成成功',
            result: privateDownloadUrl
        }
    }
    async getOverWriteToken(ctx, next) {
        // console.log(ctx.query.key);
        var keyToOverwrite = ctx.query.key;

        var options = {
            scope: BUCKET + ":" + keyToOverwrite
        }
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken = putPolicy.uploadToken(mac);
        // console.log(uploadToken);
        ctx.body = {
            code: 0,
            message: '覆盖上传token生成成功',
            result: uploadToken
        }
    }
}

module.exports = new QiniuMiddleware()