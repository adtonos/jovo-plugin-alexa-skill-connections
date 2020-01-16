"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jovo_platform_alexa_1 = require("jovo-platform-alexa");
const lodash_1 = require("lodash");
class SkillConnections {
    install(alexa) {
        alexa.middleware('$type').use(this.type.bind(this));
        alexa.middleware('$output').use(this.output.bind(this));
        jovo_platform_alexa_1.AlexaSkill.prototype.startConnection = function (options) {
            lodash_1.set(this.$output, 'AlexaSkillConnections.StartConnection', {
                type: 'Connections.StartConnection',
                uri: options.uri,
                input: options.input,
                token: options.token || '',
            });
            return this;
        };
    }
    uninstall(alexa) { }
    type(alexaSkill) {
        const alexaRequest = alexaSkill.$request;
        if (lodash_1.get(alexaRequest, 'request.type') === 'SessionResumedRequest') {
            alexaSkill.$type = { type: 'ON_SESSIONRESUME' };
        }
    }
    output(alexaSkill) {
        const output = alexaSkill.$output;
        const response = alexaSkill.$response;
        if (output.AlexaSkillConnections && output.AlexaSkillConnections.StartConnection) {
            const directives = lodash_1.get(response, 'response.directives', []);
            directives.push(lodash_1.get(output, 'AlexaSkillConnections.StartConnection'));
            lodash_1.set(response, 'response.directives', directives);
            if (typeof lodash_1.get(response, 'response.shouldEndSession') !== 'undefined') {
                delete response.response.shouldEndSession;
            }
        }
    }
}
exports.SkillConnections = SkillConnections;
//# sourceMappingURL=SkillConnections.js.map