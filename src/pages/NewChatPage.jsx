
import * as React from 'react';
import { MidjourneySlider } from '../components/MidjourneySlider';

export const NewChatPage = () => {

  const [text, setText] = React.useState('')
  return (
    <div className="mainNewChatPage">
        <MidjourneySlider text={text} setText={setText}/>
    </div>
  );
};