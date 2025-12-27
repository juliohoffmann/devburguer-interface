import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Form, InputGroup, Input, Label, LabelUpload, Select, SubmitButton, ErrorMessage, CheckboxContainer } from "./styles.js";
import { Image } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { api } from "../../../services/api.js";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        file: yup.mixed()
            .test('required', 'Faça o upload da imagem do produto', (value) => {
                return value && value.length > 0;
            })
            .test('fileSize', 'O arquivo é muito grande. O tamanho máximo é 5MB', (value) => {
                return value && value[0] && value[0].size <= 5000000;
            })
            .test('type', 'Tipo de arquivo não suportado. Apenas PNG e JPEG são aceitos', (value) => {
                return value && value[0] && ['image/jpeg', 'image/png'].includes(value[0].type);
            }),
    })
    .required();

export function NewProducts() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

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
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const watchedFile = watch("file");

    useEffect(() => {
        if (watchedFile && watchedFile.length > 0) {
            setFileName(watchedFile[0].name);
        } else {
            setFileName("Upload do produto");
        }
    }, [watchedFile]);

    const onSubmit = async (data) => {
        const productFormData = new FormData();
        productFormData.append("name", data.name);
        productFormData.append("price", data.price);
        productFormData.append("category_id", data.category);
        productFormData.append("file", data.file[0]);
        productFormData.append("offer", data.offer);

        try {
            await toast.promise(api.post("/products", productFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }), {
                pending: 'Adicionando produto...',
                success: 'Produto adicionado com sucesso!',
                error: 'Erro ao adicionar o produto.'
            });
        } catch (error) {
            console.error("Erro no envio do produto:", error);
        }

        setTimeout(() => navigate('/admin/produtos'), 2000);
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
                                // Ajuste aqui: 'value' deve ser o objeto completo da categoria
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

                <CheckboxContainer>
                    <input type="Checkbox" {...register("offer")} /> {/* Valor inicial vem de defaultValues */}
                    <Label>Produto em oferta ?</Label>
                </CheckboxContainer>

                <SubmitButton type="submit">Adicionar Produto</SubmitButton>
            </Form>
        </Container>
    );
}
