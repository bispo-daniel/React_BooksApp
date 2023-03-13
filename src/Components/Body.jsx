import '../Css/Body.css'
import { Component } from 'react'

class Body extends Component {
    render(){
        let iterator = 0
        let it = 0

        //Escondendo os resultados para outros tomarem lugar
        const clearHTML = () => {
            try {
                let divToExclude = document.getElementById(`resultDiv${it}`)
                divToExclude.style.display = 'none'
                it++
            }catch(error) {
                window.location.reload()
            }
        }

        //Função que faz a requisição na API e trata os resultados
        const apiHandler = () => {
            let resultField = document.getElementById("resultField")
            let resultDiv = document.createElement("div")
            resultDiv.setAttribute("id", `resultDiv${iterator}`)
            iterator++
        
            let bookFromInput = document.getElementById("inputCity").value

            resultField.appendChild(resultDiv)

            
            let key = process.env.REACT_APP_SECRET_KEY
            let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookFromInput}&key=${key}&maxResults=1`

            fetch(url)
            .then(res => res.json())
            .then(val => {
                let path = val.items[0]['volumeInfo']

                let h1 = document.createElement('h1')
                h1.innerHTML = `${path['authors'][0]}:`
                resultDiv.appendChild(h1)

                let h2 = document.createElement('h1')
                h2.innerHTML = `${path['title']} - ${path['subtitle']} (${path['publishedDate']}) `
                resultDiv.appendChild(h2)

                let pp = document.createElement('p')
                pp.innerHTML = `${path['pageCount']} pages in ${path['language']}`
                resultDiv.appendChild(pp)

                let divider = document.createElement('hr')
                resultDiv.appendChild(divider)

                let p = document.createElement('p')
                p.innerHTML = `${path['description']}`
                resultDiv.appendChild(p)
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
