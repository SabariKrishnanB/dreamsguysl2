
import React, { Component,useState,useMemo } from 'react';
import  '../App.css';
import App from '../App';
import { connect } from 'react-redux'
import { fetchData, ManageFav, SearchTerm } from './actions'
import {Link} from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

class Main extends Component {

  state = {
    loading: true,
    isFav:false,
    favusers:[],
    search:"",
    perPage:3,
    currentPage:1,
    offset: 0
  };

  componentDidMount() {    

    this.props.onFetchData()
    this.fakeRequest().then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove();  // removing the spinner element
        this.setState({ loading: false }); // showing the app
      }
    });
  }

  fakeRequest = () => {
    return new Promise(resolve => setTimeout(() => resolve(), 2500));
  };
  
  onClickk=(id)=>{
      this.props.ManageFav(id, this.props.data)
  }

  onChangeSearchInput=e=>{
     this.props.SearchTerm(e.target.value.toLowerCase(), this.props.data)
  }


  handlePagination = (e, page) => {
    this.setState({currentPage: page})
  }

  render() {
    if (this.state.loading) {
      return null; 
    }

    return (  
      <div className="App">
        <div className='container'>
         <div>
          <h1>Fetching the data from the backend</h1>
          <div className='sameline1'>
          <input type="text" placeholder='Search for the user...' onChange={this.onChangeSearchInput}name="SearchQuery" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
         <div className='sameline2'>
          <Link to="/favoritespage">Favorite Users</Link>
         </div>
        </div>
        {this.props.error && <p>{this.props.error}</p>}        
        {this.props.data.data.map((u, i)=>
          u.visible && u.visible 
          && i+1 <= this.state.currentPage * this.state.perPage 
          && i+1 > ((this.state.currentPage - 1) * this.state.perPage )
          && 
            <div  key={u.id} className='detail'>
            <p >Email: {u.email}</p>
             <p>F Name: {u.first_name}</p>
              <p>L Name: {u.last_name}</p>
              <div className='cover'>
              <p> <img src={u.avatar}/></p>
              <p class="namebold">{u.first_name} {u.last_name}</p><br></br>
              </div>
              <br></br>
              <button class="FavButton" onClick={()=>{this.onClickk(u.id)}}>{u.fav && u.fav?'Remove from Fav':'Add to Fav'}</button>
            </div>)}
       </div>
       {/**Pagination starts */}
      <div class="pagination"> <Pagination 
       count={this.props.data.data.length/this.state.perPage} 
       onChange={this.handlePagination}/>
      </div>
    </div> 
      
    );
  }
}


const mapStatetoProps = (state) => {
  return { num: state.num, data: state.data, error: state.error }
}

const mapDispatchprops = (dispatch) => {
  return { onFetchData: () => dispatch(fetchData()),
            ManageFav   : (id, fetchData)        => dispatch(ManageFav(id, fetchData)),
             SearchTerm : (text,data) => dispatch(SearchTerm(text,data))
         }
}


export default connect(mapStatetoProps, mapDispatchprops)(Main);
