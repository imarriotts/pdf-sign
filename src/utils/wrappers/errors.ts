/**
 * @description Wrapper para las respuestas de error
 * @param message 
 * @param code 
 * @param errorData 
 * @returns 
 */
export const errorResponseWrapper = (message: string, code: number = 400, errorData: any = null) => ({
    success: false,
    code,
    errorData,
    message,
});
