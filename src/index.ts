import { StartConnectionOptions } from './SkillConnections';
export { SkillConnections } from './SkillConnections';

declare module 'jovo-platform-alexa/dist/src/core/AlexaSkill' {
  interface AlexaSkill {
    startConnection(options: StartConnectionOptions): AlexaSkill;
  }
}

export interface StartConnectionDirective {
  type: string;
  uri: string;
  input: any;
  token?: string;
}

declare module 'jovo-core/dist/src/Interfaces' {
  interface Output {
    AlexaSkillConnections: {
      StartConnection?: StartConnectionDirective,
    };
  }
}