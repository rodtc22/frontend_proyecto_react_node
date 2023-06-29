import { useState } from "react";

const TablePagination = ({ columnas, datos, total, page, fetchData }) => {
  const [limit, setLimit] = useState(3);

  return (
    <div className="mt-8">
      <table className="w-full divide-y-1 divide-gray-200">
        <thead>
          <tr>
            {columnas.map((col, index) => (
              <th
                className="py-2 px-4 text-left text-sm font-medium uppercase"
                key={index}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-200">
          {datos.map((reg, index) => (
            <tr key={reg.id}>
              {columnas.map((col, pos) => (
                <td key={pos} className="py-2 px-4 text-gray-500 text-center">
                  {/* {dato[col]} */}
                  {/* ESTA FUNCION EVAL ES MUY UTIL PARA VOLVER TODO ESO EN UNA VARIABLE */}
                  {eval("reg." + col.key)}
                </td>
              ))}
              <td className="py-2 px-4 text-gray-500 text-center flex gap-1 ">
                <button
                  className="p-1 bg-green-500 text-white hover:bg-green-800 rounded"
                  onClick={() => handleShow(dato)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                <button
                  className="p-1 bg-blue-500 text-white hover:bg-blue-800 rounded"
                  onClick={() => handleEdit(dato)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
                <button
                  className="p-1 bg-red-500 text-white hover:bg-red-800 rounded"
                  onClick={() => {
                    handleErase(dato);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center m-4">
        <nav className="inline-flex rounded-md shadow">
          <button
            onClick={() => fetchData(page - 1)}
            disabled={page == 1}
            className="p-1 bg-gray-200 text-gray-500 hover:bg-gray-300  rounded-l-lg "
          >
            Anterior
          </button>
          {total > limit && (
            <div className="flex">
              {Array.from({ length: Math.ceil(total / limit) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => fetchData(index + 1)}
                    className={`${
                      page === index + 1 ? "bg-blue-500" : "bg-gray-200"
                    } py-1 px-3 focus:outline-none mx-1  text-white rounded-md`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          )}

          <button
            onClick={() => fetchData(page + 1)}
            disabled={page == Math.ceil(total / limit)}
            className="p-1 bg-gray-200 text-gray-500 hover:bg-gray-300  rounded-r-lg "
          >
            Siguiente
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TablePagination;
