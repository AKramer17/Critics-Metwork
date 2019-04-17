import React, { Component } from 'react'
import { Input, Col, Row, Button } from 'antd'
import { Redirect } from 'react-router-dom'
import './SearchForm.css'
import 'antd/dist/antd.css'; 
import Api from '../Services/dataService'
import uuidv4 from 'uuid/v4'
import CardTemplate from '../CardTemplate/CardTemplate'


export default class SearchForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      fireRedirect: false,
      results: []
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ fireRedirect: true })
  }

  handleApiCall (props) {
    Api.getMovies("now_playing")
          .then(data => {
            this.setState({
              results: data.results
            })
          })

  }
  
  componentDidMount () {
    this.handleApiCall(this.props)
    console.log(this.props)
  }

  render () {
    const { fireRedirect, value: query } = this.state
    return (
      <React.Fragment>
      <Row>
        <Col span={14} offset={5}>
          <form onSubmit={this.handleSubmit}>
            <Input className='input' placeholder='Search a film...' onChange={this.handleChange} />
            <Button type="primary" icon="search" onClick={this.handleSubmit}>Search</Button>
          </form>
        </Col>
        {
        fireRedirect && query &&
        <Redirect to={`/search/${query}`} push />
        }
        
      </Row>

      <Row gutter={24}>
          {
            this.state.results.map(film => {
              return (
                <Col className='gutter-row' span={5} offset={1} key={uuidv4()}>
                  <CardTemplate
                    name={film.title}
                    date={film.release_date}
                    vote={film.vote_average}
                    image={film.poster_path}
                    id={film.id}
                  />
                </Col>
              )
            })
          }
        </Row>

        </React.Fragment>
      
    )
  }
}
