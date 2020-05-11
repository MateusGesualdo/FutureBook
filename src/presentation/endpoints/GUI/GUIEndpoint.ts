import { Request, Response } from "express";
import {style} from './style'
import {script} from './script'

export default async function GUIEndpoint(req: Request, res: Response) {
    res.send(
        `<body>    
            <style>${style}</style>
            <div>
                <select>
                    <option>Endpoints</option>
                </select>
            </div>        
            <section>
                <div>
                    <fieldset>
                        <legend>Method</legend>
                        <textarea rows="1"></textarea>
                    </fieldset>
                    <fieldset>
                        <legend>Path</legend>
                        <textarea rows="1"></textarea>
                    </fieldset>
                </div>
                <fieldset>
                    <legend>Headers</legend>
                    <textarea rows="4"></textarea>
                </fieldset>
                <fieldset>
                    <legend>Body</legend>
                    <textarea rows="4"></textarea>
                </fieldset>
            </section>     
            <div>   
                <button>Send</button>
            </div>
            <div>   
                <fieldset>
                    <legend>Response</legend>
                    <textarea rows="15"></textarea>
                </fieldset>
            </div>
            <script>${script}</script>          
        </body>`
    )
}