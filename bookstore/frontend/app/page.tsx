"use client";
import BooksCard from "@/components/BookCard";
import axios from "@/libs/axios";
import { ApiQuery, Book } from "@/utils/curstomTypes";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ScaleLoader } from "react-spinners";

export default function Home() {
  const [hasMore, setHasMore] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const query = useRef<ApiQuery>({ page: 1, limit: 15 });

  const fetchMoreData = async (reset: boolean = false) => {
    setIsLoading(true);
    await axios
      .get(`/books?page=${query.current.page}&limit=${query.current.limit}`)
      .then((res) => {
        const arr = reset ? res.data.data : [...books, ...res.data.data];
        setBooks(arr);
        if (res.data.total > arr.length) {
          setHasMore(true);
          query.current.page = query.current.page + 1;
        } else {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between deviceHeight relative overflow-hidden">
      <div className="flex-1 w-full overflow-auto font-sans">
        <section>
          <InfiniteScroll
            dataLength={books?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              isLoading && (
                <ScaleLoader color="rgb(0, 255, 204)" className="text-center" />
              )
            }
            refreshFunction={() => {
              query.current.page = 1;
              fetchMoreData(true);
            }}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8595; Pull down to refresh
              </h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8593; Release to refresh
              </h3>
            }
          >
            <div className="pb-4 text-black truncate ">
              <div className="m-4 text-lg text-center font-bold font-notaSans">
                Books
              </div>
              {books && books.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-1 m-1 place-items-center">
                  {books?.map((book: Book) => (
                    <BooksCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <div className="text-center">No book found</div>
              )}
            </div>
          </InfiniteScroll>
        </section>{" "}
      </div>
    </main>
  );
}
