import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';

import BallPaint from '@/Paints/BallPaint';

const App = () => {
  // const [visible, setVisible] = React.useState(false);

  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        placeContent: 'center',
        width: '100vw',
        height: '100vh',
        background: '#f5f5f5',
        padding: 16,
      }}
    >
      <div
        key="first-paint"
        style={{
          width: 400,
          height: 400,
          borderRadius: 4,
          background: '#fff',
        }}
        // onClick={() => setVisible(!visible)}
      >
        {/* {visible && <BouncingBall />} */}
        <BallPaint />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
