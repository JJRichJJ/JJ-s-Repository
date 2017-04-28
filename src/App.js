import React, { Component } from 'react';

import HouseStatus from './HouseStatus'
import NoResult from './NoResult'
import getDrupalApiInstance from './DrupalApi'

import './style.css'

import HourGlass from './assets/hourglass.svg'

const api = getDrupalApiInstance()

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      housingInfo: {},
      loaded: false
    }
  }
  
  componentDidMount() {
    api.fetchHousingVerification(getParameterByName('vcode')).then((json) => {
      this.setState({
	housingInfo: json,
	loaded: true
      })
    }).catch((error) => {
      console.error(error)
    })
  }
  
  render() {
    const { housingInfo, loaded } = this.state
    
    let content = <div className="loading"><img src={ HourGlass } />正在努力加载数据...</div>

    if (loaded) {
      if (housingInfo.existence) {
	content = <HouseStatus housingInfo={housingInfo} />
      }
      else {
	content = <NoResult />
      }
    }
    
    return (
      <div>
	{content}
      </div>
    )
  }
}
