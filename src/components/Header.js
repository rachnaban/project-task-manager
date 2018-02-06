import React from "react";
import { Link } from "react-router-dom";
import Authentication from './Authentication';
const headerStyle = {
  textTransform:'capitalize'
};
const Header = props => {
  
  return(
  <header className="header">
   
      
        <Link className="header__title" to="/">
          <h1 style={headerStyle}>{props.message}</h1>
        </Link>
       
        {props.closeheader ? (
          <Link className="close-header" to={{pathname:"/"}}>
            <i
              className="fa fa-times fa-2x"
              aria-hidden="true"
              title="Go To Home"
            />
          </Link>
        ) :  (<Authentication
                render={({user, login, error, logout}) => (
                   <React.Fragment>
                   {
                   
                      user ? (<button className="button button--link" onClick={logout}>Logout</button>)
                           :null
                    }
                    </React.Fragment>
                   )}/>)            

      }

  </header>
);
}
export default Header;

