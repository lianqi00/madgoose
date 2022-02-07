const qiniu = require('qiniu')
const { AK, SK, BUCKET } = require('../config/config.default')

const accessKey = AK;
const secretKey = SK;
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
class QiniuMiddleware {
    async qiniuToken(ctx, next) {
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
        var privateBucketDomain = 'http://r6ri4pihk.hb-bkt.clouddn.com';
        var deadline = parseInt(Date.now() / 1000) + 3600; // 1小时过期
        var privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, key, deadline);
        console.log(privateDownloadUrl);
        ctx.body = {
            code: 0,
            message: '下载地址生成成功',
            result: privateDownloadUrl
        }
    }
}

module.exports = new QiniuMiddleware()