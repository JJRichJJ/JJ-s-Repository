import React, { Component } from 'react';

import HouseStatus from './HouseStatus'
import NoResult from './NoResult'

import './style.css'

const API_URL = 'http://20.20.20.120/DataShare/api/HousingVerification/GetHousingInfoByCode?HousingVerificationGUID='

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
      housingInfo: {}
    }
  }
  
  componentDidMount() {
    fetch(API_URL + getParameterByName('vcode'), {
      headers: {
	'AppKey': '72f73ece-a58e-4bd1-abea-f6a4f2b08896',
	'AppSecret': '123456'
      }
    }).then((response) => {
      if (!response.ok) {
        Promise.reject(response)
      }
      return response.json()
    }).then((json) => {
      this.setState({
	housingInfo: json
      })
    }).catch((error) => {
      console.error(error)
    })
  }
  
  render() {
    const housingInfo = this.state.housingInfo
    
    let content = <div className="loading">Loading...</div>

    if (housingInfo) {
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
