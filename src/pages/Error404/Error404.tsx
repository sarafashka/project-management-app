import React from 'react';
import './Error404.scss';
import Error404Svg from './Error404svg';

const Error404: React.FC = () => {
  return (
    <div className="error404">
      <Error404Svg />
      <div className="message-box">
        <h1>404</h1>
        <p>Page not found</p>
        <div className="buttons-con">
          <div className="action-link-wrap">
            {/*<a onClick="history.back(-1)" className="link-button link-back-button">*/}
            {/*  Go Back*/}
            {/*</a>*/}
            {/*<a href="" className="link-button">*/}
            {/*  Go to Home Page*/}
            {/*</a>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
