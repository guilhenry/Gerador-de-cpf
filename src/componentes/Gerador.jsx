import { useState } from "react";
import copia from "../copia.png"

function Gerador(){
    const [cpf, setcpf] = useState("");
    const [copied, setCopied] = useState(false); 

    function handleClick() {
        setcpf(initDigit()); 
    }

    function handleCopy() {
        if (cpf) {
            navigator.clipboard.writeText(cpf);
            setCopied(true); 
            setTimeout(() => setCopied(false), 2000); 
            
        }
    }

    return( 
   
        <div className="info">
            <h1 className="titulo">Gerador de CPF</h1>
            <div className="displayCpf">
            {cpf && <h1 className="cpfh1">{cpf}</h1>} 
            
            <button style={{display: cpf ? "block" : "none" }} className="botao1" onClick={handleCopy}><img src={copia}></img></button></div>
            {copied && <span style={{ marginLeft: "10px" }}>✅ Copiado!</span>}
            <button className="botao" onClick={handleClick}>Gerar CPF</button>
        </div>);
}


export default Gerador

function initDigit(){
    let primNum = '';
    for(let i = 0; i < 9; i++){
        primNum += parseInt(Math.random() * 10)
    }
    

    let sub = 10;
    let soma = 0 ;
    let cpfCompleto = primNum;
    for (let i =0; i < 2; i++){ 
        for (const element of cpfCompleto) {
           soma += element * sub;
            
            sub -= 1;
        }
        let resto = soma % 11;
        cpfCompleto += resto < 2 ? 0 : 11 - resto;
        sub = 11;
        soma = 0
    }
    return (cpfCompleto.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
        
}
