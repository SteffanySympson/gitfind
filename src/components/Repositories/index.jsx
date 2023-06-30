import React from 'react';
import './styles.css';

function Repositories({title, description}) {
  return (
    <div className="repositoryItem">
        <strong> {title} </strong>
        <p> { description } </p>
        <hr/>
    </div>
  )
}

export default Repositories