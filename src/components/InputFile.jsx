import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import * as XLSX from 'xlsx';
import { db } from '../firebase';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const InputFile = () => {
  const [dataArray, setDataArray] = useState([]);

  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const importedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const importedRows = importedData.slice(1, 201);
      const datas = importedRows.map((row) => ({
        kategori: row[0],
        lokasiGudang: row[1],
        noMobil: row[2],
        noID: row[3],
        noSuratJalan: row[4],
        noPO: row[5],
        noRoll: row[6],
        tanggal: row[7],
        kilogram: row[8],
      }));

      setDataArray(datas);
    };

    reader.readAsArrayBuffer(file);
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    dataArray.forEach((dataItem, index) => {
      db.collection('pola-db')
        .add({ ...dataItem, index })
        .then(() => {
          if (index === dataArray.length - 1) {
            Swal.fire({
              icon: 'success',
              title: 'Data berhasil disimpan!',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              navigate('/data');
            });
          }
        })
        .catch((error) => {
          console.error('Error menyimpan data ke Firestore: ', error);
        });
    });

    setKategori('');
    setLokasiGudang('');
    setNoMobil('');
    setNoID('');
    setNoSuratJalan('');
    setNoPO('');
    setNoRoll('');
    setTanggal('');
    setKilogram('');
    setDataArray([]);
  };

  return (
    <main className="flex flex-col gap-3">
      <div>
        <label
          htmlFor="excel-file"
          className="block font-medium text-sm text-gray-700">
          Import Excel XLSX, CSV
        </label>
        <input
          id="excel-file"
          type="file"
          accept=".xlsx, .xls, .csv"
          className="mt-1"
          onChange={handleImportExcel}
        />
      </div>
      <Button className="w-[400px] bg-[#387ADF]" onClick={handleSubmit}>
        Submit
      </Button>
    </main>
  );
};

export default InputFile;
