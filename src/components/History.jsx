import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"


function History() {

  const context = useOutletContext()
  const history = context.history
  

  // //post useState
  // const [formData, setFormData] = useState({
  //   currentHand: "",
  //   handWinner: ""
  // })



  const mappedHistory = history.map(log => 
  {
    return(
   <tr key={log.id}> 
    <td className="left-column">{log.currentHand}</td>
    <td className="right-column">{log.handWinner}</td>
  </tr>
    ) 
  }
  
  )
  
return(
<div className="modal-container-1">
    <h1>history page</h1>
<div className="table">
    <table>
  <thead>
    <tr>
      <th className="left-column">Hand Count</th>
      <th className="right-column">Hand Winner</th>
    </tr>
  </thead>
  <tbody>
    {mappedHistory}
  </tbody>
</table>
</div>
</div>
)
}

export default History