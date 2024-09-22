import React from "react"
import clientstyle from "../assets/css/style.module.css"



function Clientstate({state, setStatefield,district, setDistrict,suggestions2,setSuggestion2,setError,suggestions3,setSuggestion3}){
    return (
        <>
        
        <div className={clientstyle['input-wrapper'] + ' ' + clientstyle['title-lg'] + ' ' + clientstyle['firstinput']}>
            <input
              type="text"
              id="stateInput"
              name="statefield"
              placeholder="State name"
              value={state}
              className={clientstyle['input-field']}
              autoComplete="off"
              onChange={async (e) => {setStatefield(e.target.value)
                const value = e.target.value;
                setError('');
                const ele = document.getElementById("suggestions1");
                console.log(ele);
                if(value.trim() == '' ){
                  setSuggestion2([]); 
                  ele.classList.remove(clientstyle["suggestions-active"]);

                }
                   

                if (value.trim() !== '') {
                  try {
                    
                    const response = await fetch('http://localhost:3001/api/Statesuggestions', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json', 
                      },
                      body: JSON.stringify({ typedstate: value }),
                    });
            
                    if (response.ok) {
                      const data = await response.json();
                      setSuggestion2(data.results); 
                      console.log("the reulst sof state is ",data.results)
             
                        if(data.results.length < 1){
                        ele.classList.remove(clientstyle["suggestions-active"])

                      console.log('lakaklaka')
                      }

                      else{
                        ele.classList.add(clientstyle["suggestions-active"])

                      }
                        console.log("hey man its not zero",suggestions2)
  
                     
                    } else {
                      console.error('Error fetching suggestions:');
                    }
                  } catch (error) {
                    console.error('Error fetching suggestions:');
                  }
                } else {
                  setSuggestion2([]); 
              


                }


                



              }}
            />
            <ion-icon name="location"></ion-icon>
            <div className={clientstyle['suggestions']} id="suggestions1">
            {suggestions2?.map((item, index) => (
              
              <div className="suggestion" onClick={(e)=>{
               const value = e.target.textContent;
               console.log('hello there in suggestion');
               const inputElement = document.getElementById("stateInput");
               inputElement.value = value;
               const ele =document.getElementById("suggestions1");
               ele.classList.remove(clientstyle["suggestions-active"]);
               setStatefield(value);
              
               setSuggestion2([]);
   
              }} key={index}>{item}</div>
           
              
             
           ))}
            </div>
          </div>

          <div className={clientstyle['input-wrapper'] + ' ' + clientstyle['title-lg'] + ' ' + clientstyle['treatment-search'] + ' ' + clientstyle['firstinput']}>
            <input
              type="text"
              id="districtInput"
              name="distfield"
              placeholder="District name"
              value={district}
              className={clientstyle['input-field']}
              autoComplete="off"
              onChange={ async (e) => {setDistrict(e.target.value)

                const value = e.target.value;
                setError('');
                const ele = document.getElementById("suggestions2");
                console.log(ele);
                if(value.trim() == '' ){
                  setSuggestion3([]); 
                  ele.classList.remove(clientstyle["suggestions-active"]);

                }
                   

                if (value.trim() !== '') {
                  try {
                    
                    const response = await fetch('http://localhost:3001/api/Districtsuggestions', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json', 
                      },
                      body: JSON.stringify({ typeddist: value,state:state }),
                    });
            
                    if (response.ok) {
                      const data = await response.json();
                      setSuggestion3(data.state); 
                      console.log("the reulst sof state is ",data.results)
             
                        if(data.state.length < 1){
                        ele.classList.remove(clientstyle["suggestions-active"])

                      console.log('lakaklaka')
                      }

                      else{
                        ele.classList.add(clientstyle["suggestions-active"])

                      }
                        console.log("hey man its not zero",suggestions2)
  
                     
                    } else {
                      console.error('Error fetching suggestions:');
                    }
                  } catch (error) {
                    console.error('Error fetching suggestions:');
                  }
                } else {
                  setSuggestion3([]); 
              


                }

                   
              }
            
            
            
            }
            />
            <ion-icon name="location"></ion-icon>
            <div className={clientstyle['suggestions']} id="suggestions2">

            {suggestions3?.map((item, index) => (
              
              <div className="suggestion" onClick={(e)=>{
               const value = e.target.textContent;
               console.log('hello there in suggestion');
               const inputElement = document.getElementById("districtInput");
               inputElement.value = value;
               const ele =document.getElementById("suggestions2");
               ele.classList.remove(clientstyle["suggestions-active"]);
               setDistrict(value);
              
               setSuggestion3([]);
   
              }} key={index}>{item}</div>
           
              
             
           ))}
            </div>
          </div>
        
        
        
        
        
        </>
    )
}

export default Clientstate;