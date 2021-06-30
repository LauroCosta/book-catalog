import "./styles.scss";
import { FiLink, FiUser, FiBook, FiSearch } from "react-icons/fi";
import { api } from "./components/services/api";
import { ChangeEvent, useState } from "react";

type Hit = {
  title: string;
  url: string;
  author: string;
  objectID: string;
  created_at: string;
};

type DataProps = {
  hits: Hit[];
};

function App() {
  const [hits, setHits] = useState<Hit[]>([]);
  const [searchKey, setSearchKey] = useState<string>("")


  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const { value } = event.target; 
    setSearchKey(value)
  }
  async function getBook(e: React.FormEvent) {
    e.preventDefault();

    const { data } = await api.get<DataProps>(`search?query=${searchKey}`);

    const hits = data.hits.map((hit) => {
        return {
          title: hit.title,
          url: hit.url,
          author: hit.author,
          objectID: hit.objectID,
          created_at: hit.created_at
        };
    });

    setHits(hits);
  }

  return (

    <>
    <header>
      <div className="content">
        <h1>Book Catalog</h1>

        <form onSubmit={getBook} className="search">
          <input 
            type="text" 
            id="searchKey" 
            onChange={handleInputChange}
          />
          <button type="submit"><FiSearch size={22} color={"#FFF"}/></button>
        </form>
      </div>
    </header>
    
    <main>

      {hits.map((hit) => {
        return (
          <div key={hit.objectID} className="container">
            <div>
              <FiUser width={70} size={20} color={"#767676"}/>
              <h1>{hit.author}</h1>
            </div>

            <div title={hit.title}>
              <FiBook width={70} size={20} color={"#767676"}/>
              <h1>{hit.title ? hit.title : "Não informado"}</h1>
            </div>
            
            <div title={hit.url}>
              <FiLink width={80} size={20} color={"#767676"}/>
              <a className={hit.url ? "" : "no_information"} href={hit.url}>{hit.url ? hit.url : "Não informado"}</a>
            </div>
          </div>
        );
      })}
    </main>

    </>
  );
}

export default App;
