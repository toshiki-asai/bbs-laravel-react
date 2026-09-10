import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

// export default function ListPagination<T extends DataType>({data}:T) {
export default function ListPagination({data}: {
  data : {
    current_page: number,
    last_page: number,
  }
}) {
  if(data.last_page === 1) {
    return null;
  }
  let start_page = data.current_page-2;
  if (start_page < 1) start_page = 1;
  let end_page = data.current_page+2;
  if(end_page > data.last_page) end_page = data.last_page;

  const pages = [...Array(end_page-start_page+1)].map((_, i) => i+start_page);

  return (
    <Pagination>
      <PaginationContent>
        {start_page < data.current_page &&
          <PaginationItem>
            <PaginationPrevious to={"/posts?page="+(data.current_page-1)} text="前へ" />
          </PaginationItem>
        }
        {start_page > 1 &&
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        }
        {pages.map((page_no)=> (
          <PaginationItem key={page_no}>
            <PaginationLink to={"/posts?page="+page_no} isActive={data.current_page === page_no}>
              {page_no}
            </PaginationLink>
          </PaginationItem>
        ))}
        {end_page < data.last_page &&
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        }
        {end_page > data.current_page &&
          <PaginationItem>
            <PaginationNext to={"/posts?page="+(data.current_page+1)} text="次へ" />
          </PaginationItem>
        }
      </PaginationContent>
    </Pagination>
  )
}
