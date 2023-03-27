import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useRef, useState } from 'react';
import { makeData, Person } from './makeData';
import cx from 'classnames';

function App() {
  const [data, setData] = useState(makeData(100));

  const columns = useMemo(getColumns, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    columnResizeMode: 'onChange',
    initialState: {
      columnPinning: {
        left: ['age'],
        right: ['firstName'],
      },
    },
  });

  return (
    <div className='h-screen bg-slate-200 flex p-4'>
      <div
        id='table'
        className='flex-1 w-full max-w-full h-full max-h-full flex flex-col border border-gray-400 bg-white'
      >
        <div id='table-before' className='bg-slate-500'></div>
        <div
          id='table-root-wrapper'
          className='min-w-full w-full max-h-full overflow-hidden'
        >
          <div
            id='table-root'
            className='flex items-start flex-nowrap max-h-full w-full min-w-full max-w-full'
          >
            <div
              id='table-header'
              className='flex justify-between items-start bg-gray-100 font-medium max-h-full min-w-full w-full max-w-full overflow-hidden'
            >
              <div
                id='pinning-left'
                style={{ width: table.getLeftTotalSize() }}
                className='border-r border-gray-400'
              >
                {table.getLeftHeaderGroups().map((headerGroup) => (
                  <div className='flex flex-nowrap'>
                    {headerGroup.headers.map((header) => (
                      <div
                        style={{ width: header.getSize() }}
                        className='flex justify-start items-center p-6 truncate relative border-b border-gray-400'
                      >
                        <span className='truncate'>
                          {header.isPlaceholder ? (
                            <span>&#8203;</span>
                          ) : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          )}
                        </span>
                        {header.isPlaceholder ? null : (
                          <div
                            className='z-10 absolute h-1/3 border-2 border-transparent bg-gray-300 cursor-col-resize select-none hover:bg-gray-500'
                            style={{ width: 1, right: -2 }}
                            onMouseDown={header.getResizeHandler()}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div
                id='center'
                className='border-r border-gray-400 flex-1 overflow-hidden'
                // style={{ width: table.getCenterTotalSize() }}
              >
                <div style={{ width: table.getCenterTotalSize() }}>
                  {table.getCenterHeaderGroups().map((headerGroup) => (
                    <div className='flex flex-nowrap'>
                      {headerGroup.headers.map((header) => (
                        <div
                          style={{ width: header.getSize() }}
                          className='flex justify-start items-center p-6 truncate relative border-b border-gray-400'
                        >
                          <span className='truncate'>
                            {header.isPlaceholder ? (
                              <span>&#8203;</span>
                            ) : (
                              flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )
                            )}
                          </span>
                          {header.isPlaceholder ? null : (
                            <div
                              className='z-10 absolute h-1/3 border-2 border-transparent bg-gray-300 cursor-col-resize select-none hover:bg-gray-500'
                              style={{ width: 1, right: -2 }}
                              onMouseDown={header.getResizeHandler()}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div
                id='right'
                className='border-r border-gray-400'
                style={{ width: table.getRightTotalSize() }}
              >
                {table.getRightHeaderGroups().map((headerGroup) => (
                  <div className='flex flex-nowrap'>
                    {headerGroup.headers.map((header) => (
                      <div
                        style={{ width: header.getSize() }}
                        className='flex justify-start items-center p-6 truncate relative border-b border-gray-400'
                      >
                        <span className='truncate'>
                          {header.isPlaceholder ? (
                            <span>&#8203;</span>
                          ) : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          )}
                        </span>
                        {header.isPlaceholder ? null : (
                          <div
                            className='z-10 absolute h-1/3 border-2 border-transparent bg-gray-300 cursor-col-resize select-none hover:bg-gray-500'
                            style={{ width: 1, right: -2 }}
                            onMouseDown={header.getResizeHandler()}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div id='table-body'></div>
            <div id='table-footer'></div>
          </div>
          {/* <ControlPanel /> */}
        </div>
        <div id='after' className='bg-slate-500'></div>
      </div>
    </div>
  );
}

function ControlPanel() {
  const [activeTab, setActiveTab] = useState<'columns' | 'filters' | null>(
    'columns'
  );
  const resizerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // useEvent(
  //   'drag',
  //   (e) => {
  //     const panel = panelRef.current;
  //     if (!panel) return;

  //     const rect = (panel as HTMLDivElement).getBoundingClientRect();
  //     const resizer = (e.target as HTMLDivElement);
  //     console.log(e.currentTarget.);
  //   },
  //   resizerRef.current
  // );

  const getTabToggleHandler = (tab: 'columns' | 'filters') => () => {
    if (activeTab === tab) setActiveTab(null);
    else setActiveTab(tab);
  };

  return (
    <div id='control-panel' className='relative flex flex-row-reverse'>
      <div id='control-panel-tabs' style={{ width: 30 }}>
        <div onClick={getTabToggleHandler('columns')}>Columns</div>
        <div onClick={getTabToggleHandler('filters')}>Filters</div>
      </div>
      <div
        ref={panelRef}
        id='control-panel-content'
        className={cx('bg-red-100', { hidden: activeTab === null })}
        style={{ width: 300 }}
      >
        {activeTab === 'columns' ? 'columns' : 'filters'}
      </div>
      <div
        id='control-panel-resizer'
        style={{ zIndex: 1, left: -3 }}
        className={cx(
          'cursor-col-resize absolute h-full w-1 select-none hover:bg-cyan-400',
          {
            hidden: activeTab === null,
          }
        )}
        ref={resizerRef}
      />
    </div>
  );
}

const helper = createColumnHelper<Person>();

const getColumns = (): ColumnDef<Person>[] => [
  {
    header: 'Name',
    columns: [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        header: () => <span>Last Name</span>,
        cell: (info) => info.getValue(),
      },
    ],
  },
  {
    header: 'Info',
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        aggregatedCell: ({ getValue }) =>
          Math.round(getValue<number>() * 100) / 100,
        aggregationFn: 'median',
      },
      {
        header: 'More Info',
        columns: [
          {
            accessorKey: 'visits',
            header: () => <span>Visits</span>,
            aggregationFn: 'sum',
            // aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
          },
          {
            accessorKey: 'status',
            header: 'Status',
          },
          {
            accessorKey: 'progress',
            header: 'Profile Progress',
            cell: ({ getValue }) =>
              Math.round(getValue<number>() * 100) / 100 + '%',
            aggregationFn: 'mean',
            aggregatedCell: ({ getValue }) =>
              Math.round(getValue<number>() * 100) / 100 + '%',
          },
        ],
      },
    ],
  },
];

export default App;
