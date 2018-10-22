import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {connect, Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {reducer} from './11-redux-reducer.js';
import {fetchPeople, savePeople} from './11-redux-actions.js';

import Form from './11-redux-form.js';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const ReduxForm = connect(mapStateToProps, mapDispatchToProps)(Form);

export default class Eleven extends React.Component {
  static displayName = '11-redux-app';

  componentDidMount() {
    store.dispatch(fetchPeople());
  }

  render() {
    return (
      <Provider store={store}>
        <ReduxForm />
      </Provider>
    );
  }
};

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    fields: state.person,
    people: state.people,
    saveStatus: state.saveStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: people => {
      dispatch(savePeople(people));
    }
  };
}
