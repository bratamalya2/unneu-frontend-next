import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
});

export async function getImageUrl(imageKey) {
    const command = new GetObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: imageKey,
    });

    try {
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        return url;  // Return the image URL
    } catch (err) {
        console.error("Error fetching image from S3:", err);
        return null;
    }
}