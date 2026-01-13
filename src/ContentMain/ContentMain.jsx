import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './ContentMain.scss';

function AllFiles({setFileName}) { // компонент для отображения списка всех файлов
  const [files, setFiles] = useState([]); //текущее состояние для списка файлов

  useEffect(() => { 
    const fetchData = async () => { // функция для получения данных с сервера
      try {
        const response = await fetch('http://localhost:8081/api/all_files');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFiles(data); // обновление состояния списка файлов
      } catch (error) {
        console.error('Error:', error);
      }
    };
    setFileName("Theme") 
    fetchData(); // вызов функции для получения данных 
  }, []); // пустой массив => эффект выполнится 1 раз

  return (
    <section className="content__main">
      <ul className="content__list">
        {files.map((file, index) => ( // проход по массиву файлов и создание элементов списка
          <li key={index} className="main_content-items"> 
            <Link className="main_content-links" to={`/${file}`}> 
              {file}
            </Link> 
          </li> //Link = создание ссылки на маршрут в виде /имя_файла
        ))}
      </ul>
    </section>
  );
} 

function FileContent({ setFileName }) { // компонент для отображения содержимого выбранного файла
  const filename = window.location.pathname; // получение имени файла из URL
  const [content, setContent] = useState(''); // состояние для содержимого файла
 
  useEffect(() => {
    const fetchFileContent = async () => { // функция для получения содержимого файла с сервера
      try {
        const response = await fetch(`http://localhost:8081/api/file${filename}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.text(); // получение текста файла
        
        const cleanedData = data.replace(/^["']|["']$/g, ''); // удаление кавычек в начале и конце строки
        
        const markdownText = cleanedData
        .replace(/\\t/g, '\t')
        .replace(/\\n/g, '\n');
        
        setContent(markdownText); // обновление состояния с содержимым файла
      } catch (error) {
        console.error('Error:', error);
      }
    };
    setFileName(decodeURI(filename)) //передает родителю читаемое имя текущего файла, полученное из URL
    fetchFileContent();
  }, []);

  return (
    <div className="file-content">
      <ReactMarkdown>{content}</ReactMarkdown> 
    </div>
  );
}

export default function MainContent({ setFileName }) { //компонент для маршрутизации между списком файлов и содержимым файла
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllFiles setFileName={setFileName} />} /> 
        <Route path="/:filename" element={<FileContent setFileName={setFileName} />} /> 
      </Routes>
    </Router>
  );
}