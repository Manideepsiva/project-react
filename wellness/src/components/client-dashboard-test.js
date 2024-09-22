import React from "react";
import clientstyle from "../assets/css/style.module.css"
function Clienttest({ testName,setTestName,suggesions1,setSuggestion1,setError }){
    return(
        <>
 <div className={clientstyle['input-wrapper'] + ' ' + clientstyle['title-lg'] + ' ' + clientstyle['secondinput']}>
            <input
              type="text"
              id="treatmentInput"
              name="location"
              value={testName}
              placeholder="Diagnostic test name"
              className={clientstyle['input-field']}
              autoComplete="off"
                onChange={async (e) => {setTestName(e.target.value)
                  const value = e.target.value;
                  setError('');
                  const ele = document.querySelector(`.${clientstyle.suggestions}`);
                  if(value.trim() == '' ){
                    setSuggestion1([]); 
                    ele.classList.remove(clientstyle["active"]);

                  }
                     

                  if (value.trim() !== '') {
                    try {
                      
                      const response = await fetch('http://localhost:3001/api/Testsuggestions', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json', 
                        },
                        body: JSON.stringify({ typedtest: value }),
                      });
              
                      if (response.ok) {
                        const data = await response.json();
                        setSuggestion1(data.results); 
               
                          if(data.results.length < 1){
                          ele.classList.remove(clientstyle["active"])

                        console.log('lakaklaka')
                        }

                        else{
                          ele.classList.add(clientstyle["active"])

                        }
                          console.log("hey man its not zero",suggesions1)
    
                       
                      } else {
                        console.error('Error fetching suggestions:');
                      }
                    } catch (error) {
                      console.error('Error fetching suggestions:');
                    }
                  } else {
                    setSuggestion1([]); 
                


                  }




                }}
        
            />
           
            <ion-icon name="location"></ion-icon>
            <div className={clientstyle['suggestions']} id="suggestions3" style={{}}>
            {suggesions1?.map((item, index) => (
              
           <div className="suggestion" onClick={(e)=>{
            const value = e.target.textContent;
            console.log('hello there in suggestion');
            const inputElement = document.getElementById("treatmentInput");
            inputElement.value = value;
            const ele = document.querySelector(`.${clientstyle.suggestions}`);
            ele.classList.remove(clientstyle["active"]);
            setTestName(value);
           
            setSuggestion1([]);

           }} key={index}>{item}</div>
        
           
          
        ))}
            </div>
          </div>

        </>
    )
}

export default Clienttest;