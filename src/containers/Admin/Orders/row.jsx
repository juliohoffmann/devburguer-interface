import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { useState } from 'react';
import PropTypes from 'prop-types';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { formatDate } from '../../../utils/FormatDate.js';
import { ProductImage, SelectStatus } from './styles.js';
import { orderStatusOptions } from './orderStatus.js';
import { api } from '../../../services/api.js';

export function Row(props) {  // ← CORRIGIDO
  const { row, orders, setOrders } = props;  // ← CORRIGIDO

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function newStatusOrder(id, status) {
    try {
      setLoading(true);
      await api.put(`orders/${id}`, { status });

      const newOrders = orders.map((order) => {
        if (order._id === id) {
          return { ...order, status };
        }
        return order;
      });

      setOrders(newOrders);
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderId}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{formatDate(row.date)}</TableCell>
        <TableCell>
          <SelectStatus
            options={orderStatusOptions.filter((status) => status.id !== 0)}
            placeholder="Status"
            defaultValue={
              orderStatusOptions.find((status) => status.value === row.status) || null
            }
            onChange={(status) => newStatusOrder(row.order.id, status.value)}
            isLoading={loading}
            menuPortalTarget={document.body}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Pedido
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Produto</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Imagem do Produto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(row.products || []).map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                        {product.quantity}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">{product.category}</TableCell>
                      <TableCell>
                        <ProductImage src={product.url} alt={product.name} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!row.products || row.products.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Nenhum produto neste pedido
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  orders: PropTypes.array.isRequired,
  setOrders: PropTypes.func.isRequired,
  row: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};
