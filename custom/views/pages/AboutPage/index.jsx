import React from 'react';
import { NavBar } from 'spee.ch-components';
import TestTest from 'test/TestTest';

class AboutPage extends React.Component {
  render () {
    return (
        <div>
            <NavBar />
           <TestTest />
            <div className='row row--padded'>
                <h3>Welcome to your custom about page!</h3>
                <p>This is an example of how you can create your own custom pages to replace the default spee.ch pages...</p>
            </div>
        </div>
    );
  }
};

export default AboutPage;
