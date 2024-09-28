// app/frontend/src/utils/idGenerator.ts

export function generateUniqueId(): string {
    const timestamp = Date.now().toString(36); // 当前时间戳转换为36进制
    const randomNum = Math.random().toString(36).substring(2, 8); // 生成随机数并转换为36进制
    return `${timestamp}-${randomNum}`; // 组合时间戳和随机数
}