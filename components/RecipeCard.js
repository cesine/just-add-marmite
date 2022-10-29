import Link from 'next/link';
import Image from 'next/image';

export default function RecipeCard({ recipe }) {
  const { title, slug, coverImage: thumbnail } = recipe.fields;
  console.log('thubnail', JSON.stringify(thumbnail.fields.file.details.image, null, 2))
  return (
    <div >
      <div >
        <Image
          src={`https:${thumbnail?.fields?.file?.url}`}
          width={thumbnail?.fields?.file?.details?.image?.width ?? 100}
          height={thumbnail?.fields?.file?.details?.image?.height ?? 100}
        />
      </div>
      <div>
        <div>
          <h4>{title}</h4>
          <Link href={`/recipes/${slug}`}>View</Link>
        </div>
      </div>
    </div>
  )
};