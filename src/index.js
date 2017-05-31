import React from 'react';
import { render } from 'react-dom';
import { App } from './App';

async function mainRender() {
  render(<App />, document.getElementById('main'));
}


mainRender()
