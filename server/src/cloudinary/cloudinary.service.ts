import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';
import { parseBuffer } from 'music-metadata';
import {
  MetadataResponse,
  Picture,
} from 'src/cloudinary/dto/meta-data-response.dto';
import { toError } from 'src/utils/helper/to-error';

@Injectable()
export class CloudinaryService {
  uploadFile(fileBuffer: Buffer, filename: string): Promise<UploadApiResponse> {
    const cleanName = this.sanitizeFilename(filename.replace(/\.[^/.]+$/, ''));

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'raw', public_id: cleanName },
        (error, result) => {
          if (error) return reject(toError(error));
          if (!result) return reject(new Error('Upload failed: No result'));
          resolve(result);
        },
      );
      streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
  }

  uploadPicture(
    picture: Picture,
    filename: string,
  ): Promise<UploadApiResponse> {
    const cleanName = this.sanitizeFilename(filename.replace(/\.[^/.]+$/, ''));

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', public_id: cleanName + '_thumbnail' },
        (error, result) => {
          if (error) return reject(toError(error));
          if (!result) return reject(new Error('Upload failed: No result'));
          resolve(result);
        },
      );
      streamifier.createReadStream(picture.data).pipe(uploadStream);
    });
  }

  async extractMetadata(fileBuffer: Buffer): Promise<MetadataResponse> {
    try {
      const metadata = await parseBuffer(fileBuffer, 'audio/mpeg');
      console.log(metadata);

      const common = metadata.common;
      const format = metadata.format;

      let picture: Picture | null = null;

      if (common.picture && common.picture.length > 0) {
        const pic = common.picture[0];
        picture = {
          format: pic.format,
          data: Buffer.from(pic.data),
        };
      }

      return {
        title: common.title,
        artist: common.artist,
        album: common.album,
        year: common.year,
        duration: format.duration,
        picture,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Failed to parse metadata');
    }
  }

  // Hàm chính: upload file mp3 + lấy metadata + upload thumbnail nếu có
  async uploadSongWithMetadata(file: Express.Multer.File): Promise<{
    metadata: MetadataResponse;
    audioUrl: string;
    thumbnailUrl?: string;
  }> {
    // 1. Lấy metadata
    const metadata = await this.extractMetadata(file.buffer);

    // 2. Upload mp3 lên Cloudinary
    const audioUploadResult = await this.uploadFile(
      file.buffer,
      file.originalname,
    );

    // 3. Nếu có ảnh thumbnail trong metadata thì upload ảnh lên Cloudinary
    let thumbnailUrl: string | undefined = undefined;
    if (metadata.picture) {
      const pictureUploadResult = await this.uploadPicture(
        metadata.picture,
        file.originalname,
      );
      thumbnailUrl = pictureUploadResult.secure_url;

      // Convert data ảnh thành base64 cho metadata trả về (nếu cần)
      metadata.picture.data = metadata.picture.data.toString('base64');
    }

    delete metadata.picture;
    return {
      metadata,
      audioUrl: audioUploadResult.secure_url,
      thumbnailUrl,
    };
  }

  sanitizeFilename(filename: string): string {
    return filename
      .replace(/[^a-zA-Z0-9-_]/g, '_') // thay ký tự đặc biệt bằng dấu _
      .replace(/_+/g, '_') // gom các dấu _ lại
      .replace(/^_+|_+$/g, '') // loại bỏ dấu _ ở đầu/cuối
      .toLowerCase();
  }
}
