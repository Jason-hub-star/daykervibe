import scriptKoJson from './script.ko.json';

export interface LongformSceneScript {
  id: string;
  title: string;
  kicker: string;
  body: string;
  voiceover: string;
  subtitle: string[];
  highlights: string[];
  judgeFocus: string;
  evidence: string;
  routeLabel: string;
}

export const longformScriptKo = scriptKoJson as LongformSceneScript[];
