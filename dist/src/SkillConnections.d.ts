import { Plugin } from 'jovo-core';
import { Alexa, AlexaSkill } from 'jovo-platform-alexa';
export interface StartConnectionOptions {
    uri: string;
    input: any;
    token?: string;
}
export declare class SkillConnections implements Plugin {
    install(alexa: Alexa): void;
    uninstall(alexa: Alexa): void;
    type(alexaSkill: AlexaSkill): void;
    output(alexaSkill: AlexaSkill): void;
}
