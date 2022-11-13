import React from "react";
import { createClient } from "@supabase/supabase-js";
import { StyledRegisterVideo } from "./styles";


// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues)
        
    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value
            })
        },
        clearForm() {
            setValues({})
        }
    };
}

const PROJECT_URL = "https://deuoeynolpybhxhczosj.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRldW9leW5vbHB5Ymh4aGN6b3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNjM2MjYsImV4cCI6MTk4MzkzOTYyNn0.UXL99Z0jAoDf_pDVcrrgA5Tuk14n7knpLVVBVQvWgLY"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

// https://img.youtube.com/vi/QsqatJxAUtk/hqdefault.jpg

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {titulo: "", url: ""}
    });
    const [formVisivel, setFormVisivel] = React.useState(false)

    /*
    ##Oque precisamos para o form funcionar
    - Pegar dados, que precisam vir do state
        -titulo
        -url do video
    - Precisamos ter um onSubmit do nosso form
    - Limpar o formulario após o Submit
    */
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Ternario e Curto-Circuito */}
            {formVisivel 
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        setFormVisivel(false)
                        formCadastro.clearForm()
                        console.log(formCadastro.values)

                        // contrato entre Front e BackEnd
                        supabase.from("video").insert({
                            titulo: formCadastro.values.titulo ,
                            url: formCadastro.values.url ,
                            thumb: getThumbnail(formCadastro.values.url) ,
                            playlist: "jogos"
                        })
                        .then((response) => {
                            console.log(response)
                        })
                        .catch((err) => {
                            console.log(err)
                        })


                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>x</button>
                            <input 
                                placeholder="Titulo do video"
                                name="titulo" 
                                value={formCadastro.values.titulo} 
                                onChange={formCadastro.handleChange}
                            />
                            <input 
                                placeholder="url"
                                name="url" 
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                            />
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>
                )
                : null
            }


        </StyledRegisterVideo>
    )
}

// [x] Falta botão adcionar
// [x] Modal
// -> [x] Precisamos controlar o state
// -> Formilario em si