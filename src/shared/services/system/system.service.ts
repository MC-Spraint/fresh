import { Injectable, Logger } from "@nestjs/common";
import * as fs from "fs";
import { NoParamCallback, Stats } from "fs";
import * as path from "path";

@Injectable()
export class SystemService {
  private logger: Logger;
  constructor() {
    this.logger = new Logger(SystemService.name);
  }
  public getRootPath(relativePath: string, filename?: string): string {
    const rootPath = path.join(
      __dirname,
      "",
      `${relativePath}/${filename ?? ``}`,
    );
    return rootPath;
  }

  public readFile(relativePath: string, filename?: string): string {
    const rootPath = this.getRootPath(relativePath, filename);
    const content = fs.readFileSync(rootPath, "utf8");
    return content;
  }

  public readDirectory(relativePath: string): string[] {
    const rootPath = this.getRootPath(relativePath);
    const content = fs.readdirSync(rootPath);
    return content;
  }

  public removeFile(relativePath: string, fileName: string): string {
    const rootPath = this.getRootPath(relativePath, fileName);
    fs.unlinkSync(rootPath);
    return fileName;
  }

  public removeAllFiles(relativePath: string): string[] {
    const rootPath = this.getRootPath(relativePath);
    const files: string[] = this.readDirectory(rootPath);
    const removed = files.map((file) => {
      const removedFile = this.removeFile(rootPath, file);
      return removedFile;
    });
    return removed;
  }

  public removeAllFilesAndFolders(relativePath: string): void {
    const rootPath = this.getRootPath(relativePath);
    this.deleteDirectoryRecursively(rootPath, (err) => {
      if (err) {
        this.logger.error(err);
      }
      this.logger.log(`${relativePath} deleted successfully`);
    });
  }

  private deleteDirectoryRecursively(
    rootPath: string,
    callback: NoParamCallback,
  ): void {
    fs.readdir(rootPath, (err: NodeJS.ErrnoException, files: string[]) => {
      if (err) {
        return callback(err);
      }
      if (!files.length) {
        return fs.rmdir(rootPath, callback);
      }
      let count = 0;
      files.forEach((file) => {
        const filePath = path.join(rootPath, file);
        fs.stat(filePath, (err: NodeJS.ErrnoException, stat: Stats) => {
          if (err) {
            return callback(err);
          }
          if (stat.isDirectory()) {
            this.deleteDirectoryRecursively(
              filePath,
              (err: NodeJS.ErrnoException) => {
                if (err) {
                  return callback(err);
                }
                count++;
                if (count === files.length) {
                  fs.rmdir(rootPath, callback);
                }
              },
            );
          }
          fs.unlink(filePath, (err: NodeJS.ErrnoException) => {
            if (err) {
              return callback(err);
            }
            count++;
            if (count === files.length) {
              fs.rmdir(rootPath, callback);
            }
          });
        });
      });
    });
  }
}
