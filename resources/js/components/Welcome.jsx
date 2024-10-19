import TextUI from './UIcomponents/Typography';
import React, { useEffect, useState } from 'react';

const Welcome = () => {
  const [displayedText, setDisplayedText] = useState('');
  const message = 'Weelcome to Gamer';

  useEffect(() => {
    
    let index = 0;

    const intervalId = setInterval(() => {
        if (index < message.length-1) {
            setDisplayedText((prev) => prev + message[index]);
            index++;
        } else {
            clearInterval(intervalId);
        }
    }, 300);
    
    return () => {
        clearInterval(intervalId)
    }
  }, []);

  return (
    <div className='fade-in-body'>
      <TextUI variant="h2" component="div" className="text-center mt-6 text-white z-index-5">
         {displayedText}
     </TextUI>
    </div>
  );
};

export default Welcome;




