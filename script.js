let cep = document.querySelector('#cep')
let rua = document.querySelector('#rua')
let complemento = document.querySelector('#complemento')
let bairro = document.querySelector('#bairro')
let cidade = document.querySelector('#cidade')
let estado = document.querySelector('#uf')

let message = document.querySelector('#message')
cep.addEventListener('focusout', async() =>{
    try{
        let validacao = /^[0-9]{8}$/;
        if(!(validacao.test(cep.value)) ){
            throw {cep_error: 'CEP inválido!!'}
        }        
        let response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        if(!response.ok){
            throw await response.json()
        }
     let responseCEP = await response.json()

     rua.value = responseCEP.logradouro
     complemento.value = responseCEP.complemento
     bairro.value = responseCEP.bairro
     cidade.value = responseCEP.localidade
     estado.value = responseCEP.uf
    }catch(error){
        if(error?.cep_error){
            message.textContent = error.cep_error
        }
        console.log(error)
    }
})
