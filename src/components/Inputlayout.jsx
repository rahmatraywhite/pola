import React, { useState } from 'react';
import { Input, Button } from '@material-tailwind/react';
import { db } from '../firebase';

const InputLayout = () => {
  const [kategori, setKategori] = useState('IN');
  const [lokasiGudang, setLokasiGudang] = useState('VIVO');
  const [noMobil, setNoMobil] = useState('');
  const [noID, setNoID] = useState('');
  const [noSuratJalan, setNoSuratJalan] = useState('');
  const [noPO, setNoPO] = useState('');
  const [noRoll, setNoRoll] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [kilogram, setKilogram] = useState('');

  const handleSubmit = () => {
    const data = {
      kategori,
      lokasiGudang,
      noMobil,
      noID,
      noSuratJalan,
      noPO,
      noRoll,
      tanggal,
      kilogram,
    };

    db.collection('pola-db')
      .add(data)
      .then(() => {
        console.log('Data berhasil disimpan ke Firestore');
        setKategori('IN');
        setLokasiGudang('VIVO');
        setNoMobil('');
        setNoID('');
        setNoSuratJalan('');
        setNoPO('');
        setNoRoll('');
        setTanggal('');
        setKilogram('');
      })
      .catch((error) => {
        console.error('Error menyimpan data ke Firestore: ', error);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Kategori"
        type="text"
        placeholder="IN / OUT"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
      />
      <Input
        label="Lokasi Gudang"
        type="text"
        value={lokasiGudang}
        onChange={(e) => setLokasiGudang(e.target.value)}
      />
      <Input
        label="No. Mobil"
        type="text"
        placeholder="FCIU9572856"
        value={noMobil}
        onChange={(e) => setNoMobil(e.target.value)}
      />
      <Input
        label="No. ID"
        type="text"
        value={noID}
        onChange={(e) => setNoID(e.target.value)}
      />
      <Input
        label="No. Surat Jalan"
        type="text"
        placeholder="19502"
        value={noSuratJalan}
        onChange={(e) => setNoSuratJalan(e.target.value)}
      />
      <Input
        label="No. PO"
        type="text"
        placeholder="PO#022&027"
        value={noPO}
        onChange={(e) => setNoPO(e.target.value)}
      />
      <Input
        label="No. Roll"
        type="text"
        placeholder="2152/3"
        value={noRoll}
        onChange={(e) => setNoRoll(e.target.value)}
      />
      <Input
        label="Tanggal"
        type="text"
        placeholder="16-Jun-22"
        value={tanggal}
        onChange={(e) => setTanggal(e.target.value)}
      />
      <Input
        label="Kilogram"
        type="text"
        placeholder="10"
        value={kilogram}
        onChange={(e) => setKilogram(e.target.value)}
      />
      <Button className="w-[400px] bg-[#387ADF]" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default InputLayout;
