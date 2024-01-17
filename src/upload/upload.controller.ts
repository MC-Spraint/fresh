import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import * as multer from "multer";
import * as path from "path";
import { UploadResponse } from "./dto/upload.response";
import { UploadService } from "./upload.service";

const imageServerStorage = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
};
@ApiTags("Module upload")
@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("image")
  @UseInterceptors(FileInterceptor("image", imageServerStorage))
  public async uploadSingleImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadResponse> {
    return await this.uploadService.getUploadedImageDetails(file);
  }

  @Post("images")
  @UseInterceptors(FilesInterceptor("image", 10, imageServerStorage))
  public async uploadMultipleImage(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<UploadResponse[]> {
    return await this.uploadService.getUploadedImagesDetails(files);
  }
}
