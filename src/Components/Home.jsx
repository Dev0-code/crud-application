
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [localData, placeholderData] = await Promise.all([
          axios.get("http://localhost:3000/posts"),
          axios.get("https://jsonplaceholder.typicode.com/posts?_limit=7"),
        ]);

        const combinedData = [...localData.data, ...placeholderData.data];
        setData(combinedData);
        setRecords(combinedData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Would you like to Delete?");
    if (confirm) {
      try {
        const isLocalData = data.find(item => item.id === id && item.ptitle);
        if (isLocalData) {
          await axios.delete(`http://localhost:3000/posts/${id}`);
        } else {
          await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        }
        setData(data.filter(item => item.id !== id));
        setRecords(records.filter(item => item.id !== id)); // Update records
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filter = (event) => {
    const searchText = event.target.value.toLowerCase();
    setRecords(data.filter(item => (item.ptitle || item.title).toLowerCase().includes(searchText)));
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center w-100 bg-light vh-100 py-4">
        <div className="w-75 rounded bg-white border shadow p-4">
          <div className="d-flex justify-content-between">
            <h3>List Table</h3>
            <input type="text" className='form-control me-2' placeholder="Search..." style={{width:"200px"}} onChange={filter} />
            <Link to="/create" className="btn btn-success">Add list+</Link>
          </div>
          {loading ? (
            <div className="text-center">
              <i className="fa-solid fa-spinner fa-spin fa-7x" style={{ color: 'black' }}></i>
              <h4 className="pt-2" style={{ color: 'black' }}>Loading</h4>
            </div>
          ) : (
            <table className="table table-hover table-striped-columns table-bordered py-2 my-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Topic</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((d, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{d.title || d.ptitle}</td>
                      <td>{d.body || d.pbody}</td>
                      <td>
                        <Link to={`/read/${d.id}`} className="btn btn-sm btn-warning me-2"><i className="fa-solid fa-eye" /></Link>
                        <Link to={`/update/${d.id}`} className="btn btn-sm btn-primary my-2"><i className="fa-regular fa-pen-to-square" /></Link>
                        <button onClick={() => handleDelete(d.id)} className="btn btn-sm btn-danger"><i className="fa-solid fa-trash" /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
