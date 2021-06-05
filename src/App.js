import React from 'react';

import './App.css';
import { Route, Switch } from 'react-router-dom';
import Users from './components/users';
import Albums from './components/albums';
import Photos from './components/photos';
import DetailPhoto from './components/detailPhoto';
import DetailUser from './components/detailUser';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Users} />
        <Route path='/:userId/' component={DetailUser} />
        <Route path='/:userId/albums/' component={Albums} />
        <Route path='/:userId/albums/:albumId/photos/' component={Photos} />
        <Route path='/:userId/albums/:albumId/photos/:photoId' component={DetailPhoto} />
      </Switch>
    </div>
  );
}

export default App;
