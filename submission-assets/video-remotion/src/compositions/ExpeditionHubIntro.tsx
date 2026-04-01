import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {longformScriptKo} from '../data/script.ko';
import type {LongformTimeline} from '../data/timeline';
import {SceneCard} from '../scenes/SceneCard';

export const ExpeditionHubLongform = ({
  timeline,
  withAudio = false,
}: {
  timeline: LongformTimeline;
  withAudio?: boolean;
}) => {
  const frame = useCurrentFrame();
  const overlayOpacity = interpolate(frame, [0, 20], [0, 0.15], {
    extrapolateRight: 'clamp',
  });

  let from = 0;

  return (
    <AbsoluteFill style={{backgroundColor: '#171314'}}>
      {timeline.scenes.map((scene, index) => {
        const script = longformScriptKo[index];
        const currentFrom = from;
        from += scene.durationInFrames;
        const audioFile = `audio/narration-scene-${String(index + 1).padStart(2, '0')}.wav`;

        return (
          <Sequence key={scene.id} from={currentFrom} durationInFrames={scene.durationInFrames}>
            {withAudio ? <Audio src={staticFile(audioFile)} /> : null}
            <SceneCard
              title={script.title}
              kicker={script.kicker}
              body={script.body}
              subtitle={script.subtitle}
              highlights={script.highlights}
              judgeFocus={script.judgeFocus}
              evidence={script.evidence}
              routeLabel={script.routeLabel}
              still={scene.still}
              sceneIndex={index}
              totalScenes={timeline.scenes.length}
            />
          </Sequence>
        );
      })}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(240,138,36,0.10) 0%, rgba(23,19,20,0.00) 35%, rgba(23,19,20,0.22) 100%)',
          opacity: overlayOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
