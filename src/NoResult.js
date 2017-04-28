import React, { Component } from 'react'

class NoResult extends Component {
  render() {
    return (
      <div className="no-result">
        <img src="../public/icon_none.png" alt=""/>
        <div className="no-result__tips">
          <p>房源已下架或者</p>
          <p>您扫描了一个假的房源二维码</p>
        </div>
      </div>
    )
  }
}

export default NoResult
