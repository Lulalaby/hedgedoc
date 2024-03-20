# Authentication guide - Discord

1. Sign-in or sign-up for a Discord account

2. Navigate to developer portal [here](https://discord.com/developers/applications/new) and create a new application.

3. Add the Client ID and Client Secret to your config.json file or pass them as environment variables
  - `config.json`:
    ```json
    {
      "production": {
        "discord": {
          "clientID": "3747d30eaccXXXXXXXXX",
          "clientSecret": "2a8e682948eee0c580XXXXXXXXXXXXXXXXXXXXXX"
        }
      }
    }
    ```

  - environment variables:
    ```shell
    CMD_DISCORD_CLIENTID=3747d30eaccXXXXXXXXX
    CMD_DISCORD_CLIENTSECRET=2a8e682948eee0c580XXXXXXXXXXXXXXXXXXXXXX
    ```
