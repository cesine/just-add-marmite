import { createClient } from 'contentful';
import RecipeCard from '../../components/RecipeCard';

const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } = process.env;

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticPaths() {
  const res = await client.getEntries({ content_type: 'post' });

  return {
    paths: res.items.map(({ fields: { slug }}) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({ 
    content_type: 'post', 
    'fields.slug': params.slug 
  });

  return {
    props: {
      recipe: items[0],
    }
  };
}

export default function RecipeDetails({ recipe }) {
  return (
    <div>
        <RecipeCard recipe={recipe} />
    </div>
  )
}