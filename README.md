# twitter-backend

## .env

```bash
MONGODB_URI=mongodb://localhost:27017/twitter
PORT=4000
ACCESS_TOKEN_SECRET=accesstokensecret
```
## pm2 config

```bash
module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: "api",
      script: "npm",
      args: "start --prefix api",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
```
