import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { api } from "../../../services/api.js";
import { Container, ProductImage, EditButton } from "./styles.js";
import { CheckCircle, Pencil, XCircle } from "@phosphor-icons/react";
import { formatPrice } from '../../../utils/FormatPrice.js';
import { useNavigate } from 'react-router-dom'; // <-- Erro aqui


export function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Mova a função isOffer para fora do useEffect, dentro do componente Products
    function isOffer(offer) {
        if (offer === true) { // Ou simplesmente 'if (offer)' se 'offer' for sempre um booleano
            return <CheckCircle color="#228B22" size={20} />; // Adicione cores para melhor visualização
        } else {
            return <XCircle color="#FF0000" size={20} />; // Adicione cores para melhor visualização
        }
    }
    function editProduct(product) {
        navigate("/admin/editar-produto", { state: { product } });
    }

    useEffect(() => {
        async function loadProducts() {
            const { data } = await api.get('/products');
            setProducts(data);
        }
        loadProducts();
    }, []); // O array de dependências vazio significa que ele roda apenas uma vez ao montar

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome do Produto</TableCell>
                            <TableCell align="center">Preço</TableCell>
                            <TableCell align="center">Produtos em Oferta</TableCell>
                            <TableCell align="center">Imagem do Produto</TableCell>
                            <TableCell align="center">Editar Produto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => ( // Renomeado 'products' para 'product' para clareza
                            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{product.name}</TableCell>
                                <TableCell align="center">{formatPrice(product.price)}</TableCell>
                                <TableCell align="center">{isOffer(product.offer)}</TableCell> 
                                <TableCell align="center"><ProductImage src={product.url} /></TableCell>
                                <TableCell align="center"><EditButton onClick={() => editProduct(product)}><Pencil/></EditButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
