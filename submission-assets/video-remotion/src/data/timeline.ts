import {introScriptKo} from './script.ko';

export interface IntroSceneTimeline {
  id: string;
  durationInFrames: number;
  still: string;
}

export interface IntroTimeline {
  scenes: IntroSceneTimeline[];
  totalFrames: number;
}

const scenes: IntroSceneTimeline[] = [
  {id: 'opening', durationInFrames: 270, still: 'home-1280x800.png'},
  {id: 'problem', durationInFrames: 240, still: 'home-1280x800.png'},
  {id: 'discover', durationInFrames: 300, still: 'detail-1280x800.png'},
  {id: 'detail', durationInFrames: 330, still: 'detail-1280x800.png'},
  {id: 'camp', durationInFrames: 330, still: 'camp-form-1280x800.png'},
  {id: 'war-room', durationInFrames: 390, still: 'war-room-drag-desktop-1280.png'},
  {id: 'result', durationInFrames: 270, still: 'rankings-1280x800.png'},
  {id: 'ending', durationInFrames: 240, still: 'home-1280x800.png'},
];

const totalFrames = scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0);

if (scenes.length !== introScriptKo.length) {
  throw new Error('Timeline and script scene count must match.');
}

export const introTimeline: IntroTimeline = {
  scenes,
  totalFrames,
};
