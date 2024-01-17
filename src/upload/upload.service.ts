import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvVariables } from "src/shared/config/env-variables.enum";
import { UploadResponse } from "./dto/upload.response";
@Injectable()
export class UploadService {
  private readonly devUrl: string;
  private readonly prodUrl: string;
  constructor(private readonly configService: ConfigService) {
    this.prodUrl = this.configService.get<string>("BASE_URL");
    this.devUrl = `http://localhost:${this.configService.get<number>(
      EnvVariables.PORT,
    )}`;
  }
  async getUploadedImageDetails(
    file: Express.Multer.File,
  ): Promise<UploadResponse> {
    if (!file) {
      throw new BadRequestException("File is required");
    }
    const imageKitUrl = this.prodUrl || this.devUrl;
    const file_path = "/images";
    const fileDetails: UploadResponse = {
      file_url: imageKitUrl + file_path + "/" + file.filename,
      file_id: file.filename,
      file_path: file_path,
    };
    return fileDetails;
  }

  async getUploadedImagesDetails(
    files: Express.Multer.File[],
  ): Promise<UploadResponse[]> {
    if (!files.length) {
      throw new BadRequestException("File is required");
    }
    const imageKitUrl = this.prodUrl || this.devUrl;
    const file_path = "/images";

    const filesDetails: UploadResponse[] = files.map((file) => {
      const fileDetails: UploadResponse = {
        file_url: imageKitUrl + file_path + "/" + file.filename,
        file_id: file.filename,
        file_path: file_path,
      };
      return fileDetails;
    });
    return filesDetails;
  }
}
