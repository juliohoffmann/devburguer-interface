import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import { Row } from './row.jsx';
import { api } from '../../../services/api.js';
import { Filter, FilterOptions } from './styles.js';
import { orderStatusOptions } from './orderStatus.js';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [rows, setRows] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState(0);

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get('orders');
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      }
    }
    loadOrders();
  }, []);

  useEffect(() => {
    if (filteredOrders.length === 0) return;

    const newRows = filteredOrders.map((order) => ({
      name: order.user?.name || 'Cliente não identificado',
      orderId: order._id,
      date: order.createdAt,
      status: order.status,
      products: order.products || [],
    }));

    setRows(newRows);
  }, [filteredOrders]);

  function handleStatus(status) {
    if (status.id === 0) {
      setFilteredOrders(orders);
    } else {
      const newOrders = orders.filter((order) => order.status === status.value);
      setFilteredOrders(newOrders);
    }
    setActiveStatus(status.id);
  }

  useEffect(() => {
    if (activeStatus === 0) { // ← CORRIGIDO
      setFilteredOrders(orders);
    } else {
      const statusIndex = orderStatusOptions.findIndex((item) => item.id === activeStatus);
      const newOrders = orders.filter(
        (order) => order.status === orderStatusOptions[statusIndex].value
      );
      setFilteredOrders(newOrders);
    }
  }, [orders, activeStatus]); // ← adicionei activeStatus como dependência

  return (
    <>
      <Filter>
        {orderStatusOptions.map((status) => (
          <FilterOptions
            key={status.id}
            onClick={() => handleStatus(status)}
            $isActiveStatus={activeStatus === status.id}
          >
            {status.label}
          </FilterOptions>
        ))}
      </Filter>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID do Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Data do Pedido</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Carregando pedidos...
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <Row
                  key={row.orderId}
                  row={row}
                  orders={orders}
                  setOrders={setOrders}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
