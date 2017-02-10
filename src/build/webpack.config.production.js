const _ = require('lodash');
const S3Plugin = require('webpack-s3-plugin')
const AWSCredentials = require('../../aws-credentials.json');
var webpackConfig = requre('./webpack.config.js');

// Better full source maps for production (they are slow to build
// so only use them in production
webpackConfig.devtool = 'source-maps';

// Deploy to S3 and refresh cloudfront
webpackConfig.plugins.push(
  new S3Plugin({
    s3Options: {
      accessKeyId: AWSCredentials.accessKeyId,
      secretAccessKey: AWSCredentials.secretAccessKey,
    },
    s3UploadOptions: {
      Bucket: 'oscars.alexmarchant.com'
    },
    cloudfrontInvalidateOptions: {
      DistributionId: 'E1UL5P2TA9NOD2',
      Items: ["/*"]
    }
  })
);

module.exports webpackConfig;
