import React from 'react';
import {Link} from 'react-router-dom';

const PageNotFound =()=>(
	<div style=
		{{display:'flex',
		  alignItems:'center',
		  justifyContent:'center',
		  height:'500px',
		  flexWrap:'wrap',
		  flexDirection:'column',
		  fontSize:'4.2rem',
		  marginRight:'20px',
		  marginLeft:'20px'}}>
	<div>Oops 404. Looks like you got lost. </div>
	<div><Link to="/">Take me Home</Link></div>
	 </div>);
export default PageNotFound;