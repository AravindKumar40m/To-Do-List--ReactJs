import AddItem from "./AddItem";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState,useEffect } from 'react';
import SearchItem from "./SearchItem";
import ApiRequest from "./ApiRequest";


function App() {
  const API_URL="http://localhost:3500/items";

  const [items,setItems] = useState([])

const [newItem,setNewItem] = useState('')
const [search,setSearch] = useState('')
const [fetchError,setFetchError]=useState(null)
const [isLoading,setIsLoading]=useState(true)

useEffect(()=>{
  const fetchItems =async ()=>{
    try{
      const response = await fetch(API_URL);
      if(!response.ok) throw Error("Data not receiving")
      const listItems = await response.json();
      setItems(listItems);
      setFetchError(null)
    }
    catch(err){
      setFetchError(err.message)
    }
    finally{
      setIsLoading(false)
    }
  }
  setTimeout(()=>{
    (async ()=> await fetchItems())()
  },2000)
  
},[])

const addItem = async(item)=>{
  const id = items.length ? items[items.length -1].id + 1 : 1;
  const addnewitem = {id:id, checked:false, item:item}
  const listItems = [...items,addnewitem]
  console.log(listItems)
  setItems(listItems)  

  const postOption = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(addnewitem)
  }

  const result = await ApiRequest(API_URL,postOption)
  if(result) setFetchError(result)

}

const handleCheck = async(id)=>{
        const listItems = items.map((item)=>(
            item.id === id ? {...item,checked:!item.checked} : item
        ))  
        setItems(listItems)  

        const myItem = items.filter((item)=>item.id === id)

        const updateOption = {
          method: 'PATCH',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({checked:myItem[0].checked})
        }
      
        const reqUrl = `${API_URL}/${id}`

        const result = await ApiRequest(reqUrl,updateOption)
        if(result) setFetchError(result)

}

const handleDelete = async(id) =>{
    const listItems = items.filter((item)=> item.id !== id)
    setItems(listItems)
    localStorage.setItem("todo_lists",JSON.stringify(listItems))

    const deleteOption = {
      method: 'DELETE' }

    const reqUrl = `${API_URL}/${id}`

    const result = await ApiRequest(reqUrl,deleteOption)
    if(result) setFetchError(result)
}

const handlesubmit = (e) => {
  e.preventDefault()
  console.log(newItem);
  addItem(newItem)
  setNewItem("")
}

  return (
    <div>
        <Header />
        <AddItem 
          newItem={newItem}
          setNewItem={setNewItem}
          handlesubmit={handlesubmit}
        />
        <SearchItem 
          search={search}
          setSearch={setSearch}
        />
        <main>
          {isLoading &&  <p>Loading...</p>}
          {fetchError &&  <p>{`Error : ${fetchError}`}</p>}
          {
            !isLoading && !fetchError &&
            <Content 
              items={items.filter(item=>(item.item).toLowerCase().includes(search.toLowerCase()))}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          }
          
        </main>
        
        <Footer 
          length={items.length}
        />
    </div>
  );
}

export default App;
