import React from 'react';
import InputLayout from '../components/Inputlayout';
import InputFile from '../components/InputFile';

const InputData = () => {
  return (
    <div className="flex gap-10">
      <InputLayout />
      <InputFile />
    </div>
  );
};

export default InputData;
