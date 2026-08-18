import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { DataTable, type DataTableColumn, type DataTableQuery } from '@/components/ui/DataTable';
import ConfirmDialog from '@/components/ui/Modal/ConfirmDialog';
import { useDeleteUserMutation, useExportUsersMutation, useGetUsersQuery, useGetUsersTableConfigQuery, type User } from '../api/userApi';
import type { DataTableRowAction } from '@/components/ui/DataTable/types';
import { UserPlus } from 'lucide-react';
import PageHeader from '@/components/layouts/PageHeader';

export default function UserList() {
    const navigate = useNavigate();
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [query, setQuery] = useState<DataTableQuery>({
        page: 1,
        limit: 10,
        search: '',
        filters: {},
    });
    const { data: usersResponse, isLoading: usersLoading } = useGetUsersQuery(query);
    const { data: tableConfig, isLoading: configLoading } = useGetUsersTableConfigQuery();
    const [ deleteUser, { isLoading: deleteLoading } ] = useDeleteUserMutation();
    const [ exportUsers, { isLoading: exportLoading } ] = useExportUsersMutation();
    const handleDelete = (user: User) => { setUserToDelete(user); };

    const confirmDelete = async () => {
        if (!userToDelete) return;

        try {
            const result = await deleteUser(userToDelete.id).unwrap();
            toast.success(result.message);
        } catch (error) {
            toast.error('Failed to delete user.');
        } finally {
            setUserToDelete(null);
        }
    };

    const handleExport = async (exportQuery: DataTableQuery) => {
        try {
            const url = await exportUsers(exportQuery).unwrap();
            const timestamp = new Date().toISOString().replace('T', '_').replace(/:/g, '-').replace(/\..+/, '');
            const link = document.createElement('a');
            link.href = url;
            link.download = `userList_${timestamp}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => { URL.revokeObjectURL(url); }, 1000);
        } catch (error) {
            toast.error('Failed to export users.');
        }
    };

    const rowActions: DataTableRowAction<User>[] = [
        {
            label: 'Edit',
            icon: <Pencil size={17} />,
            className: 'text-custom-gray hover:text-primary',
            onClick: (user) => { navigate(`/users/${user.id}/edit`); }
        },
        {
            label: 'Delete',
            icon: <Trash2 size={17} />,
            className: 'text-custom-gray hover:text-danger',
            onClick: handleDelete
        },
    ];

    const columns =
        useMemo<DataTableColumn<User>[]>(() => {
            if (!tableConfig)  return [];

            return tableConfig.columns.map((column) => {
                    const baseColumn: DataTableColumn<User> =
                    {
                        key: column.key as keyof User & string,
                        label: column.label,
                        visible: column.visible,
                        sortable: column.sortable,
                        searchable: column.searchable,
                        exportable: column.exportable,
                        filter: column.filter,
                    };

                    //Email verification status
                    if (column.key === 'isEmailVerified') {
                        baseColumn.render = (value) => (
                            <span className={ value ? 'text-bottle-green' : 'text-mahogany-red'}>
                                {value ? 'Verified' : 'Not Verified'}
                            </span>
                        );
                    }

                    //Role
                    if (column.key === 'role') {
                        baseColumn.render = (value) => (
                            <span>
                                {value ? ( value as User['role'])?.name : '—'}
                            </span>
                        );
                    }

                    // Email verified date
                    if (column.key === 'emailVerifiedAt') {
                        baseColumn.render = (value) => {
                            if (!value) {
                                return (
                                    <span className="text-muted">
                                        —
                                    </span>
                                );
                            }

                            return new Date(String(value)).toLocaleDateString('en-GB',
                                    {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    },
                                ).replace(/ /g, '-');
                        };
                    }

                    // Activity status
                    if (column.key === 'isActive') {
                        baseColumn.render = (value) => (
                            <span className={value ? 'text-bottle-green' : 'text-mahogany-red'}>
                                {value ? 'Active' : 'Inactive'}
                            </span>
                        );
                    }

                    //Registered date
                    if (column.key === 'createdAt') {
                        baseColumn.render = (value) => {
                            const date = new Date(String(value));

                            return date.toLocaleDateString('en-GB',
                                    {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    },
                                ).replace(/ /g, '-');
                        };
                    }

                    return baseColumn;
                },
            );
        }, [tableConfig]);

    return (
        <div>
            <PageHeader
                title="Users"
                subTitle="Manage system users."
                button={true}
                buttonText="Create User"
                icon={<UserPlus size={17} />}
                onClick='/users/create'
            />

            <DataTable
                columns={columns}
                data={usersResponse?.data ?? []}
                loading={usersLoading || configLoading}
                storageKey="users-table-columns"
                showSerialNumber
                onQueryChange={setQuery}
                onExport={handleExport}
                exportLoading={exportLoading}
                total={usersResponse?.meta.total ?? 0}
                totalPages={usersResponse?.meta.totalPages ?? 1}
                rowActions={rowActions}
            />

            <ConfirmDialog
                open={userToDelete !== null}
                title="Delete user?"
                message={
                    <>
                        Are you sure you want to
                        delete{' '}
                        <strong className="text-foreground">
                            {userToDelete?.name}
                        </strong>
                        ? This action cannot be
                        undone.
                    </>
                }
                confirmLabel="Delete"
                cancelLabel="Cancel"
                loading={deleteLoading}
                onCancel={() => {
                    if (!deleteLoading) {
                        setUserToDelete(null);
                    }
                }}
                onConfirm={confirmDelete}
            />
        </div>
    );
}