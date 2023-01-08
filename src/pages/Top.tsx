import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { saveAs } from 'file-saver';

type json = {
  id: string;
  text: string;
  size: string;
};

let res: AxiosResponse;

export const Top = () => {
  const [config, setConfig] = useState([] as json[]);

  useEffect(() => {
    axios.get('../config.json').then((_res) => {
      res = _res;
      setConfig(res.data);
    });
  }, []);

  const updateJson = () => {
    config[0].text = 'aaa';
    setConfig([...config]);
  };

  const downloadJson = () => {
    const json = new Blob([JSON.stringify(res.data)], { type: res.data.type });
    saveAs(json, 'config.json');
  };

  return (
    <>
      <button onClick={updateJson}>update</button>
      <button onClick={downloadJson}>download</button>
      {config.map((v) => (
        <div key={v.id}>
          <p>{v.id}</p>
          <p>{v.text}</p>
          <p>{v.size}</p>
        </div>
      ))}
    </>
  );
};
