import { FormEvent, useRef } from "react";
import useFetch from "./hooks/useFetch";

export default function App() {
  const {
    fetchData: fetch1,
    isLoading: isLoading1,
    data: data1,
    errorMessage: errorMessage1
  } = useFetch("https://catfact.ninja/fact", "GET");
  const {
    fetchData: fetch2,
    isLoading: isLoading2,
    data: data2,
    errorMessage: errorMessage2
  } = useFetch("https://catfact.ninja/fact", "PUT");
  const {
    fetchData: fetch3,
    isLoading: isLoading3,
    data: data3,
    errorMessage: errorMessage3
  } = useFetch("https://jsonplaceholder.typicode.com/posts", "POST");

  // useRef for POST DATA's inputs (title, body and user id)
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const userIdRef = useRef<HTMLInputElement>(null);

  // *** Fetch data(SUCCESS) *** //
  const onClick = async () => {
    try {
      await fetch1();
    } catch (err) {
      // handle error here
    }
  };

  // *** Fetch data(FAIL) *** //
  const onClick2 = async () => {
    try {
      await fetch2();
    } catch (err) {
      // handle error here
    }
  };

  // *** POST DATA *** //
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await fetch3({
        title: titleRef.current?.value || "",
        body: bodyRef.current?.value || "",
        userId: userIdRef.current?.value || ""
      });
    } catch (err) {
      // handle error here
    }
  };

  return (
    <div className="App">
      <hr />

      {/* Fetch data(SUCCESS) */}
      <button onClick={onClick}>SUCCESS</button>
      {isLoading1 && <p>fetching...</p>}
      {data1 && <p>{JSON.stringify(data1)}</p>}
      {errorMessage1 && <p>{errorMessage1}</p>}
      <hr />

      {/* Fetch data(FAIL) */}
      <button onClick={onClick2}>FAIL</button>
      {isLoading2 && <p>fetching...</p>}
      {data2 && <p>{JSON.stringify(data2)}</p>}
      {errorMessage2 && <p>{errorMessage2}</p>}
      <hr />

      {/* POST DATA */}
      <form onSubmit={onSubmit}>
        <label>title</label>
        <input ref={titleRef} type="text" />
        <br />
        <label>body</label>
        <input ref={bodyRef} type="text" />
        <br />
        <label>user id</label>
        <input ref={userIdRef} type="text" />
        <br />
        <button type="submit">POST DATA</button>
        {isLoading3 && <p>fetching...</p>}
        {data3 && <p>{JSON.stringify(data3)}</p>}
        {errorMessage3 && <p>{errorMessage3}</p>}
      </form>
      <hr />
    </div>
  );
}
