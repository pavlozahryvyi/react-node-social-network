import styles from "./Users.module.css";
import React, {useState} from "react";


const Pagination = (props) => {

    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionSize = 10;

    let [portionNumber, setPortionNumber] = useState(1);

    const portionCount = Math.ceil(pagesCount / portionSize);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;


    return (
        <div>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</button>}
            {
                pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((page) => (
                            <span key={page}
                                  className={`${props.currentPage === page && styles.selectedPage} ${styles.page}`}
                                  onClick={(e) => {
                                      props.setCurrentPage(page)
                                  }
                                  }>{page}
                        </span>
                        )
                    )
            }

            {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>NEXT</button>}
        </div>
    )
};

export default Pagination;