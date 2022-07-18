import React from 'react';
import Lottie from 'react-lottie';
import notFoundAnimation from "../animations/notFound.json"
function PageNotFound() {
      const QuizResult = {
        loop: true,
        autoplay: true,
        animationData: notFoundAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
  return (
    <div  style={{height:'80%'}}>
              <Lottie options={QuizResult} /> 
    </div>
  )
}

export default PageNotFound