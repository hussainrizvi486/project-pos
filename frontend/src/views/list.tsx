import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  Table,
  createColumnHelper,
  flexRender,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';

// import { } from "@components";



const columnHelper = createColumnHelper();
const tempData = [
  { name: 'John', age: 30, location: 'New York' },
  { name: 'Jane', age: 25, location: 'San Francisco' },
];


interface DataTableProps<TData, TColumns> {
  columns: ColumnDef<TData, TColumns>,
  data: TData,
}


const tempColumns = [
  columnHelper.accessor("name", {
    header: () => "User name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("location", {
    header: () => "Location",
    cell: (info) => info.getValue(),
  }),
]



// DataTableProps

export const ListView = <TData, TColumns extends object>({ data = tempData, columns = tempColumns }: DataTableProps<TData, TColumns>) => {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    // debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  console.log(table.getState().sorting)

  return (

    <table className='border w-full'>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (

          <tr key={headerGroup.id}
            className="border-b text-gray-800 uppercase">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-2 py-2 font-medium text-left text-sm"
              >
                <div className='flex items-center gap-1'>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none flex min-w-[36px]'
                          : '',
                      }}
                    >
                      <SortingDropdown column={header.column} table={table} />
                    </div>
                  )}
                </div>
              </th>

            ))}
          </tr>
        ))}

      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr className="border-b" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
              className="px-2 py-2 font-medium text-left text-sm"
               key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const SortingDropdown = ({ column, table }) => {
  const options = [
    { label: "Ascending", value: { id: column.id, desc: false } },
    { label: "Descending", value: { id: column.id, desc: true } },
  ];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (!value) {
      return
    }

    if (value == "reset") {
      table.setSorting([]);
    }

    else {
      column.toggleSorting(JSON.parse(value).desc);
    }
  };

  return (
    <select onChange={handleSortChange} defaultValue="">
      <option value=""></option>
      <option value="reset">Reset</option>
      {options.map((option, index) => (
        <option key={index} value={JSON.stringify(option.value)}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
