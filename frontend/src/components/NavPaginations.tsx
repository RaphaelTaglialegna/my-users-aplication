import * as React from 'react';
import axios from 'axios';

type Props = {
  limit: number;
  total: number;
  offset: number;
  setOffset: any;
}

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

export const NavPagination: React.FC<Props> = ({ limit, total, offset, setOffset}) => {
const currentPage = offset ? (offset / limit) + 1 : 1;
const pages = Math.ceil(total / limit);
const firstPage = Math.max(currentPage - MAX_LEFT, 1);

  return (
    <nav aria-label="Page navigation" className='d-flex justify-content-center'>
      <ul className="pagination">
        {
          Array.from({length: MAX_ITEMS })
            .map((_, index) => index + firstPage)
            .map((page) => (
              <li key={page} className="page-item">
                <button
                  className="page-link" 
                  onClick={() => setOffset((page -1) * limit)}
              >
                {page}
                </button>
              </li>
            ))
        }

      </ul>
    </nav>     
  )
}

{/* <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li> */}