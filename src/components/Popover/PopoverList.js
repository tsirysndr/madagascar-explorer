import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class PopoverList extends Component {

  componentDidMount() {
    this.refs.iScroll.addEventListener('scroll', () => {
      if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight) {
        this.props.handleUpdate()
      }
    })
  }

  render() {
    const { 
      filter,
      loading,
      error,
      data,
      history,
    } = this.props
    return (
      <div ref="iScroll" style={{ overflow: 'auto' }}>
        {
          filter === 1 && !loading && !error && (
            <ul className='popover-list'>
              <li>
                {
                  data.search.regions.map((item, index) => (
                    <a href={`#!/regions/${item.id}`} className='item' key={index}>
                      {item.name}
                    </a> 
                  ))
                }
              </li>
            </ul>
          )
        }
        {
          filter === 2 && !loading && !error && (
            <ul className='popover-list'>
              <li>
                {
                  data.search.districts.map((item, index) => (
                    <div className='item' key={index} onClick={() => history.push(`/districts/${item.id}`)}>
                      <a href={`#!/districts/${item.id}`}>
                        {item.name}
                      </a>
                      <div>{item.region}</div>
                    </div>
                  ))
                }
              </li>
            </ul>
          )
        }
        {
          filter === 3 && !loading && !error && (
            <ul className='popover-list'>
              <li>
                {
                  data.search.communes.map((item, index) => (
                    <div className='item' key={index} onClick={() => history.push(`/communes/${item.id}`)}>
                      <a href={`#!/communes/${item.id}`}>
                        {item.name}
                      </a> 
                      <div>{item.district} &middot; {item.region}</div> 
                    </div>
                  ))
                }
              </li>
            </ul>
          )
        }
        {
          filter === 4 && !loading && !error && (
            <ul className='popover-list'>
              <li>
                {
                  data.search.fokontany.map((item, index) => (
                    <div className='item' key={index} onClick={() => history.push(`/fokontany/${item.id}`)}>
                      <a href={`#!/fokontany/${item.id}`}>
                        {item.name}
                      </a>
                      <div>{item.commune} &middot; {item.district} &middot; {item.region}</div> 
                    </div>
                  ))
                }
              </li>
            </ul>
          )
        }
      </div>
      
    )
  }
}

export default withRouter(PopoverList)