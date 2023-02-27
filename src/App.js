import React from 'react';

import './styles/index.scss';
import { Route, Switch } from 'react-router-dom';
import Users from './pages/users/';
import DetailUser from './pages/detailUser/';
import DetailPost from './pages/detailPost/';
import AlbumDetail from './pages/albumDetail';
import DefaultLayout from './layouts/default';
import Page404 from './404';

function App() {
  return (
    <DefaultLayout>
      <Switch>
      <Route exact path='/' component={Users} />
        <Route exact path='/user/:userId' component={DetailUser} />
        <Route path='/user/:userId/post/:postId/' component={DetailPost} />
        <Route exact path='/user/:userId/albums/:albumsId' component={AlbumDetail} />
        <Route path='*' exact component={Page404} />
      </Switch>
    </DefaultLayout>
  );
}

export default App;
