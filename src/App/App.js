import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import config from './config'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: [],
        error:null
    };

    setNotes = notes =>{
        this.setState({
            notes,
            error: null
        })
    }

    setFolders = folders => {
        this.setState({
            folders,
            error: null
        })
    }
    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}notes`),
            fetch(`${config.API_ENDPOINT}folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));
  console.log("res",notesRes)
                return Promise.all([notesRes.json(), foldersRes.json()]);
              
            })
            .then(([notes, folders])=>{
                this.setNotes(notes)
                this.setFolders(folders)
            })
            .catch(error => {
                console.error({error});
            });

 
    }
    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );

    }

    renderMainRoutes() {
       
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component= {NoteListMain} 
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageMain} />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders
        };
        console.log("this is the value", value)
        return (
            <ApiContext.Provider value={value}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
