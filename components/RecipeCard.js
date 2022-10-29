import Link from 'next/link';

export default function RecipeCard({ recipe }) {
  const { title, coverImage: thumbnail } = recipe.fields;
  return (
    <div key={recipe.sys.id}>
      <div >
      
      </div>
      <div>
        <div>
          <h4>{title}</h4>
          <Link href={`/recipies/${title}`}>Cook this</Link>
        </div>
      </div>
    </div>
  )
};