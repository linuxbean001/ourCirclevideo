import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AOS from "aos";
import "aos/dist/aos.css";

import './App.css';

import {Switch, Route, withRouter} from 'react-router-dom';
import { selectRemovedFromEvent } from './redux/eventAccess/eventAccess.selectors';
import { selectLoading, selectGeneralModal } from './redux/general/general.selectors';

import HomePage from './pages/HomePage/HomePage';
//import CreateEventPage from './pages/CreateEventPage/CreateEventPage';
import CreateEventPage from './pages/CreateEventPage/CreateEventPage';
import JoinEventPage from './pages/JoinEventPage/JoinEventPage';
import Header from './components/Header/Header';
import SignInOrSignUp from './pages/Sign-In-Or-Sign-Up/SignInOrSignUp';
import Account from './pages/Account/Account'
import IntermediaryPasswordCheck from './pages/IntermediaryPasswordCheck/IntermediaryPasswordCheck';
import Pricing from './pages/Pricing/Pricing';
import Test from './pages/Test/Test';
import RemovedFromSessionModal from './components/RemovedFromSessionModal/RemovedFromSessionModal';
import Loading from './components/Loading/Loading';
import GeneralModal from './components/GeneralModal/GeneralModal';


const App = ({removedFromEvent, loading, generalModal}) => {
// initialization
AOS.init();
  return (
    <div>
        <Header />
        <Switch>
          <Route exact path='/'
            render={(props) => (
              <HomePage
              {...props}
              />
            )} 
          />
          <Route path='/create'
            render={(props) => (
              <CreateEventPage
              {...props}
              />
            )} 
          />
          <Route path='/join'
            render={(props) => (
              <JoinEventPage
                {...props}
              />
            )}
          />
          <Route 
            path='/signin' 
            render={() => (
              <SignInOrSignUp />
            )}
          />
          <Route 
            path='/pricing' 
            render={() => (
              <Pricing />
            )}
          />
          <Route 
            path='/account' 
            render={(props) => (
              <Account
                {...props}
              />
            )}
          />
          <Route 
            path='/session/:sessionId' 
            render={(props) => (
              <IntermediaryPasswordCheck
                {...props}
              />
            )}
          />
          <Route exact path='/test' component={Test} />
        </Switch>
        {
          removedFromEvent.removed &&
          <RemovedFromSessionModal />
        }
        {
          loading &&
          <Loading />
        }
        {
          generalModal.active &&
          <GeneralModal />
        }
      </div>
  )
}

const mapStateToProps = createStructuredSelector({
  removedFromEvent: selectRemovedFromEvent,
  loading: selectLoading,
  generalModal: selectGeneralModal
})

export default withRouter(connect(mapStateToProps)(App));