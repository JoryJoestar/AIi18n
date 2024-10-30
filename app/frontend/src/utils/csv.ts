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

// 读取 Translate Source CSV 文件
export const parseTranslateSourceCSV = (file: File, callback: (data: any) => void) => {
  Papa.parse(file, {
    complete: (results) => {
      // 源数据
      const languages = results.meta.fields?.slice(1);
      const data = results.data;
      // 语言代码列表
      const language_codes = Object.values(data[0] as { [key: string]: string });
      const source_langauge = language_codes[0]
      const translate_languages = language_codes.slice(1);
      // 源数据为空时跳过
      const source_data = (data.slice(1) as { [key: string]: string }[]).map((row) => row.source).filter(source => source); // 添加类型注解并过滤空值

      const replacements = (data.slice(1, -1) as { [key: string]: string }[]).map(row => {
        const { source, ...rest } = row; // 去掉第一列
        return rest; // 返回去掉第一列后的数据
      });

      const csv_data = {
        languages,
        translate_languages,
        source_data,
        replacements
      }

      callback(csv_data);
    },
    header: true // 如果 CSV 有表头，设置为 true
  });
};