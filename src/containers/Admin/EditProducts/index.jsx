import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Form, InputGroup, Input, Label, LabelUpload, Select, SubmitButton, ErrorMessage, CheckboxContainer } from "./styles.js";
import { Image } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../services/api.js";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

// O esquema de validação para edição pode ser um pouco diferente,
// pois o arquivo não é obrigatório.
const schema = yup.object({
  name: yup.string().required("Digite o nome"),
  price: yup.number().positive("O preço deve ser um número positivo").required("Digite o preço do produto"),
  category: yup.object().required("Escolha uma categoria"),
  offer: yup.boolean(),
  // O campo 'file' não é obrigatório na edição, pois o usuário pode não querer mudar a imagem.
  // Se você quiser validar que é um arquivo se ele for fornecido, pode adicionar:
  // file: yup.mixed().test('fileSize', 'O arquivo é muito grande', (value) => {
  //   if (!value || !value[0]) return true; // Não é obrigatório
  //   return value[0].size <= 5000000; // Exemplo: 5MB
  // }).test('fileType', 'Formato de arquivo inválido', (value) => {
  //   if (!value || !value[0]) return true; // Não é obrigatório
  //   return ['image/jpeg', 'image/png'].includes(value[0].type);
  // }),
});

export function EditProducts() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const {
    state: { product },
  } = useLocation();

  // console.log("Produto recebido:", product); // Para debug

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        toast.error("Erro ao carregar categorias.");
      }
    }
    loadCategories();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset, // Adicione reset para definir os valores iniciais
    watch, // Adicione watch para observar mudanças no campo de arquivo
  } = useForm({
    resolver: yupResolver(schema),
    // Defina os valores iniciais do formulário com os dados do produto
    defaultValues: {
      name: product.name,
      price: product.price / 100, // Divida por 100 se você armazena em centavos
      category: product.category, // O objeto completo da categoria
      offer: product.offer,
      // file não é definido aqui, pois é um campo de upload
    },
  });

  // Observe o campo 'file' para atualizar o nome do arquivo exibido
  const watchedFile = watch("file");
  useEffect(() => {
    if (watchedFile && watchedFile[0]) {
      setFileName(watchedFile[0].name);
    } else if (product.path) {
      // Se não há novo arquivo, exibe o nome do arquivo existente (se houver)
      // Você pode extrair o nome do arquivo do 'path' do produto
      const parts = product.path.split('/');
      setFileName(parts[parts.length - 1]);
    } else {
      setFileName("Selecione a imagem");
    }
  }, [watchedFile, product.path]);


  const onSubmit = async (data) => {
    const productFormData = new FormData();
    productFormData.append("name", data.name);
    productFormData.append("price", data.price * 100); // Multiplique por 100 novamente para enviar em centavos
    productFormData.append("category_id", data.category.id);
    productFormData.append("offer", data.offer);

    // Apenas adicione o arquivo se um novo arquivo foi selecionado
    if (data.file && data.file[0]) {
      productFormData.append("file", data.file[0]);
    }

    try {
      await toast.promise(api.put(`/products/${product.id}`, productFormData), {
        pending: "Editando o produto...",
        success: "Produto editado com sucesso",
        error: "Falha ao editar o produto, tente novamente!",
      });
      setTimeout(() => {
        navigate("/admin/produtos");
      }, 2000);
    } catch (error) {
      console.error("Erro ao editar produto:", error);
      // toast.error já é tratado pelo toast.promise, mas você pode adicionar mais lógica aqui se precisar
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>Nome:</Label>
          <Input type="text" {...register("name")} />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Preço:</Label>
          <Input type="number" step="0.01" {...register("price")} />
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <LabelUpload htmlFor="image-upload">
            <Image />
            <input
              id="image-upload"
              type="file"
              accept="image/png, image/jpeg"
              {...register("file")}
              style={{ display: 'none' }}
            />
            <span>{fileName}</span>
          </LabelUpload>
          {/* O erro de arquivo só deve aparecer se o usuário tentar enviar um arquivo inválido */}
          <ErrorMessage>{errors?.file?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Categoria:</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                // O valor do Select deve ser o objeto completo da categoria para que ele possa exibir o nome
                // E o onChange deve atualizar o field.value com o objeto completo da categoria
                value={field.value || null} // Garante que o valor inicial seja o objeto completo ou null
                onChange={(selectedOption) => field.onChange(selectedOption)} // Atualiza com o objeto completo
                options={categories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => category.id}
                placeholder="Categorias"
                menuPortalTarget={document.body}
              />
            )}
          />
          <ErrorMessage>{errors?.category?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <CheckboxContainer>
            <input type="checkbox" {...register("offer")} />
            <Label>Produto em oferta ?</Label>
          </CheckboxContainer>
        </InputGroup>

        <SubmitButton type="submit">Editar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
