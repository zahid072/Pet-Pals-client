import React from 'react'
import { useParams } from 'react-router-dom'

const BrowseCategory = () => {
    const {petName}= useParams()
  return (
    <div>
      <h1>{petName}</h1>
    </div>
  )
}

export default BrowseCategory
