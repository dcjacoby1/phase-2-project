import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { UsePagination } from "./Pagination";

function History() {
  const context = useOutletContext();
  //takes in state of all hands played
  const history = context.history;

  const pageSize = 10;
  const siblingCount = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = UsePagination({
    totalCount: history.length,
    pageSize,
    siblingCount,
    currentPage,
  });

  const slicedHistory = history.slice(10 * (currentPage - 1), 10 * currentPage);

  function handleClick(page) {
    setCurrentPage(page);
  }

  function handleNext() {
    if (currentPage < Math.ceil(history.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  //maps each log to its seperate row in a table
  const mappedHistory = slicedHistory.map((log) => {
    return (
      <div className="flex-container justify-around text-center" key={log.id}>
        <p className="text-center">{log.currentHand}</p>
        <p className="text-center">{log.handWinner}</p>
      </div>
    );
  });

  return (
    <div className="modal-container-1 flex-container flex-column justify-around overflow-hidden">
      <h1 className="heading-1">History Page</h1>
      <div>
        <div className="flex-container justify-around">
          <h2 className="heading-3">Hand Count</h2>
          <h2 className="heading-3">Hand Winner</h2>
        </div>
        <div className="scroll">{mappedHistory}</div>
      </div>

      <div className="flex-container justify-center w-full">
        <button onClick={handlePrevious} style={{ marginRight: "10px", padding: "10px" }}>
          &lt;
        </button>

        {/* <div
          className="pagination"
          style={{
            // position: "fixed",
            bottom: "25px", // Adjust this value to change the distance from the bottom
            left: "50%", // This centers the pagination horizontally
            transform: "translateX(-50%)", // This centers the pagination horizontally
          }}
        > */}
        {pagination.map((page, index) => (
          <button
            key={index}
            onClick={() => handleClick(page)}
            className={currentPage === page ? "active" : ""}
            style={{ fontSize: "20px", padding: "5px 10px" }}
          >
            {page}
          </button>
        ))}
        {/* </div> */}
        <button onClick={handleNext} style={{ marginLeft: "10px", padding: "10px" }}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default History;
