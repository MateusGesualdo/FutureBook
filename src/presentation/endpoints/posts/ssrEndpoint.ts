import { Request, Response } from "express";
import { endpoints } from '../../../business/entities/endpoint'

const style = `
    <style>        
        body {
            display: flex;
            justify-content: space-evenly;  
            background-color: darkslategray;
            color: white;
        }        
        textarea{ 
            width: 40vw;
            height: 80vh;
        }     
        #selectContainer{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }   
        button{ margin-top: 10px }
        textarea, select, button{
            background-color: #000000d0;
            color: white;
        }
    </style>
`

const script = `
    <script>
        const reqField = document.getElementById("req")
        const resField = document.getElementById("res")
        const select = document.querySelector("select")
        const button = document.querySelector("button")

        select.onchange = () => {  
            reqField.value = JSON.stringify(JSON.parse(select.value), null, 3)
        }

        button.onclick = () => {
            const req = JSON.parse(reqField.value)
            
            if(req.config.body) req.config.body = JSON.stringify(req.config.body)

            fetch(req.path, req.config)
                .then(res => res.json())
                .then(data => { resField.value += JSON.stringify(data, null, 2) })
                .catch(err => { alert(err) })
        }
    </script>
`

export default async function ssrEndpoint(req: Request, res: Response) {
    res.send(
        `<!DOCTYPE html>
        <html>              
            <body>
                ${style}   
                <div>      
                    <h2>Request</h2>       
                    <textarea id="req">${JSON.stringify(endpoints[0].req, null,3)}</textarea>
                </div>
                <div id="selectContainer">                
                    <select>
                        ${endpoints.map(endpoint => (`
                            <option value=${JSON.stringify(endpoint.req)}>
                                ${endpoint.name}
                            </option>
                        `))}
                    </select>
                    <button>Send</button>
                </div>
                <div>
                    <h2>Response</h2>
                    <textarea id="res"></textarea>                 
                </div>
                ${script}         
            </body>        
        </html>`
    )
}