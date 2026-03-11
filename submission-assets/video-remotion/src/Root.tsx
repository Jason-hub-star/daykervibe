import {Composition} from 'remotion';
import {ExpeditionHubIntro} from './compositions/ExpeditionHubIntro';
import {introTimeline} from './data/timeline';

export const Root = () => {
  return (
    <Composition
      id="ExpeditionHubIntro"
      component={ExpeditionHubIntro}
      durationInFrames={introTimeline.totalFrames}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{timeline: introTimeline}}
    />
  );
};
