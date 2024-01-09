import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'

const AddItem = ({newItem,setNewItem,handlesubmit}) => {
  const inputRef = useRef()
  return (
    <form className='addForm' onSubmit={handlesubmit}>
        <input 
            type="text"
            ref={inputRef}
            autoFocus
            required
            placeholder='Add Item'
            value={newItem}
            onChange={(e)=>setNewItem(e.target.value)}
             
        />
        <button type='submit'
                onClick={()=>inputRef.current.focus()}
        >
            <FaPlus />
        </button>
    </form>
  )
}

export default AddItem