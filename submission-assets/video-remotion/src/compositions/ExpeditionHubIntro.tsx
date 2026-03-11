import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {introScriptKo} from '../data/script.ko';
import type {IntroTimeline} from '../data/timeline';
import {SceneCard} from '../scenes/SceneCard';

export const ExpeditionHubIntro = ({timeline}: {timeline: IntroTimeline}) => {
  const frame = useCurrentFrame();
  const overlayOpacity = interpolate(frame, [0, 20], [0, 0.15], {
    extrapolateRight: 'clamp',
  });

  let from = 0;

  return (
    <AbsoluteFill style={{backgroundColor: '#171314'}}>
      {timeline.scenes.map((scene, index) => {
        const script = introScriptKo[index];
        const currentFrom = from;
        from += scene.durationInFrames;

        return (
          <Sequence key={scene.id} from={currentFrom} durationInFrames={scene.durationInFrames}>
            <SceneCard
              title={script.title}
              kicker={script.kicker}
              body={script.body}
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
