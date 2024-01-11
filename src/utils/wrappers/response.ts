/**
 * @description Wrapper para las respuestas de éxito
 * @param data 
 * @param success 
 * @param code 
 * @returns 
 */
export const responseWrapper = (data: any, success = true, code = 200) => ({
    success,
    code,
    data: success ? data : undefined,
    errorData: success ? undefined : data,
});
