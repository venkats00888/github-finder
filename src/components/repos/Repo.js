import React from 'react'

const Repo = ({repo}) => {
  
    return (
        <div className="card">
               <a href={repo.html_url}>{repo.name}</a>
        </div>
    )
}
export default Repo;