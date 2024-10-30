function splitSentences(inputText: string): string[] {
    // 使用正则表达式匹配句子的结束符号，包括句号、问号、感叹号、分号等
    const separatorRegex = /([^\S\r\n]*[\.\?\!\。\？\！\；\~\;][^\S\r\n]*)/g;
  
    // 初始化结果数组
    const result: string[] = [];
  
    // 遍历所有匹配项
    let lastIndex = 0;
    let match;
    while ((match = separatorRegex.exec(inputText)) !== null) {
      // 获取当前匹配的分隔符及其位置
      const separator = match[1];
      const separatorIndex = match.index;
  
      // 提取当前子字符串（从上次匹配位置到当前分隔符前）
      const currentSentence = inputText.substring(lastIndex, separatorIndex);
  
      // 如果当前子字符串非空，则添加至结果数组
      if (currentSentence !== '') {
        result.push(currentSentence + separator);
      }
  
      // 更新上次匹配位置为当前分隔符的下一个字符位置
      lastIndex = separatorIndex + separator.length;
    }
  
    // 处理剩余文本（可能没有分隔符）
    const remainingText = inputText.substring(lastIndex);
    if (remainingText !== '') {
      result.push(remainingText);
    }
  
    return result;
  }
  
  export { splitSentences };