import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [expenseList, setExpenseList]=useState([]);
  const [newExpense, setNewExpense]=useState({description:"",amount:0});
  

  async function fetchExpenses(){
    let response=await fetch("http://localhost:3000/api/expenses/");
    let data=await response.json();
    console.log(data);
    setExpenseList(data);
  }

  useEffect(()=>{
    fetchExpenses();
  },[]);

  const handleChange=(e)=>{
    // console.log(e.target,e.target.value);
    setNewExpense({...newExpense, [e.target.name]:e.target.value});
  }
  
  async function handleSubmit(e){
    e.preventDefault();
    const response=await fetch("http://localhost:3000/api/expenses/",{
      method: 'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newExpense),
    });

    if(!response.ok)
    {
      console.log("Error");
    }

    else{
      let data=await response.json();
      console.log(data);
      setExpenseList(data);
    }
  }

  const handleDelete=async (id)=>{
    // e.preventDefault();
    const response=await fetch(`http://localhost:3000/api/expenses/${id}`,{
      method: 'DELETE',
      headers:{
        'content-type':'application/json'
      },
    });
    if(!response.ok)
    {
      console.log("Error");
    }

    else{
      let data=await response.json();
      console.log(data);
      fetchData();
    }
  }

  return (
    <>
      {/* <div>{newExpense.description},{newExpense.amount}</div> */}

      <form onSubmit={handleSubmit}>
        <input type="text" name='description' onChange={handleChange}/>
        <input type="number" name='amount' onChange={handleChange}/>
        <button type='submit'>Add Expense</button>
      </form>

      <div className="expense-item-container">
      {
        expenseList.map((expenses,index)=>{
          const a=(expenses.amount>0)?"positive":"negative";
          return(<>
            <div key={index} className={('expense-item '+a)}>
              <div>{expenses.description}&ensp; {expenses.amount}</div>&ensp;
              <button type='button' onClick={()=>handleDelete(expenses._id)}>Delete</button>
            </div></>
        )
      })
    }
      </div>
    </>
  )
}

export default App;