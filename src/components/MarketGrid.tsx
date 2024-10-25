import { ChangeEvent, useEffect, useState } from "react";
import { debounce } from "../functions/debounce";

function MarketGrid({ data }: Readonly<{ data: MarketGridItems[] }>) {
  const [items, setItems] = useState<MarketGridItems[]>([]);

  const [filter, setFilter] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPagesize] = useState<number>(10);
  const totalPage = Math.ceil(total / pageSize);

  useEffect(() => {
    const { total, processedData } = process(
      data,
      filter,
      currentPage,
      pageSize
    );
    setTotal(total);
    setItems(processedData);
  }, [currentPage, data, filter, pageSize]);

  const onFilterChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setFilter(e.target.value);
  }, 250);

  const onPageChange = debounce(
    (value: number) => setCurrentPage((currentPage) => currentPage + value),
    100
  );
  const onPageSizeChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setPagesize(e.target.valueAsNumber);
  }, 100);

  return (
    <div>
      <h3>{total} Items</h3>
      <input
        type="text"
        placeholder="Search for items"
        onChange={onFilterChange}
      />
      {items.map(({ id, item_name }) => (
        <div key={id}>{item_name}</div>
      ))}

      <div>
        <div className="inline-flex align-center gap-10">
          <button onClick={() => onPageChange(-1)} disabled={currentPage === 1}>
            <span> Previous</span>
          </button>

          <span>
            Page: {currentPage} of {totalPage}
          </span>

          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage >= totalPage}
          >
            Next
          </button>
          <span>
            Page size:{" "}
            <input
              type="number"
              onChange={onPageSizeChange}
              defaultValue={pageSize}
              step={10}
              min={10}
              max={100}
            ></input>
          </span>
        </div>
      </div>
    </div>
  );
}

type MarketGridItems = {
  id: string;
  thumb: string;
  url_name: number;
  item_name: string;
};

export type { MarketGridItems };
export default MarketGrid;

function process(
  data: any[],
  filter: string,
  currentPage: number,
  pageSize: number
) {
  const filteredData = data.filter((item) =>
    item.item_name.toLowerCase().includes(filter.toLowerCase())
  );
  const pagedData = filteredData.filter((_, index) => {
    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;
    return index >= start && index < end;
  });

  return { total: filteredData.length, processedData: pagedData };
}
