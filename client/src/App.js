import Header from './Header';
import About from './About'
import Footer from './Footer';
import Content from './Content';
import Nav from './Nav';
import {useState, useEffect} from 'react';
import apiRequest from './apiRequest'
import { Route, Routes} from 'react-router-dom'


function App() {
  const API_URL = 'http://localhost:3500/items'

  const [internships, setInternships] = useState([]);
  const [item, setItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async() => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error ('Did not receve expected data')
        const listItems = await response.json()
        setInternships(listItems)
        setFetchError(null)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false);
      }
    } 
    fetchItems()
  }, [])

  const handleDelete = async (id) => {
    const newInternships = internships.filter((internship) => (internship._id !== id));
    console.log(id)
    setInternships(newInternships);
    var raw = JSON.stringify({
      "id": id
    });
    const deleteOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: raw,
      redirect: 'follow'
    }
    const reqUrl = `${API_URL}`
    const result = await apiRequest(reqUrl, deleteOptions)
    if (result) setFetchError(result)
  }
  const addItem = async (internship) => {
    internship = internship.toLowerCase();
    const newInternship = {title: internship, checked: false, date : 'mm/dd'}
    setInternships([...internships, newInternship])
    var raw = JSON.stringify({
      "title": newInternship.title
    })
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: raw,
      redirect: 'follow'
    }
    const result = await apiRequest(API_URL, postOptions)
    if (result) setFetchError(result)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item) return;
    addItem(item);
    setItem('');
    window.location.reload();
  }
  const handleCheck = async (id) => {
    const listItems = internships.map((internship) => internship._id === id ? { ...internship, checked: !internship.checked } : internship);
    setInternships(listItems);
    const myItem = listItems.filter((internship) => internship._id === id);
    var raw = JSON.stringify({
      "id": id,
      "title": myItem[0].title,
      "checked": myItem[0].checked,

    });
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: raw,
      redirect: 'follow'
    }
    const reqUrl = `${API_URL}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
    console.log('checked')
  }
  
  return (
    <div className="App">
      <Routes>
        <Route path = "/">
          <Route index element = {
          <>
            <Header title = "internship tracker!"/>
            <Nav item = {item} setItem = {setItem} handleSubmit = {handleSubmit} search = {search} setSearch = {setSearch}/>
            <Content internships = {internships.filter((internship) => ( (internship.title).includes(search)))} setInternships = {setInternships} handleDelete = {handleDelete} handleCheck = {handleCheck} isLoading = {isLoading && <p>Loading Items...</p>} error = {fetchError && <p style = {{ color : "red"}}> {`Error: ${fetchError}`}</p>}/></>}/>
          <Route path = "about" element = {<About />}/>
        </Route>
      </Routes>
    
      <Footer internships = {internships.filter((internship) => internship.title !== "test")}/>
    </div>
  );
}

export default App;
