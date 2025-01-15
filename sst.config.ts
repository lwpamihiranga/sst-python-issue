/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'sst-python',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc('BackendVpc', {
      nat: 'ec2',
      bastion: true, // bastion host for connecting to the database - should reuse NAT EC2 instance, but seems to create 2
    });
    const db = new sst.aws.Postgres('BackendRds', {
      vpc,
      // @ts-ignore types are wrong
      dev: {
        // create a local postgres DB and set these values. TODO: get from env.development - does not seem to work
        username: '',
        password: '',
        database: '',
        host: '',
        port: 5432,
      },
    });
    new sst.aws.Function('BackendLambda', {
      url: true,
      vpc,
      handler: 'lambdas/python/main.handler',
      link: [db],
      runtime: 'python3.12',
      timeout: '900 seconds',
      // https://github.com/sst/sst/issues/4114#issuecomment-2427548044
      copyFiles: [
        {
          from: 'lambdas/python/main.py',
          to: 'lambdas/python/main.py',
        },
      ],
    });
  },
});
