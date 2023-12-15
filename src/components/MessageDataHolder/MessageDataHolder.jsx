import React, { useState } from 'react';
import MessageAdd from './MessageAdd';
import MessageMidjorney from './MessageMidjorney';

const MessageDataHolder = () => {
    const [gptResult, setGptResult] = useState('');

    const updateGptResult = (result) => {
        setGptResult(result);
    };

    return (
        <div>
            <MessageAdd updateGptResult={updateGptResult} />
            <MessageMidjorney gptResult={gptResult} />
        </div>
    );
};

export default MessageDataHolder;