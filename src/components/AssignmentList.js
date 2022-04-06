import React from 'react'
import AssignmentItem from './AssignmentItem'

function AssignmentList({assignments, user}) {
    console.log(assignments)
  return (
    <div>
        {assignments.map((assignment,index)=> {
            return <AssignmentItem assignment={assignment} key={index} user={user}/>
        })}
    </div>

  )
}

export default AssignmentList