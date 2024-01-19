import { useEffect, useState } from "react";

function Todo() {
    const [todo, setTodo] = useState(() => {return JSON.parse(localStorage.getItem('todo')) || []});
    const [dummyTodo, setDummyTodo] = useState(todo);
  
    const [text, setText] = useState('');
    const [checked, setChecked] = useState(false)
    function addTodo(text) {
        if(text !== '') {
            setTodo((prev) => [...prev, {item:text, isChecked:false}])
        }
        setText('')
    }

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todo))
    },[todo])

    function deleteTodo(index) {
        const newTodo = todo.filter((_,i) => index !== i)
        setTodo(newTodo);
    }

    function toggleTaskCompletion(index) {
        setTodo((prev) => {
            const updatedData = [...prev];
            updatedData[index].isChecked = !updatedData[index].isChecked

            return updatedData;
        })
    }

    function filterData() {
        setChecked(!checked)
        const filterArray = dummyTodo.filter(filter => filter.isChecked)
        if(!checked) {
            setDummyTodo(filterArray)
        } else{
            setDummyTodo(todo)
        }
    }


    return (
        <section className="w-full min-h-screen justify-center flex flex-col items-center gap-2">
            <div>
                <input type="text" className="border-2 border-black" value={text} onChange={(e) => setText(e.target.value)} />
                <button className="border-2 border-black" onClick={() => addTodo(text)}>ADD task</button>
                <input type="checkbox" onChange={filterData} checked={checked}/>
            </div>
            {(checked ? dummyTodo :todo).map((todos, index) => {
                return (
                    <div key={index} className="min-w-[15rem] flex gap-4 justify-between py-2 border-2 border-black">
                        <div>
                            <h1>{todos.item}</h1>
                            {todos.isChecked ? <p>completed</p> : <p>not completed</p>}
                        </div>
                        <div>
                            <button className="border-2 border-black" onClick={() => deleteTodo(index)}>Delete</button>
                            <input type="checkbox" onChange={() => toggleTaskCompletion(index)} checked={todos.isChecked} />
                        </div>
                    </div>
                );
            })}
        </section>
    );
}

export default Todo;
