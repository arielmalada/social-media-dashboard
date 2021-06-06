import React from 'react';

import './styles/index.scss';
import { Route, Switch } from 'react-router-dom';
import Users from './components/users/';
import Albums from './components/albums/';
import DetailPhoto from './components/detailPhoto';
import DetailUser from './components/detailUser/';
import DetailPost from './components/detailPost/';
import AlbumDetail from './components/albumDetail/';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Users} />
        <Route exact path='/:userId' component={DetailUser} />
        <Route path='/:userId/post/:postId/'component={DetailPost}/>
        <Route exact path='/:userId/albums/' component={Albums} />
        <Route exact path='/:userId/albums/:albumsId' component={AlbumDetail} />
        <Route path='/:userId/albums/:albumId/photos/:photoId' component={DetailPhoto} />
      </Switch>
    </div>
  );
}

export default App;
