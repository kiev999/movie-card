import React from 'react'
import { useParams , Link } from 'react-router-dom'

const Trailer = ({movie}) => {
    const {id} = useParams()
    const foundMovie = movie.find((el)=> el.id === +id)
  return (
    <div>
      <h2>{foundMovie.title}</h2>
      <p>{foundMovie.description}</p>

      <iframe width="560" height="315" src={foundMovie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <Link to="/"><button
>Back Home</button> </Link>
    </div>
  )
}

export default Trailer
