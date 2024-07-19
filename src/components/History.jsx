import { useState} from "react"
import { useOutletContext } from "react-router-dom"
import {UsePagination} from "./Pagination"


function History() {

  const context = useOutletContext()
  //takes in state of all hands played
  const history = context.history
 
  
  const pageSize = 5
  const siblingCount = 1
  const [currentPage, setCurrentPage] = useState(1)
  const pagination = UsePagination({
    totalCount: history.length,
    pageSize,
    siblingCount,
    currentPage
  })

  const slicedHistory = history.slice(
    5 * (currentPage - 1),
    5 * currentPage
  )
  

  function handleClick(page) {
    
    setCurrentPage(page)

  }

   
  //maps each log to its seperate row in a table
  const mappedHistory = slicedHistory.map(log => 
    {
      return(
     <tr key={log.id}> 
      <td className="left-column">{log.currentHand}</td>
      <td className="right-column">{log.handWinner}</td>
    </tr>
      ) 
    })

  return (
    <div className="modal-container-2">
        <h1>History Page</h1>
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

      <div className="pagination"
      style={{
        position: 'fixed',
        bottom: '20px', // Adjust this value to change the distance from the bottom
        left: '50%', // This centers the pagination horizontally
        transform: 'translateX(-50%)' // This centers the pagination horizontally
      }}>
            {pagination.map((page, index) => (
              <button
                key={index}
                onClick={() => handleClick(page)}
                className={currentPage === page ? "active" : ""}
                style={{ fontSize: '20px', padding: '10px 20px' }}
              >
                {page}
              </button>
            ))}
      </div>
    </div>
  )
}

export default History