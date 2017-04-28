import React, { Component } from 'react'
import PropTypes from 'prop-types'

function datetimeConvert(UTCDate) {
  const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  }
  const date = new Date(Date.parse(UTCDate))
  return Intl.DateTimeFormat('zh-CN', options).format(date)
}

class HouseStatus extends Component {
  render() {
    const { housingInfo } = this.props
    
    return (
      <div className="house-status">
        <div className="house-status__header">
          <div className="house-status__check-time">核验时间：{ datetimeConvert(housingInfo.verificationTime) }</div>
          <div className="house-status__check">
            <div className="house-status__check-headpic"><img src="../public/building.png" alt="头像"/></div>
            <div className="house-status__check-number">
              <p className="label">核验编号</p>
              <p className="number">210388281999983</p>
            </div>
          </div>
        </div>
        <div className="house-status__house-info">
          <div className="house-status__house-detail">
            <div className="house-status__type">房屋用途：{ housingInfo.houseUse }</div>
            <div className="house-status__address"><i></i>{ housingInfo.district }</div>
            <div className="house-status__detail">
              <p className="house-status__name">{ housingInfo.compoundName }</p>
              <p className="house-status__area">{ housingInfo.buildingArea} <span>平米</span></p>
            </div>
            <div className="house-status__floor"><i></i>所在{ housingInfo.locationLayer}层/总共{ housingInfo.totalLayers }层</div>
          </div>
        </div>
        <div className="house-status__all-status">
          <div className="house-status__status-title">
            <i></i>
            <div className="title">以下状态都为当前即时状态</div>
          </div>
          <ul className="house-status__status-types">
            <li>
              <div className="house-status__status-type">抵押状态：</div>
              <div className="house-status__status">{ housingInfo.isMortgaged }</div>
            </li>
            <li>
              <div className="house-status__status-type">锁定状态：</div>
              <div className="house-status__status">{ housingInfo.status ? '未锁定': '已锁定'}</div>
            </li>
            <li>
              <div className="house-status__status-type">限制状态：</div>
              <div className="house-status__status">{ housingInfo.isRestricted }</div>
            </li>
            <li>
              <div className="house-status__status-type">查封状态：</div>
              <div className="house-status__status">{ housingInfo.isSealUp }</div>
            </li>
            <li>
              <div className="house-status__status-type">权属状态：</div>
              <div className="house-status__status">{ housingInfo.isHaveRight }</div>
            </li>
            <li>
              <div className="house-status__status-type">出租状态：</div>
              <div className="house-status__status">{ housingInfo.isLeased ? housingInfo.isLeased : '未知' }</div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

HouseStatus.propTypes = {
  housing: PropTypes.object
}

export default HouseStatus
