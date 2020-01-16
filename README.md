# jovo-plugin-alexa-skill-connections

Jovo plugin that adds support for Alexa Skill Connections.

## Installation

Install SkillConnections plugin into your Jovo project:

`npm install jovo-plugin-alexa-skill-connections --save`

Use the plugin in the app.js:

```javascript
const { SkillConnections } = require("jovo-plugin-alexa-skill-connections");

app.$platform.get('Alexa').use(new SkillConnections());
```

Or app.ts:

```javascript
import { Extensible } from 'jovo-framework';
import { SkillConnections } from "jovo-plugin-alexa-skill-connections";

const AlexaPlugin = <Extensible | undefined>app.$platform.get('Alexa');
AlexaPlugin?.use(new SkillConnections());
```

## Usage

In general:

```javascript
app.setHandler({
  TestIntent(): {
    this.$alexaSkill?.startConnection({
      uri: "connection://AMAZON.TestStatusCode/1",
      input: {
        code: "200",
      },
    });
  },

  ON_SESSIONRESUME() {
    console.log('AlexaSkill.SessionResumedRequest');
    const { code, message } = (<any>this.$request).request.cause.status;
    this.ask(`status code: ${code}, message: ${message}`);
  }
});
```

