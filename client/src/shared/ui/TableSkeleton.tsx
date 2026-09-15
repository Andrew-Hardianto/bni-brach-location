import React from 'react';
import { Table } from 'react-bootstrap';

const SkeletonRow = ({ columns }) => (
    <tr>
        {Array.from({ length: columns }).map((_, idx) => (
            <td key={idx}>
                <div className="skeleton-box" style={{ height: '20px', width: '100%', borderRadius: '4px' }}></div>
            </td>
        ))}
    </tr>
);

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
    return (
        <div className="table-responsive">
            <Table className="react-bootstrap-table table" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        {Array.from({ length: columns }).map((_, idx) => (
                            <th key={idx}>
                                <div className="skeleton-box" style={{ height: '24px', width: '80%', borderRadius: '4px' }}></div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, idx) => (
                        <SkeletonRow key={idx} columns={columns} />
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TableSkeleton;
