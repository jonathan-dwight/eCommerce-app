import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'

import HomePage from './pages/homepage/homepage' //pages folder is non reusuable components
import ShopPage from './pages/shop/shop'
import Header from './components/header/header';


function App() {
  return (
    <div>
      <Header />
      <Switch> 
        <Route exact path ="/shop/" component ={ShopPage} />
        <Route exact path ="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
