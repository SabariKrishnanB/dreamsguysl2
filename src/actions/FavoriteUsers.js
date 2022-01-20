import React from "react";
import { connect } from 'react-redux';
import  '../App.css';
import { fetchData, ManageFav,DeleteFav } from './actions';
 

 class FavoriteUsers extends React.Component {
     onClickDelete=(id)=>{
      this.props.DeleteFav(id, this.props.data)
    }
   render() {
         return ( 
                  <div className="App">
                  <div className='container'>
                  <div>
                      <h1>Fav Users</h1>
    
                  </div>
   
                { (this.props.data.data.filter(item => item.fav)).map(item => 
        
                    <div key={item.id} className='detail'>
                      <div className='cover'>
                        <p> <img src={item.avatar} alt={item.first_name} /></p>
                        <p class="namebold">{item.first_name} {item.last_name}</p><br></br>
                      </div>
                    <p>{item.first_name}</p>
                    <p>{item.last_name}</p>
                    <p>{item.email}</p>
                    <button class="FavButton" onClick={()=>{this.onClickDelete(item.id)}}>
                      Delete from Favorite
                    </button>
                    </div>)}
               </div>   
            </div>
          );
        }
     }

const mapStatetoProps = (state) => {
  return {  data: state.data }
  }

const mapDispatchprops = (dispatch) => {
  return { 
            DeleteFav: (id, fetchData) => dispatch(ManageFav(id, fetchData)) }
  }




export default connect(mapStatetoProps,mapDispatchprops)(FavoriteUsers);
