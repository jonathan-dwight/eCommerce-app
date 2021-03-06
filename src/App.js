import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage' //pages folder is non reusuable components
import ShopPage from './pages/shop/shop'
import Header from './components/header/header';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import CheckOut from './components/checkout/checkout'
import { selectCurrentUser } from './selectors/user_selector';
import { createStructuredSelector } from 'reselect';

import { receiveUser } from './action/user_action'

import { auth, createUserProfileDocument } from './firebase/firebase.util'



const App = ({ currentUser, setCurrentUser }) => {
  
  
  useEffect(() => {
      //prevent memory leaks
      let unsubscribeFromAuth = null;
      unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //checking if database has been updated
  
        //will send us snapshot - getting data from the user/id comes with reg snapshot
        //.data method returns JSON object of the object
        //,exists returns a boolean if it exists
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            
          });
        })
      } else {
        setCurrentUser(userAuth)
      }
      
    });

    return () => {
      unsubscribeFromAuth()
    }
  }, [setCurrentUser]) 


  // observable -- wraps all the data streams
  // observer - 3 calls
  // next - do something with value
  // error - do something with error
  // complete - do something when finished
  // subscription ties obserer w/ listerner
  // we are subscribing to the event
  // autho.onAuthStateChanged - stream of events, we pass in function
  // async userAuth would be the next function.. we can also pass in the error
  // can have multiple observables 

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // };

    return (
      <div>
        <Header />
        <Switch> 
          <Route path ="/shop" component ={ShopPage} />
          <Route exact path ="/signin" render={() => 
            currentUser ? (
              <Redirect to='/' />
            ) : (
              <SignInAndSignUp />
            )
          } />
          <Route exact path ='/checkout' component={CheckOut} />
          <Route exact path ="/" component={HomePage} />
          <Redirect to ='/' />
        </Switch>
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => {
  return ({
    setCurrentUser: user => dispatch(receiveUser(user))
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
