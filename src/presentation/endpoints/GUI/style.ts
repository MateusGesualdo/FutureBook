export const style = `
    body {
        display: grid;
        grid-gap: 10px;
        padding: 10px;
        font-size: large;
        color: white;
        background: darkslategrey
    }
    fieldset, textarea, select, button {
        background: black;
        font-size: large;
        color: white;
        border-right: 1px solid silver;
        border-bottom: 1px solid silver;
        padding: 5px 10px;
    }
    section {
        display: grid;
        grid-template-columns: 1fr 2fr 2fr;
        grid-gap: 10px;
    }
    textarea {
        box-sizing: border-box;
        width: 100%;
        border:none;
    }
`