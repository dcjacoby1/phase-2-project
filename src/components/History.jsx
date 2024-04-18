import { useEffect, useState } from "react"

function History() {
  const [history, setHistory] = useState([])
  useEffect(() => {
    fetch("http://localhost:3000/history")
    .then(r => r.json())
    .then(data => setHistory(data))
  },[])

  const mappedHistory = history.map(log => 
  {
    return(
   <tr key={log.currentHand}> 
    <td>{log.currentHand}</td>
    <td>{log.handWinner}</td>
  </tr>
    )
    
    
  }
  
  )
  
return(
<>
    <h1>history page</h1>
<div id="table">
    <table>
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    {mappedHistory}
  </tbody>
</table>
</div>
</>
)
}

export default History