import React, { useState } from 'react';
import Editor from '../Editor';
import './Header.scss'

export default function Header({ fileName }) {
    const [isEditMode, setEditMode] = useState(false);

    const handleReadClick = () => setEditMode(false);
    const handleEditClick = () => setEditMode(true);

    const handleEditorClose = () => setEditMode(false);

    return (
        <section className="content__header">
            <h1 className="content__title">{fileName}</h1>
            <nav className="content__nav">
                <button className="content__button content__button--regular" type="button" aria-label="Save" disabled>
                    Save
                </button>
                <a className="content__link content__link--versions" aria-label="Versions" disabled>
                    Versions
                </a>
                <div>
                    <button
                        className="toggle-button"
                        type="button"
                    >
                        <span className={`button-half left-half ${!isEditMode ? 'active' : ''}`} onClick={handleReadClick}>Read</span>
                        <span className={`button-half right-half ${isEditMode ? 'active' : ''}`} onClick={handleEditClick}>Edit</span>
                    </button>
                </div>
            </nav>

            {isEditMode && <Editor handleClose={handleEditorClose} />}
        </section>
    );
};