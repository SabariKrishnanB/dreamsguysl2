import React,{Component} from 'react';
import {Link,Switch,Routes,Route,BrowserRouter} from 'react-router-dom';
import FavoriteUsers from './actions/FavoriteUsers';
import Main from './actions/Main';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
      <Routes>
        <Route exact path="/favoritespage" element={<FavoriteUsers/>}>        
        </Route>
        <Route exact path="/home" element={<Main/>}>        
        </Route>
        <Route exact path="/" element={<Main/>}>        
        </Route>
      </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
