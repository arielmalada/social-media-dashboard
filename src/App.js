import React from 'react';

import './styles/index.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Users from './pages/users/';
import DetailUser from './pages/detailUser/';
import DetailPost from './pages/detailPost/';
import AlbumDetail from './pages/albumDetail';
import DefaultLayout from './layouts/default';

function App() {
  return (
    <DefaultLayout>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Users} />
          <Route exact path='/:userId' component={DetailUser} />
          <Route path='/:userId/post/:postId/' component={DetailPost} />
          <Route exact path='/:userId/albums/:albumsId' component={AlbumDetail} />
        </Switch>
      </BrowserRouter>
    </DefaultLayout>
  );
}

export default App;
