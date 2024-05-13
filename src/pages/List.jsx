import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const List = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = await db.collection('pola-db').get();
        const fetchedData = dataRef.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await db.collection('pola-db').doc(id).delete();
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    setTimeout(() => {}, 2000);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter(
      (item) =>
        item.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lokasiGudang.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.noMobil.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.noPO.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tanggal.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-2">List Data</h2>
      <div className="flex justify-end space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by category"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 px-2 py-1 rounded-md"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-[#387ADF] text-white text-sm">
            <tr>
              <th className="border border-gray-200 px-2 py-2">No.</th>
              <th className="border border-gray-200 px-2 py-2">Kategori</th>
              <th className="border border-gray-200 px-2 py-2">
                Lokasi Gudang
              </th>
              <th className="border border-gray-200 px-2 py-2">No. Mobil</th>
              <th className="border border-gray-200 px-2 py-2">No. ID</th>
              <th className="border border-gray-200 px-2 py-2">
                No. Surat Jalan
              </th>
              <th className="border border-gray-200 px-2 py-2">No. PO</th>
              <th className="border border-gray-200 px-2 py-2">No. Roll</th>
              <th className="border border-gray-200 px-2 py-2">Tanggal</th>
              <th className="border border-gray-200 px-2 py-2">Kilogram</th>
              <th className="border border-gray-200 px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={item.id}
                className={
                  index % 2 === 0 ? 'bg-white text-sm' : 'bg-gray-100 text-sm'
                }>
                <td className="border border-gray-200 text-center px-2 py-2">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="border border-gray-200 text-center px-2 py-2">
                  {item.kategori}
                </td>
                <td className="border border-gray-200 text-center px-2 py-2">
                  {item.lokasiGudang}
                </td>
                <td className="border border-gray-200 text-center px-2 py-2">
                  {item.noMobil}
                </td>
                <td className="border border-gray-200 text-center px-2 py-2">
                  {item.noID}
                </td>
                <td className="border border-gray-200 text-center px-2 py-2">
                  {item.noSuratJalan}
                </td>
                <td className="border border-gray-200 text-center px-2 py-2">
                  {item.noPO}
                </td>
                <td className="border border-gray-200 text-center px-2 py-2">
                  {item.noRoll}
                </td>
                <td className="border border-gray-200 text-center px-2 py-2">
                  {item.tanggal}
                </td>
                <td className="border border-gray-200 text-center px-2 py-2">
                  {item.kilogram}
                </td>
                <td className="border flex gap-2 border-gray-200 text-center px-2 py-2">
                  <button
                    className="bg-[#FF204E] hover:bg-red-800 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length > itemsPerPage && (
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePrevPage}
              disabled={currentPage === 1}>
              Previous
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextPage}
              disabled={indexOfLastItem >= data.length}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
