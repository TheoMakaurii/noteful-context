import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import ApiContext from '../ApiContext'

export default function NotePageNav(props) {
  return (
    <div className='NotePageNav'>
      <ApiContext.Consumer>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {props.folder && (
        <h3 className='NotePageNav__folder-name'>
          {props.folder.name}
        </h3>
      )}
      </ApiContext.Consumer>
    </div>
  )
}


NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}
