import React, { useState } from 'react';

const SpreadsheetConverter = () => {
  const [tableData, setTableData] = useState([
    ['ID', 'Name', 'Age', 'Country', 'Email', 'Occupation'],
    ['', '', '', '', '', ''],
  ]);
  const [copySuccess, setCopySuccess] = useState(false);

  const addRow = () => {
    setTableData([...tableData, Array(tableData[0].length).fill('')]);
  };

  const addColumn = () => {
    const newData = tableData.map(row => [...row, '']);
    setTableData(newData);
  };

  const removeRow = (rowIndex) => {
    if (tableData.length <= 2) return;
    const newData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(newData);
  };

  const removeColumn = (colIndex) => {
    if (tableData[0].length <= 1) return;
    const newData = tableData.map(row => row.filter((_, index) => index !== colIndex));
    setTableData(newData);
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  const isDataEmpty = () => {
    return tableData.slice(1).every(row => row.every(cell => cell === ''));
  };

  const formatDataForCopy = () => {
    const formattedData = tableData.map(row => row.join('~~')).join('~~');
    return formattedData;
  };

  const handleCopy = async () => {
    try {
      const formattedData = formatDataForCopy();
      await navigator.clipboard.writeText(formattedData);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Client Details</h1>
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
              copySuccess 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white text-sm font-medium`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {copySuccess ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              )}
            </svg>
            {copySuccess ? 'Copied!' : 'Copy Data'}
          </button>
        </div>
        
        <div className="flex gap-6">
          {/* Left side - Table */}
          <div className="w-[65%] bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    {tableData[0].map((header, colIndex) => (
                      <th key={colIndex} className="border-b border-gray-200">
                        <div className="flex items-center px-4 py-3 w-[200px]">
                          <input
                            type="text"
                            value={header}
                            onChange={(e) => handleCellChange(0, colIndex, e.target.value)}
                            className="w-full bg-transparent font-medium text-gray-900 text-sm focus:outline-none"
                            placeholder="Column Name"
                          />
                          <button
                            onClick={() => removeColumn(colIndex)}
                            className="ml-2 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                            title="Remove Column"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex} className="group">
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="border-b border-gray-200">
                          <div className="flex items-center w-[200px]">
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) => handleCellChange(rowIndex + 1, colIndex, e.target.value)}
                              className="w-full px-4 py-3 text-sm text-gray-900 focus:outline-none focus:bg-blue-50"
                              placeholder="Enter value"
                            />
                            {colIndex === row.length - 1 && (
                              <button
                                onClick={() => removeRow(rowIndex + 1)}
                                className="px-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all shrink-0"
                                title="Remove Row"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3 p-4 border-t border-gray-200 bg-white mt-auto">
              <button
                onClick={addRow}
                className="text-sm font-medium px-3 py-1.5 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m-8-8h16" />
                </svg>
                Add Row
              </button>
              <button
                onClick={addColumn}
                className="text-sm font-medium px-3 py-1.5 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m-8-8h16" />
                </svg>
                Add Column
              </button>
            </div>
          </div>

          {/* Right side - Preview */}
          <div className="w-[35%] bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200">
              <h2 className="text-sm font-medium text-gray-900">Preview</h2>
            </div>
            <div className="p-4">
              {!isDataEmpty() ? (
                <div className="font-mono text-xs text-gray-600 break-all">
                  {formatDataForCopy()}
                </div>
              ) : (
                <div className="text-sm text-gray-500 text-center py-4">
                  Enter data in the table to see preview
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetConverter; 