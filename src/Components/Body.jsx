import '../Css/Body.css'
import { Component } from 'react'

class Body extends Component {
    render(){
        let iterator = 0

        //Escondendo os resultados para outros tomarem lugar
        const clearHTML = () => {
            try {
                let divToExclude = document.getElementById(`resultDiv${iterator}`)
                divToExclude.style.display = 'none'
                iterator++
            }catch(error) {
                window.location.reload()
            }
        }

        //Função que faz a requisição na API e trata os resultados
        const apiHandler = () => {
            let resultField = document.getElementById("resultField")
            let resultDiv = document.createElement("div")
            resultDiv.setAttribute("id", `resultDiv${iterator}`)
        
            let valval = document.getElementById("inputCity").value

            resultField.appendChild(resultDiv)

            let key = 'AIzaSyCB0CBageGarpFx7TMq231Qe6fvoyNN6vU'
            let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${valval}&key=${key}&maxResults=3`

            fetch(url)
            .then(res => res.json())
            .then(val => {
                console.log(val);
                
                for (let index in val.items) {
                    let path = val.items[index]['volumeInfo']
                        for(let x in path){
                            let h1 = document.createElement('h1')
                            h1.innerHTML = `${x.toLocaleUpperCase()}:`
                            resultDiv.appendChild(h1)

                            let p1 = document.createElement('p')
                            p1.innerHTML = ` ${path[x]}`
                            resultDiv.appendChild(p1)
                        }
                        let divider = document.createElement('hr')
                        resultDiv.appendChild(divider)
                    }
                })
        }

        //Capta se pressionaram o enter na página para chamar a função acima
        const enterDown = (e) => {
            let keyCode = e.key || e.code
            if(keyCode === "Enter"){
                apiHandler()
            }
        }

        return (
            <main onKeyUp={e => enterDown(e)}>
                <div className="input-group mb-5 mt-3">
                    <input id="inputCity" type="text" className="form-control" placeholder="Discover your favorite book..." 
                            aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                        
                    <div className="input-group-append">
                        <button onClick={() => apiHandler()} className="btn btn-outline-secondary" type="button">Search</button>
                    </div>
                </div>

                <button type="button" className="btn btn-danger w-75 mb-5"
                        onClick={() => clearHTML()}>Clear</button>

                <div id="resultField">
                </div>
            </main>
        )
    }
}

export default Body
