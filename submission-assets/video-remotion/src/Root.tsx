import {Composition} from 'remotion';
import {ExpeditionHubLongform} from './compositions/ExpeditionHubIntro';
import {longformTimeline} from './data/timeline';

export const Root = () => {
  return (
    <Composition
      id="ExpeditionHubLongform"
      component={ExpeditionHubLongform}
      durationInFrames={longformTimeline.totalFrames}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{timeline: longformTimeline, withAudio: false}}
    />
  );
};
