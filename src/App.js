import React, {useState} from 'react';
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";

// const item = {
//   id: v4(),
//   name: "Clean the house"
// }

// const item2 = {
//   id: v4(),
//   name: "Wash the car"
// }

function App() {
  const [text, setText] = useState("")
  const [text1, setText1] = useState("")
  const [upform, setUpForm] = useState(false)
  const [upid, setUpId] = useState("")
  const [upkey, setUpKey] = useState("")
  const [state, setState] = useState({
    "todo": {
      title: "Todo",
      items: []
    },
    "Doing": {
      title: "Doing",
      items: []
    },
    "done": {
      title: "Done",
      items: []
    }
  })

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)


      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }

  const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text
            },
            ...prev.todo.items
          ]
        }
      }
    })

    setText("")
  }

  const addItem1 = () => {

    if (upkey === "todo") {
      var todos = state.todo.items

    todos.map(item => {
      if (item.id === upid) {
        item.name = text1
      }
    })
    } else if (upkey === "Doing") {
      var todos = state.Doing.items

    todos.map(item => {
      if (item.id === upid) {
        item.name = text1
      }
    })
    }
    
          // const removedArr = [...todos].filter(todo => todo.id !== id);

  

     
    console.log("text",text1,upid,upkey)
   
    setText1("")
    setUpForm(false)
  }

  const deleteTodo = (id, key) => {
    
    if (key === "todo") {
var todos = state.todo.items
           const removedArr = [...todos].filter(todo => todo.id !== id);

          setState(prev => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: removedArr
        }
      }
    })
  
    } else if (key === "Doing") {

      var todos = state.Doing.items
           const removedArr = [...todos].filter(todo => todo.id !== id);

          setState(prev => {
      return {
        ...prev,
        Doing: {
          title: "Doing",
          items: removedArr
        }
      }
    })
      
    }
    console.log("hello",state.todo.items,key)

  }

  const updateTodo = (id, key) => {
    console.log(id, key)
    setUpId(id)
    setUpKey(key)
    setUpForm(true)
  }

  return (
    <>
   
      

        { !upform ?<div style={{marginLeft:"40%"}} >
        <input className="todo-input" type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button className="todo-button" onClick={addItem}>Add</button>
      </div>:<div style={{marginLeft:"40%"}} >
        <input className="todo-input"  type="text" value={text1} onChange={(e) => setText1(e.target.value)}/>
        <button className="todo-button" onClick={addItem1}>Update</button>
      </div>  }
      


    <div className='todo-app'>
      
 

      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return(
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                             
                              return (
                                <div
                                  style={{background:"white"}}
                                 className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  className="row">
                                <div
                                 
                                 style={{borderBottom:"2px solid white"}}
                                    className="col-md-9"
                                >
                            
                                   
                                      {el.name}
                                    
                                      
                                                                

                                   
                                   
                                  {console.log("key",el.id)}
                                  </div>
                                  <div className="col-md-3" style={{marginBottom:"0px",borderBottom:"2px solid white"}}>
                                      {key ==="done"? '':<button style={{   float: "left"}} onClick={() => deleteTodo(el.id,key)} className="btn btn-danger">X</button>}
                                     {key ==="done"? '':<button onClick={() => updateTodo(el.id,key)} className="btn btn-info">Edit</button>}
                                 </div>

                                  </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
        </DragDropContext>
     
      </div>
      
      </>
  );
}

export default App;
