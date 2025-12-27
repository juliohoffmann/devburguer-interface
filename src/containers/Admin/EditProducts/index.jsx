import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Form, InputGroup, Input, Label, LabelUpload, Select, SubmitButton, ErrorMessage, CheckboxContainer } from "./styles.js";
import { Image } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../services/api.js";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const schema = yup
    .object({
        name: yup.string().required('Digite o nome do produto'),
        price: yup
            .number()
            .typeError('O preço deve ser um número válido')
            .positive('O preço deve ser um valor positivo')
            .required('Digite o preço do produto'),
        category: yup.number().required('Selecione uma categoria').typeError('Selecione uma categoria válida'),
        offer: yup.boolean(),
        file: yup.mixed().nullable() // O arquivo é opcional na edição
    })
    .required();

export function EditProducts() {
    const { state: { product } } = useLocation();
    const [fileName, setFileName] = useState(product.path ? product.path.split('/').pop() : "Upload do produto"); // Inicializa com o nome do arquivo existente, se houver
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        reset, // Adicione reset para poder definir os valores iniciais
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { // Inicialize os valores do formulário aqui
            name: product.name,
            price: product.price / 100, // Ajuste para exibir o preço em formato decimal
            category: product.category_id, // Use o ID da categoria para o valor inicial
            offer: product.offer,
            // file não é inicializado aqui, pois é um campo de upload
        },
    });

    const watchedFile = watch("file");

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

    useEffect(() => {
        if (watchedFile && watchedFile.length > 0) {
            setFileName(watchedFile[0].name);
        } else if (product.path) { // Se não houver arquivo novo, mas houver um path existente
            setFileName(product.path.split('/').pop()); // Mantém o nome do arquivo existente
        } else {
            setFileName("Upload do produto"); // Caso não haja arquivo novo nem existente
        }
    }, [watchedFile, product.path]); // Adicione product.path como dependência

    const onSubmit = async (data) => {
        const productFormData = new FormData();
        productFormData.append("name", data.name);
        productFormData.append("price", data.price);
        productFormData.append("category_id", data.category);
        productFormData.append("offer", data.offer);

        // Adicione o arquivo APENAS se um novo arquivo foi selecionado
        if (data.file && data.file.length > 0) {
            productFormData.append("file", data.file[0]);
        }

        try {
            await toast.promise(api.put(`/products/${product.id}`, productFormData, { // <-- Use backticks (crases) aqui
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }), {
                pending: 'Alterando produto...',
                success: 'Produto alterado com sucesso!',
                error: 'Erro ao alterar o produto.'
            });
        } catch (error) {
            console.error("Erro no envio do produto:", error);
            toast.error("Erro ao alterar o produto."); // Adicione toast de erro aqui também
        }
        setTimeout(() => navigate('/admin/produtos'), 2000);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                    <Label>Nome:</Label>
                    <Input type="text" {...register("name")} /> {/* Valor inicial vem de defaultValues */}
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Preço:</Label>
                    <Input type="number" step="0.01" {...register("price")} /> {/* Valor inicial vem de defaultValues */}
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
                    <ErrorMessage>{errors?.file?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Categoria:</Label>
                    <Controller
                        name="category"
                        control={control}
                        // defaultValue é definido no useForm, mas aqui é importante para o Controller
                        // Ele usará o valor de defaultValues do useForm
                        render={({ field }) => (
                            <Select
                                {...field}
                                value={categories.find(cat => cat.id === field.value) || null}
                                onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.id : null)}
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
                        <input type="Checkbox" {...register("offer")} /> {/* Valor inicial vem de defaultValues */}
                        <Label>Produto em oferta ?</Label>
                    </CheckboxContainer>
                </InputGroup>

                <SubmitButton type="submit">Editar Produto</SubmitButton>
            </Form>
        </Container>
    );
}


