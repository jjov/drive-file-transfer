import { DriveTransferManager } from "../src/index";

describe("Google Drive Integration Testing", () => {
  it("Get List of files from Drive", async () => {
    const driveManager: DriveTransferManager = new DriveTransferManager();
    await driveManager.setup();
    const list = await driveManager.getFileList();
    console.log(list);
    expect(list).not.toBeNull();
  }, 60000);

  it("Get file from Drive", async () => {
    const driveManager: DriveTransferManager = new DriveTransferManager();
    await driveManager.setup();
    const file = await driveManager.getFileByName("your_file_name.png");
    console.log(file.path);
    expect(file).not.toBeNull();
  }, 60000);
});
