import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessageList from './flash/FlashMessageList';

export default class App extends React.Component {
     render() {
         return(
             <div className="container">
                 <NavigationBar />

                 {this.props.children}
             </div>
         );
     }
 }

