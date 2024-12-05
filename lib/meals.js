// Reaches out to the database to get data
// import fs from 'node:fs';
import { S3 } from '@aws-sdk/client-s3';

import sql from 'better-sqlite3'
import slugify from 'slugify';
import xss from 'xss';

const s3 = new S3({
    region: 'us-west-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
const db = sql('meals.db');

export async function getMeals() {
    await new Promise(resolve => setTimeout(resolve, 1000));   // async option
 //   throw new Error('Meals not found.');
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    // protect against SQL injection with the ?
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, {lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const bufferedImage = await meal.image.arrayBuffer();

    /* write to S3 development or production */
    await s3.putObject({
        Bucket: 'juditharrizza-nextjs-users-images',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
    });
    meal.image = fileName;

    /* write to local file system (for development only)
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    stream.write(Buffer.from(bufferedImage), (error) => {
       if (error) {
           throw new Error('Saving image failed');
       }
    });
    meal.image = `/images/${fileName}`;
    */

    db.prepare(`
        INSERT INTO meals
            (slug, title, image, summary, instructions, creator, creator_email)
        VALUES (
             @slug,
             @title,
             @image,
             @summary,
             @instructions,
             @creator,
             @creator_email
            )
        `).run(meal);
}
