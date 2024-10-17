import { drive_v3, google } from "googleapis";
import * as fs from "fs";
import * as path from "path";
import { WriteStream } from "fs";

export class DriveTransferManager {
  static GOOGLE_CREDENTIALS = JSON.parse(
    process.env.GOOGLE_CREDENTIALS || "{}"
  );

  private drive: drive_v3.Drive | undefined = undefined;

  async setup() {
    this.drive = await this.authorizeGoogleDrive();
  }

  async authorizeGoogleDrive() {
    const auth = new google.auth.GoogleAuth({
      credentials: DriveTransferManager.GOOGLE_CREDENTIALS,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });
    return drive;
  }

  async getFileList(): Promise<drive_v3.Schema$File[] | undefined> {
    const driveResponse = await this.drive?.files.list({});
    return driveResponse?.data?.files;
  }

  async findFileIdByFileName(fileName: string): Promise<string | undefined> {
    const files: drive_v3.Schema$File[] | undefined = await this.getFileList();
    if (files) {
      return files.find((file) => file.name === fileName)?.id as string;
    }
    return undefined;
  }

  async getFileByName(fileName: string): Promise<WriteStream> {
    const fileId: string = (await this.findFileIdByFileName(
      fileName
    )) as string;

    if (!fileId) {
      throw Error(`File ${fileName} not found`);
    }

    const targetPath = path.join("/tmp", fileName);
    const targetFile = fs.createWriteStream(targetPath);

    const driveResponse = await this.drive?.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    return new Promise((resolve, reject) => {
      driveResponse?.data
        .on("end", () => resolve(targetFile))
        .on("error", reject)
        .pipe(targetFile);
    });
  }
}
