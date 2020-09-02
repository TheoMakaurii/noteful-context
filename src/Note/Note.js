import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import config from '../config'
import ApiContext from '../ApiContext'
import './Note.css'



export default class Note extends React.Component {
  static contextType = ApiContext

   deleteNote= (id, callback) => {

    fetch(`${config.API_ENDPOINT}notes`,
    {method: 'DELETE'}
    )
    .then(res => {
      if (!res.ok){
        throw Error
      }
      return res.json()
    })
    .then(data => {
      console.log( "data", data)
    })
    .catch(error => {
      console.error(error)
    })
  } 
  render(){
     const {id, name, modified} = this.props
      console.log("Heey", this.context)
      console.log("Hello", this.props)
  return (
   
    <div className='Note'>

      <h2 className='Note__title'>
        <Link to={`/note/${id}`}>
          {name}
        </Link>
      </h2>
      <button className='Note__delete' type='button'
      onClick={()=> {
        this.deleteNote(
          id,
          this.context.handleDelete
        )
      }}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
      </div>
      
   
   
  )}
}