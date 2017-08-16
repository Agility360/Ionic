// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.

// Copyright 2017 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.

// AWS Mobile Hub Project Constants
const aws_app_analytics = 'enable';
const aws_cognito_identity_pool_id = 'us-east-1:bdf9951a-fe82-47f6-8599-4fbe7ab74bfc';
const aws_cognito_region = 'us-east-1';
const aws_content_delivery = 'enable';
const aws_content_delivery_bucket = 'clientengagementapp-hosting-mobilehub-1363944817';
const aws_content_delivery_bucket_region = 'us-east-1';
const aws_content_delivery_cloudfront = 'enable';
const aws_content_delivery_cloudfront_domain = 'd1s3rwkbgrvc9r.cloudfront.net';
const aws_dynamodb = 'enable';
const aws_dynamodb_all_tables_region = 'us-east-1';
const aws_dynamodb_table_schemas = '[{"tableName":"ionic-mobile-hub-tasks","attributes":[{"name":"userId","type":"S"},{"name":"taskId","type":"S"},{"name":"category","type":"S"},{"name":"created","type":"N"},{"name":"description","type":"S"}],"indexes":[{"indexName":"DateSorted","hashKey":"userId","rangeKey":"created"}],"region":"us-east-1","hashKey":"userId","rangeKey":"taskId"}]';
const aws_mobile_analytics_app_id = '401e68d49b1b4bf8a38a29a3e6412715';
const aws_project_id = '1ef212e7-b846-4b49-aaf9-75f676768aef';
const aws_project_name = 'client-engagement-app';
const aws_project_region = 'us-east-1';
const aws_resource_name_prefix = 'clientengagementapp-mobilehub-1363944817';
const aws_sign_in_enabled = 'enable';
const aws_user_files = 'enable';
const aws_user_files_s3_bucket = 'clientengagementapp-userfiles-mobilehub-1363944817';
const aws_user_files_s3_bucket_region = 'us-east-1';
const aws_user_pools = 'enable';
const aws_user_pools_id = 'us-east-1_DB4QsAHuf';
const aws_user_pools_mfa_type = 'OFF';
const aws_user_pools_web_client_id = '5ksv9pmv1270se9e8prpaejdal';
const aws_user_settings = 'enable';

AWS.config.region = aws_project_region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: aws_cognito_identity_pool_id
  }, {
    region: aws_cognito_region
});
AWS.config.update({customUserAgent: 'MobileHub v0.1'});