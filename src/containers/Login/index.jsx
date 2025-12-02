import { Container, LeftContainer, RightContainer, Title, Form, InputContainer, Link, Button} from "./style";
import  Logo  from "../../assets/Logo.png";

import { Button } from "../../components/Button/index.jsx";


export function Login() {
   
  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="Logo DevBurguer" />
      </LeftContainer>

      <RightContainer>
        <Title>
          Olá, seja bem vindo ao <span>Dev Burger!</span>
          <br />
         Acesse com seu <span>Login e Senha.</span>
        </Title>

        <Form>
          <InputContainer>
            <label>Email</label>
            <input type="email" />
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password" />
          </InputContainer>

          <Link>
          Esqueci minha senha
          </Link>
          <br />
          <Button>
            Entrar
          </Button>
        </Form>
      

      <p>
      Ainda não possui uma conta?<a> Clique aqui.</a>
      </p>

      </RightContainer>
    </Container>
  );
}
