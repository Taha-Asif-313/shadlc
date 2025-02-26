import React from "react";

interface EmbedVideoProps {
    embedUrl: string;
  }
  
 export const EmbedVideo : React.FC<EmbedVideoProps>= ({ embedUrl }) => {
    return (
      <div className="relative w-full pb-[56.25%]">
        <iframe
          src={embedUrl}
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    );
  };

  