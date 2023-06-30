import { Header } from "../../components/Header";
import { useState } from "react";
import background from '../../assets/background.png';
import './styles.css';
import Repositories from '../../components/Repositories';

function App() {

  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name) {
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length > 0) {
        setRepos(newRepos);
      }
    }

    console.log(newUser);
  }

  return (
    <div className="App">
      <Header />
      <div className="content">
        <img className="background" alt="background app" src={background} />
        <div className="informations">
          <div>
            <input name="user"
            value={user} 
            onChange={event => setUser(event.target.value)}
            className="userInput" 
            placeholder="@username" />
            
            <button onClick={handleGetData} className="button">Buscar</button>
          </div>

          {currentUser?.name ? (
            <>
              <div className="profile">
                <img src={currentUser.avatar_url} className="profileImage" alt="profile"/>
                <div>
                  <h3>{currentUser.name} </h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr/>
            </>
          ): null}
          
          {repos?.length ? (
            
            <>
            <div className="repositories">
              <h2> Repositórios </h2>
              {repos.map(repo => (
              <Repositories title={repo.name}description={repo.description} />
            ))}

            </div>
          </>
          ): null}
          
        </div>
      </div>
    </div>
  );
}

export default App;
