import { createClient } from 'contentful';
import RecipeCard from '../components/RecipeCard';

const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } = process.env;

export async function getStaticProps() {
  const client = createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: 'post' })

  return {
    props: {
      recipes: res.items,
    }
  };
}

export default function Recipes({ recipes }) {
  console.log('recipes', recipes)
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} />
      ))}
    </div>
  )
}