import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

interface SceneCardProps {
  title: string;
  kicker: string;
  body: string;
  still: string;
  sceneIndex: number;
  totalScenes: number;
}

export const SceneCard = ({
  title,
  kicker,
  body,
  still,
  sceneIndex,
  totalScenes,
}: SceneCardProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const textEntrance = spring({
    fps,
    frame,
    config: {
      damping: 200,
      stiffness: 180,
    },
  });

  const imageScale = interpolate(frame, [0, 120], [1.06, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#171314', color: '#f7f1e8'}}>
      <AbsoluteFill style={{padding: 72}}>
        <div
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: 24,
            letterSpacing: 2,
            color: '#98f0e1',
            textTransform: 'uppercase',
            marginBottom: 18,
          }}
        >
          Expedition Hub Intro / Scene {sceneIndex + 1} of {totalScenes}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            gap: 40,
            flex: 1,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              transform: `translateY(${interpolate(textEntrance, [0, 1], [28, 0])}px)`,
              opacity: textEntrance,
            }}
          >
            <div
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: 28,
                color: '#f7d64a',
                marginBottom: 20,
              }}
            >
              {kicker}
            </div>
            <h1
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: 72,
                lineHeight: 1.05,
                margin: '0 0 28px 0',
                textTransform: 'uppercase',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 34,
                lineHeight: 1.45,
                color: 'rgba(247, 241, 232, 0.92)',
                margin: 0,
              }}
            >
              {body}
            </p>
          </div>

          <div
            style={{
              position: 'relative',
              border: '8px solid #f08a24',
              boxShadow: '0 18px 48px rgba(0, 0, 0, 0.35)',
              overflow: 'hidden',
              background: '#0e0b0c',
            }}
          >
            <Img
              src={staticFile(`stills/${still}`)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${imageScale})`,
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 36,
            fontFamily: 'system-ui, sans-serif',
            fontSize: 24,
            color: 'rgba(247, 241, 232, 0.72)',
          }}
        >
          <span>https://daykervibe.vercel.app/</span>
          <span>https://github.com/kimjuyoung1127/daykervibe</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
