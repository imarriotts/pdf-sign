import { NextFunction, Request, Response } from "express";
import { createMocks } from "node-mocks-http";
import { upload } from "./upload";

describe("upload", () => {
    it("debería manejar la subida de archivos", async () => {
        const { req, res } = createMocks<Request, Response>({
            method: "POST",
            file: {
                fieldname: "file",
                originalname: "test.jpg",
                encoding: "7bit",
                mimetype: "image/jpeg",
                buffer: Buffer.from("imagen"),
                size: 11,
            },
        });
        const next: NextFunction = jest.fn();

        upload.single("file")(req, res, next);

        expect(req.file).toBeDefined();
        expect(req?.file?.originalname).toBe("test.jpg");
        expect(next).toHaveBeenCalled();
    });
});