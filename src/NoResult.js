import React, { Component } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import './style.css'

class NoResult extends Component {
  render() {
    return (
      <div className="no-result">
          <div className="no-result__tips">
              <p>房源已下架或者</p>
              <p>您扫描了一个假的房源二维码</p>
          </div>
      </div>
    )
  }
}


export default NoResult
