import React, {ReactElement} from 'react';
import {Button} from 'semantic-ui-react';

// styles
import './style.scss';

// images
import Logo from '../../../assets/images/logo.svg';

export default function Home(props: any): ReactElement {
  // use effects
  React.useEffect(() => {
    document.title = 'Reddit Client';
    localStorage.setItem('entered', 'false');
  }, []);

  // custom functions
  const handleEnterApp = () => {
    localStorage.setItem('entered', 'true');
    props.history.push('/dashboard');
  };

  return (
    <div id="home">
      <div className="center-content">
        <img src={Logo} alt="logo" />
        <h1>Welcome to Reddit Client App</h1>
        <p>Feel free to enter the app.</p>
        <Button onClick={handleEnterApp} className="button">
          Enter
        </Button>
      </div>
    </div>
  );
}
