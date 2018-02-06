import React from 'react';
import {Uid} from './Uid';
import MemberList from './MemberList';
const MemberListWrapper =()=>
(
<Uid>
{(uid)=>(
	
      <MemberList uid ={uid}/>
		)
}
</Uid>
	)
export default MemberListWrapper;