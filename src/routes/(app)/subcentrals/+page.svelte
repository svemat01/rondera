<script lang="ts">
    import type { ColumnDef, TableOptions } from '@tanstack/svelte-table';
    import { createSvelteTable, flexRender, getCoreRowModel } from '@tanstack/svelte-table';
    import { writable } from 'svelte/store';

    import type { SubCentral } from '$db/types/subcentral.js';

    import type { PageData } from './$types';

    export let data: PageData;

    const columns: ColumnDef<SubCentral>[] = [
        {
            accessorKey: 'name',
            header: 'Namn',
            cell: (row) => row.getValue(),
        },
        {
            accessorKey: 'description',
            header: 'Beskrivelse',
            cell: (row) => row.getValue(),
        },
    ];

    const options = writable<TableOptions<SubCentral>>({
        data: data.subcentrals!,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const table = createSvelteTable(options);
</script>

<h1>Undercentraler</h1>

<table>
    <thead>
        {#each $table.getHeaderGroups() as headerGroup}
            <tr>
                {#each headerGroup.headers as header}
                    <th>
                        {#if !header.isPlaceholder}
                            <svelte:component
                                this={flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                )}
                            />
                        {/if}
                    </th>
                {/each}
            </tr>
        {/each}
    </thead>
    <tbody>
        {#each $table.getRowModel().rows as row}
            <a href={`/subcentrals/${row.original.id}`} style='display: contents; color: inherit;'>
                <tr>
                    {#each row.getVisibleCells() as cell}
                        <td>
                            <svelte:component
                                this={flexRender(cell.column.columnDef.cell, cell.getContext())}
                            />
                        </td>
                    {/each}
                </tr>
            </a>
        {/each}
    </tbody>
</table>

<a href="/subcentrals/create" class="button">
    Skapa undercentral
</a>

<style lang="scss">
    /* Make a rounded table */
    table {
        border-collapse: collapse;
        border-radius: 0.3rem;
        overflow: hidden;

        width: 100%;
        max-width: 900px;

        margin-top: 1rem;

        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }

    th, td {
        padding: 0.75rem 1rem;
    }

    /* Make the header */
    thead {
        tr {
            background-color: $blue-600;
            color: $stone-50;
            text-align: left;
            font-weight: bold;
        }
    }

    /* Make the body */
    tbody {
        tr {
            border-bottom: 1px solid $stone-200;
            background-color: $stone-100;

            transition: background-color 0.1s ease-in-out; 

            &:hover {
                background-color: $stone-150;
            }
        }
    }

    a.button {
        display: inline-block;
        padding: 0.75rem 1rem;
        margin-top: 1rem;
        border-radius: 0.3rem;

        background-color: $blue-600;
        color: #ffffff;
        text-decoration: none;
        font-size: 1.1rem;
        font-weight: 500;

        transition: background-color 0.2s ease-in-out;

        &:hover {
            background-color: $blue-700;
        }
    }
</style>
