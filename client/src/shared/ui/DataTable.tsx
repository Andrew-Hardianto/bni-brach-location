import React, { useMemo, useState, useEffect } from 'react';
import { Table, Pagination, Row, Col, Form } from 'react-bootstrap';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    SortingState,
} from '@tanstack/react-table';

export interface DataTableProps {
    data: any[];
    columns: any[];
    pagination: {
        currentPage: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    };
    onPaginationChange: (page: number, limit: number) => void;
    onSearch?: (keyword: string) => void;
    keyword?: string;
    searchPlaceholder?: string;
    actionButtons?: React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({
    data,
    columns,
    pagination,
    onPaginationChange,
    onSearch,
    keyword = '',
    searchPlaceholder = 'Cari...',
    actionButtons,
}) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    // Internal state for search input to prevent firing API request on every keystroke immediately
    const [localSearch, setLocalSearch] = useState(keyword);

    useEffect(() => {
        setLocalSearch(keyword);
    }, [keyword]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (onSearch && localSearch !== keyword) {
                onSearch(localSearch);
                onPaginationChange(1, pagination.limit); // reset to page 1 on search
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [localSearch, onSearch, keyword, pagination.limit, onPaginationChange]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: pagination.totalPages,
    });

    const renderPaginationItems = () => {
        const items = [];
        const { currentPage, totalPages } = pagination;
        const maxPagesToShow = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        items.push(
            <Pagination.First key="first" onClick={() => onPaginationChange(1, pagination.limit)} disabled={currentPage === 1} />
        );
        items.push(
            <Pagination.Prev key="prev" onClick={() => onPaginationChange(currentPage - 1, pagination.limit)} disabled={currentPage === 1} />
        );

        if (startPage > 1) {
            items.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
        }

        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => onPaginationChange(number, pagination.limit)}>
                    {number}
                </Pagination.Item>
            );
        }

        if (endPage < totalPages) {
            items.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
        }

        items.push(
            <Pagination.Next key="next" onClick={() => onPaginationChange(currentPage + 1, pagination.limit)} disabled={currentPage === totalPages || totalPages === 0} />
        );
        items.push(
            <Pagination.Last key="last" onClick={() => onPaginationChange(totalPages, pagination.limit)} disabled={currentPage === totalPages || totalPages === 0} />
        );

        return items;
    };

    return (
        <div>
            <Row className="mb-3">
                <Col sm={9} className="mb-2">
                    {actionButtons}
                </Col>
                {onSearch && (
                    <Col sm={3}>
                        <Form.Control
                            type="text"
                            placeholder={searchPlaceholder}
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                        />
                    </Col>
                )}
            </Row>

            <div className="table-responsive">
                <Table hover bordered className="text-nowrap">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-4">
                                    Tidak ada data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            <Row className="mt-3 align-items-center">
                <Col sm={12} md={6} className="text-center text-md-left mb-3 mb-md-0">
                    <span className="text-muted">
                        Menampilkan {(pagination.currentPage - 1) * pagination.limit + (data.length > 0 ? 1 : 0)} sampai {(pagination.currentPage - 1) * pagination.limit + data.length} dari {pagination.totalItems} baris
                    </span>
                </Col>
                <Col sm={12} md={6} className="d-flex justify-content-center justify-content-md-end">
                    <Pagination className="mb-0">{renderPaginationItems()}</Pagination>
                </Col>
            </Row>
        </div>
    );
};

export default DataTable;

