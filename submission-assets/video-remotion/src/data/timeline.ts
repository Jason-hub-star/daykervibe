import audioDurationsJson from './audio-durations.json';
import {longformScriptKo} from './script.ko';

export interface LongformSceneTimeline {
  id: string;
  durationInFrames: number;
  still: string;
}

export interface LongformTimeline {
  scenes: LongformSceneTimeline[];
  totalFrames: number;
}

const FPS = 30;
const AUDIO_PADDING_SECONDS = 1.2;

const audioDurations = audioDurationsJson as Record<string, number>;

const sceneBlueprints = [
  {id: 'opening', still: 'home-1280x800.png', minimumSeconds: 12},
  {id: 'problem', still: 'home-1280x800.png', minimumSeconds: 12},
  {id: 'strategy', still: 'detail-1280x800.png', minimumSeconds: 11},
  {id: 'discover', still: 'home-1280x800.png', minimumSeconds: 12},
  {id: 'detail', still: 'detail-1280x800.png', minimumSeconds: 13},
  {id: 'camp', still: 'camp-form-1280x800.png', minimumSeconds: 13},
  {id: 'war-room', still: 'war-room-drag-desktop-1280.png', minimumSeconds: 15},
  {id: 'submit-flow', still: 'war-room-drag-desktop-1280.png', minimumSeconds: 14},
  {id: 'reviewer-flow', still: 'rankings-1280x800.png', minimumSeconds: 11},
  {id: 'proof', still: 'detail-1280x800.png', minimumSeconds: 13},
  {id: 'closing', still: 'home-1280x800.png', minimumSeconds: 11},
] as const;

const scenes: LongformSceneTimeline[] = sceneBlueprints.map((scene) => {
  const audioDurationSeconds = audioDurations[scene.id];
  const resolvedSeconds = audioDurationSeconds
    ? Math.max(scene.minimumSeconds, audioDurationSeconds + AUDIO_PADDING_SECONDS)
    : scene.minimumSeconds;

  return {
    id: scene.id,
    still: scene.still,
    durationInFrames: Math.ceil(resolvedSeconds * FPS),
  };
});

const totalFrames = scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0);

if (scenes.length !== longformScriptKo.length) {
  throw new Error('Timeline and script scene count must match.');
}

export const longformTimeline: LongformTimeline = {
  scenes,
  totalFrames,
};
