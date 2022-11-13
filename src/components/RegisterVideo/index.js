import React from "react";
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