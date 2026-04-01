import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

interface SceneCardProps {
  title: string;
  kicker: string;
  body: string;
  subtitle: string[];
  highlights: string[];
  judgeFocus: string;
  evidence: string;
  routeLabel: string;
  still: string;
  sceneIndex: number;
  totalScenes: number;
}

export const SceneCard = ({
  title,
  kicker,
  body,
  subtitle,
  highlights,
  judgeFocus,
  evidence,
  routeLabel,
  still,
  sceneIndex,
  totalScenes,
}: SceneCardProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const palette = [
    {accent: '#f08a24', soft: 'rgba(240, 138, 36, 0.18)', glow: 'rgba(240, 138, 36, 0.24)'},
    {accent: '#98f0e1', soft: 'rgba(152, 240, 225, 0.18)', glow: 'rgba(152, 240, 225, 0.24)'},
    {accent: '#f7d64a', soft: 'rgba(247, 214, 74, 0.18)', glow: 'rgba(247, 214, 74, 0.24)'},
    {accent: '#ff79c9', soft: 'rgba(255, 121, 201, 0.18)', glow: 'rgba(255, 121, 201, 0.24)'},
  ][sceneIndex % 4];

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
  const cardSlide = interpolate(textEntrance, [0, 1], [36, 0]);
  const progressWidth = interpolate(sceneIndex + 1, [0, totalScenes], [0, 100]);
  const subtitleOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#171314', color: '#f7f1e8'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at top left, ${palette.glow} 0%, rgba(23, 19, 20, 0) 42%), radial-gradient(circle at bottom right, rgba(247, 241, 232, 0.08) 0%, rgba(23, 19, 20, 0) 36%)`,
        }}
      />
      <AbsoluteFill style={{padding: 72}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}}>
          <div
            style={{
              fontFamily: '"SF Pro Display", "Apple SD Gothic Neo", sans-serif',
              fontSize: 22,
              letterSpacing: 2,
              color: palette.accent,
              textTransform: 'uppercase',
            }}
          >
            Expedition Hub / Hackathon Submission Longform
          </div>
          <div
            style={{
              border: `2px solid ${palette.accent}`,
              background: palette.soft,
              padding: '12px 18px',
              fontFamily: 'Menlo, monospace',
              fontSize: 20,
              color: '#f7f1e8',
            }}
          >
            Scene {String(sceneIndex + 1).padStart(2, '0')} / {String(totalScenes).padStart(2, '0')}
          </div>
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
              transform: `translateY(${cardSlide}px)`,
              opacity: textEntrance,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 20px',
                border: `2px solid ${palette.accent}`,
                background: palette.soft,
                color: palette.accent,
                fontFamily: '"Apple SD Gothic Neo", sans-serif',
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 24,
              }}
            >
              {kicker}
            </div>
            <h1
              style={{
                fontFamily: '"Apple SD Gothic Neo", "SF Pro Display", sans-serif',
                fontSize: 78,
                lineHeight: 1.08,
                margin: '0 0 24px 0',
                fontWeight: 800,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontFamily: '"Apple SD Gothic Neo", "SF Pro Display", sans-serif',
                fontSize: 33,
                lineHeight: 1.5,
                color: 'rgba(247, 241, 232, 0.92)',
                margin: '0 0 30px 0',
              }}
            >
              {body}
            </p>

            <div style={{display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28}}>
              {highlights.map((item, index) => (
                <div
                  key={item}
                  style={{
                    border: `2px solid ${palette.accent}`,
                    background: 'rgba(247, 241, 232, 0.05)',
                    padding: '12px 16px',
                    fontFamily: 'Menlo, monospace',
                    fontSize: 21,
                    color: '#f7f1e8',
                    opacity: interpolate(frame, [index * 6, 40 + index * 8], [0.25, 1], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    }),
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
              <div
                style={{
                  border: `2px solid ${palette.accent}`,
                  background: palette.soft,
                  padding: 22,
                }}
              >
                <div
                  style={{
                    fontFamily: 'Menlo, monospace',
                    fontSize: 20,
                    color: palette.accent,
                    marginBottom: 10,
                    textTransform: 'uppercase',
                  }}
                >
                  Judge Focus
                </div>
                <div
                  style={{
                    fontFamily: '"Apple SD Gothic Neo", sans-serif',
                    fontSize: 28,
                    lineHeight: 1.35,
                    color: '#f7f1e8',
                  }}
                >
                  {judgeFocus}
                </div>
              </div>
              <div
                style={{
                  border: '2px solid rgba(247, 241, 232, 0.18)',
                  background: 'rgba(247, 241, 232, 0.06)',
                  padding: 22,
                }}
              >
                <div
                  style={{
                    fontFamily: 'Menlo, monospace',
                    fontSize: 20,
                    color: '#f7d64a',
                    marginBottom: 10,
                    textTransform: 'uppercase',
                  }}
                >
                  Evidence
                </div>
                <div
                  style={{
                    fontFamily: '"Apple SD Gothic Neo", sans-serif',
                    fontSize: 28,
                    lineHeight: 1.35,
                    color: '#f7f1e8',
                  }}
                >
                  {evidence}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: 'relative',
              border: `8px solid ${palette.accent}`,
              boxShadow: `0 24px 64px ${palette.glow}`,
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
            <div
              style={{
                position: 'absolute',
                top: 22,
                left: 22,
                border: `2px solid ${palette.accent}`,
                background: 'rgba(23, 19, 20, 0.74)',
                padding: '12px 16px',
                fontFamily: 'Menlo, monospace',
                fontSize: 20,
                color: '#f7f1e8',
              }}
            >
              {routeLabel}
            </div>
            <div
              style={{
                position: 'absolute',
                right: 22,
                bottom: 22,
                border: '2px solid rgba(247, 241, 232, 0.18)',
                background: 'rgba(23, 19, 20, 0.78)',
                padding: '12px 16px',
                fontFamily: '"Apple SD Gothic Neo", sans-serif',
                fontSize: 21,
                color: '#f7f1e8',
              }}
            >
              공개 검수 + 제출 설명용 still
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 32,
            gap: 24,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 12,
              border: '2px solid rgba(247, 241, 232, 0.18)',
              background: 'rgba(247, 241, 232, 0.06)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressWidth}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${palette.accent} 0%, #f7f1e8 100%)`,
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'Menlo, monospace',
              fontSize: 21,
              color: 'rgba(247, 241, 232, 0.78)',
            }}
          >
            daykervibe.vercel.app
          </span>
          <span
            style={{
              fontFamily: 'Menlo, monospace',
              fontSize: 21,
              color: 'rgba(247, 241, 232, 0.78)',
            }}
          >
            github.com/kimjuyoung1127/daykervibe
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 96,
            right: 96,
            bottom: 132,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
            opacity: subtitleOpacity,
          }}
        >
          <div
            style={{
              maxWidth: 1160,
              width: '100%',
              border: '2px solid rgba(247, 241, 232, 0.14)',
              background: 'rgba(9, 8, 10, 0.82)',
              boxShadow: '0 18px 40px rgba(0, 0, 0, 0.35)',
              padding: '18px 30px',
              textAlign: 'center',
              backdropFilter: 'blur(8px)',
            }}
          >
            {subtitle.map((line, index) => (
              <div
                key={`${line}-${index}`}
                style={{
                  fontFamily: '"Apple SD Gothic Neo", "SF Pro Display", sans-serif',
                  fontSize: 31,
                  fontWeight: index === 0 ? 700 : 500,
                  lineHeight: 1.34,
                  color: index === 0 ? '#f7f1e8' : 'rgba(247, 241, 232, 0.88)',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.45)',
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
