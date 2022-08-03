import { IPFSHTTPClient } from 'ipfs-http-client';
const { create, urlSource } = require('ipfs-http-client');

export class IpfsUtils {
  private static ipfsInstance: IPFSHTTPClient;

  private static getIpfsInstance(): IPFSHTTPClient {
    if (!this.ipfsInstance) {
      this.ipfsInstance = create(process.env.IPFS_URI);
    }
    return this.ipfsInstance;
  }

  public static async upload(imageUrl: string): Promise<string> {
    const ipfs = this.getIpfsInstance();
    const { cid } = await ipfs.add(urlSource(imageUrl));
    return cid.toString();
  }
}
