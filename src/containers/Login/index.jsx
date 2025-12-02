import { Container, LeftContainer, RightContainer, Title, InputContainer, Link} from "./style";
import  Logo  from "../../assets/Logo.png";

import  { Button }  from "../../components/Button/";

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

        <form>
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
        </form>
      

      <p>
      Ainda não possui uma conta?<a> Clique aqui.</a>
      </p>

      </RightContainer>
    </Container>
  );
}
