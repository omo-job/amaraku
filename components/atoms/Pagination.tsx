import ReactPaginate from 'react-paginate';

interface Props {
  pageCount: number;
  handleSearchItem: (page: number) => void;
  currentPage: number;
}

const LAST_DISPLAY_SIZE = 5;
const AROUND_DISPLAY_PAGES = 5;

export default function Pagination(props: Props) {
  const { pageCount, handleSearchItem, currentPage } = props;
  console.log(currentPage);

  const handlePaginate = (selectedItem: { selected: number }) => {
    const page = selectedItem.selected + 1;
    handleSearchItem(page);
  };

  // ページネーションを表示
  return (
    <div>
      <ReactPaginate
        forcePage={currentPage}
        pageCount={pageCount}
        marginPagesDisplayed={LAST_DISPLAY_SIZE}
        pageRangeDisplayed={AROUND_DISPLAY_PAGES}
        onPageChange={handlePaginate}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        activeLinkClassName="active"
        previousLabel="前へ"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextLabel="次へ"
        nextLinkClassName="page-link"
        nextClassName="page-item"
        disabledClassName="disabled-button"
      />
    </div>
  );
}
