import React, { useState } from 'react';
import './Header.scss'

export default function Header({ fileName }) {
    const [isEditMode, setEditMode] = useState(false);

    // const toggleEditMode = () => {
    //     setEditMode(!isEditMode);
    //     console.log("Вы нажали на кнопку ");
    // };

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
                <button
                    className="toggle-button"
                    type="button"
                    // onClick={toggleEditMode}
                >
                    <span className={`button-half left-half ${!isEditMode ? 'active' : ''}`} onClick={() => {if (isEditMode) setEditMode(false)}}>Read</span>
                    <span className={`button-half right-half ${isEditMode ? 'active' : ''}`} onClick={() => {if (!isEditMode) {setEditMode(true); console.log("Вы нажали на кнопку")}}}>Edit</span>
                </button>
            </nav>
        </section>
    );
};