import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom'
function Create() {

  const [values, setValues] = useState({
    ptitle : '',
    pbody : ''
  })

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/posts', values)
    .then(res => {
      console.log(res.data)
      navigate('/')
      .catch(err => console.log(err))
    })
  }

  return (
    <>
     
     <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div className='w-75 border bg-white shadow p-5  rounded'>
          <h1>Add list </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="title">Topic</label>
              <input type="text" name='title' required onChange={e => setValues({...values, ptitle : e.target.value})} className='form-control' placeholder='Enter topic'/>
            </div>
            <div className="mb-2">
              <label htmlFor="body">Details :</label>
              <input type="text" name='body' required onChange={e => setValues({...values, pbody : e.target.value})} className='form-control' placeholder='Enter details'/>
            </div>
           
            <button className='btn btn-success me-2'>Submit</button>
            <Link to='/' className='btn btn-primary'>Back</Link>
          </form>
        </div>
      </div>
     
    </>
  )
}

export default Create
