import * as React from 'react';

type Props = {
  limit: number;
  total: number;
  offset: number;
  setOffset: any;
}

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

export const NavPagination: React.FC<Props> = ({ limit, total, offset, setOffset}) => {
const currentPage = offset ? offset : 1;
const pages = Math.ceil(total / limit);
const firstPage = Math.max(currentPage - MAX_LEFT, 1);


const onPageChange = (page: number) => { 
  setOffset(page - 1)
}

  return (
    <nav aria-label="Page navigation" className='d-flex justify-content-center'>
      <ul className="pagination">
      <li className="page-item">
          <button 
          className="page-link" 
          onClick={() => onPageChange(currentPage -1)} 
          aria-label="Previous"
          disabled={currentPage === 1}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {
          Array.from({length: Math.min(MAX_ITEMS, pages) })
            .map((_, index) => index + firstPage)
            .map((page) => (
              <li key={page} className="page-item">
                <button
                  className="page-link" 
                  onClick={() => onPageChange(page)}
              >
                {page}
                </button>
              </li>
            ))
        }
        <li className="page-item">
          <button 
          className="page-link" 
          onClick={() => onPageChange(currentPage + 1)}  
          aria-label="Next"
          disabled={currentPage === pages}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>     
  )
}