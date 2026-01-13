import React from 'react';

export default function Editor({ handleClose }) {
  return (
    <div>
      <textarea rows={1} cols={10}></textarea>
      <button onClick={handleClose}>Закрыть</button>
    </div>
  );
}
