import { Plugin } from 'jovo-core';
import { Alexa, AlexaSkill, AlexaRequest, AlexaResponse } from 'jovo-platform-alexa';
import { set as _set, get as _get } from 'lodash';

export interface StartConnectionOptions {
  uri: string;
  input: any;
  token?: string;
}

export class SkillConnections implements Plugin {
  install(alexa: Alexa) {
    alexa.middleware('$type')!.use(this.type.bind(this));
    alexa.middleware('$output')!.use(this.output.bind(this));

    AlexaSkill.prototype.startConnection = function(options: StartConnectionOptions) {
      _set(this.$output, 'AlexaSkillConnections.StartConnection', {
        type: 'Connections.StartConnection',
        uri: options.uri,
        input: options.input,
        token: options.token || '',
      });
      return this;
    };
  }
  uninstall(alexa: Alexa) {}
  type(alexaSkill: AlexaSkill) {
    const alexaRequest = alexaSkill.$request as AlexaRequest;
    if (_get(alexaRequest, 'request.type') === 'SessionResumedRequest') {
      alexaSkill.$type = { type: 'ON_SESSIONRESUME' };
    }
  }

  output(alexaSkill: AlexaSkill) {
    const output = alexaSkill.$output;
    const response = alexaSkill.$response as AlexaResponse;

    if (output.AlexaSkillConnections && output.AlexaSkillConnections.StartConnection) {
      const directives = _get(response, 'response.directives', []);
      directives.push(_get(output, 'AlexaSkillConnections.StartConnection'));
      _set(response, 'response.directives', directives);

      if (typeof _get(response, 'response.shouldEndSession') !== 'undefined') {
        delete response.response.shouldEndSession;
      }
    }
  }
}
