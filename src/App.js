import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
      .catch(err => console.error(err))
    event.target.reset();

  }

  return (
    <div className="App">
      <h2>users:{users.length}</h2>

      <form onSubmit={handleAddUser} >
        <input type="text" name="name" placeholder='name' />
        <br />
        <input type="email" name="email" id="" placeholder='email' />
        <br />
        <button type='submit'>submit</button>
      </form>

      {
        users.map(user => <p
          key={user._id}>{user.name} <br />{user.email}</p>)
      }
    </div>
  );
}

export default App;
