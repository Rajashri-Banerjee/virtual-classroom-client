import React from 'react'
import DownloadIcon from '@mui/icons-material/Download';


function AdminAssignmentList({assignment}) {
    console.log(assignment)
  return (
    <div>
        {assignment && assignment.submissions.length===0 &&
        <div>
            No submissions yet
        </div>
        }
        {assignment && assignment.submissions && assignment.submissions.map((submission)=> {
            return (
                <div  className='notification-card flex ac sb' >
                    <p className='roboto'> {submission.user && submission.user.fullname}</p>
                    <div className='flex ac sb' >
                        <DownloadIcon
                            sx={{marginTop:-2,cursor:'pointer'}} 
                            onClick={()=>window.open(submission.doclink)}  
                        />
                    </div>
                    <span className='date-span'>   
                        {new Date(submission.submitted_at).toString().split('GMT')[0]}
                    </span>
                </div>
            )
        })}
    </div>
  )
}

export default AdminAssignmentList