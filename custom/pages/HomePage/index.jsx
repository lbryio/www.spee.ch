import React from 'react';
import { NavBar } from 'spee.ch-components';

class HomePage extends React.Component {
  render () {
    return (
        <div className={'row row--tall flex-container--column'}>
            <NavBar />
            <div className={'row row--tall row--padded flex-container--column'}>
                <h2>Welcome to billbitt.spee.ch!</h2>
                <p>Check out my custom about page</p>
                <a href={'https://github.com/lbryio/spee.ch#speech-as-a-package'}>And make your own site!</a>
            </div>
        </div>
    );
  }
};

export default HomePage;
