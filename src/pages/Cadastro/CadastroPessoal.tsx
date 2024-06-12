import {
  Button,
  Label,
  Fieldset,
  Input,
  Form,
  Titulo,
  ErrorMessage,
} from "../../components"
import { useForm } from "react-hook-form"

interface FormInputTipos {
  nome: string
  email: string
  telefone: string
  senha: string
  senhaVerificada: string
}

const CadastroPessoal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputTipos>()

  const aoSubmeter = (dados: FormInputTipos) => {
    console.log(dados)
  }

  const senha = watch("senha")

  const validaSenha = {
    obrigatorio: (val: string) =>
      !!val || "Por favor, insira a senha novamente",
    tamanhoMinimo: (val: string) =>
      val.length >= 8 || "A senha deve ter pelo menos 8 caractéres",
    senhaIguais: (val: string) => val === senha || "As senhas não correspondem",
  }

  const validarEmail = (valor: string) => {
    const formatoEmail = /^[^\s@]+@alura\.com\.br$/

    if (!formatoEmail.test(valor)) {
      console.error("Endereço de e-mail inválido para este domínio")
      return false
    }
    return true
  }

  return (
    <>
      <Titulo>Insira alguns dados básicos:</Titulo>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <Fieldset>
          <Label htmlFor="campo-nome">Nome</Label>
          <Input
            id="campo-nome"
            placeholder="Digite seu nome completo"
            type="text"
            $error={!!errors.nome}
            {...register("nome", {
              required: "O campo de nome é obrigatório",
              minLength: {
                value: 3,
                message: "O nome deve vonter pelo menos 3 caractéres",
              },
            })}
          />
          {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="campo-email">E-mail</Label>
          <Input
            id="campo-email"
            placeholder="Insira seu endereço de email"
            type="email"
            $error={!!errors.email}
            {...register("email", {
              required: "O campo de e-mail é obrigatório",
              validate: validarEmail,
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label>Telefone</Label>
          <Input
            id="campo-telefone"
            type="text"
            placeholder="Ex: (DD) XXXXX-XXXX"
            $error={!!errors.telefone}
            {...register("telefone", {
              pattern: {
                value: /^\(\d{2,3}\) \d{5}-\d{4}$/,
                message: "O telefone inserido está no formato incorreto",
              },
              required: "O campo de telefone é obrigatório",
            })}
          />
          {errors.telefone && (
            <ErrorMessage>{errors.telefone.message}</ErrorMessage>
          )}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="campo-senha">Crie uma senha</Label>
          <Input
            id="campo-senha"
            placeholder="Crie uma senha"
            type="password"
            $error={!!errors.senha}
            {...register("senha", {
              required: "O campo de senha é obrigatório",
              minLength: {
                value: 8,
                message: "A senha deve ter pelo menos 8 caractéres",
              },
            })}
          />
          {errors.senha && <ErrorMessage>{errors.senha.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="campo-senha-confirmacao">Repita a senha</Label>
          <Input
            id="campo-senha-confirmacao"
            placeholder="Repita a senha anterior"
            type="password"
            $error={!!errors.senhaVerificada}
            {...register("senhaVerificada", {
              required: "Necessário repetir a senha neste campo",
              validate: validaSenha,
            })}
          />
          {errors.senhaVerificada && (
            <ErrorMessage>{errors.senhaVerificada.message}</ErrorMessage>
          )}
        </Fieldset>

        <Button type="submit">Avançar</Button>
      </Form>
    </>
  )
}

export default CadastroPessoal
