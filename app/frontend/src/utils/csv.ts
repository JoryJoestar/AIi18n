import Papa from 'papaparse';

// 读取 CSV 文件
export const readCSV = (file: File, callback: (data: any) => void) => {
  Papa.parse(file, {
    complete: (results) => {
      callback(results.data);
    },
    header: true // 如果 CSV 有表头，设置为 true
  });
};

// 编写 CSV 文件
export const writeCSV = (dataToWrite: any[], filename: string) => {
  const csv = Papa.unparse(dataToWrite);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};