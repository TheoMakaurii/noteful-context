import React from 'react'
import ApiContext from '../ApiContext'
import Note from '../Note/Note'
import {findNote} from '../notes-helpers'
import './NotePageMain.css'


export default function NotePageMain(props) {
  const noteId= props.match.params.noteId

  return (

    <section className='NotePageMain'>
      <ApiContext.Consumer>
      {(context)=> {
        const note= findNote(context.notes, noteId)
        return(
        <>
        <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
        />
        <div className='NotePageMain__content'>
      {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
        </>)
      }}
      
      </ApiContext.Consumer>
    </section>
  )
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
