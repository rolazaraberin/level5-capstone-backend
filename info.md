## Deploying

1. Commit git changes
2. `npm run deploy`

## Environment Variables

1. Instead of copying .env to git, set the variables in Heroku.
2. In Heroku, go to `app` => `Settings` tab => click `Reveal Config Vars`
3. Set keys and values
   - Use the same keys in `.env`
   - NOTE: Do not put quotes around values

## CORS

1. To connect from a local machine, enable CORS
   - https://expressjs.com/en/resources/middleware/cors.html
   - https://enable-cors.org/server_expressjs.html
