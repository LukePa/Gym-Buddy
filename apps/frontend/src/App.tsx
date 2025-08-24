

function App() {
    const buttonClick = async () => {
        const t = await fetch("http://localhost:5312/exercises/test", {
            method: "post"
        })
        const body = t.json();
        console.log(body)
    }
    
    
    return (
        <>
          <div>
            <p>My frontend</p>
              <button onClick={buttonClick}>Do something</button>
          </div>
        
        </>
    )
}

export default App
