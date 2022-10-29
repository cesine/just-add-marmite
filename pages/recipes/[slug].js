import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import RecipeCard from '../../components/RecipeCard';

const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } = process.env;
const fifteenMinutes = 15 * 60 * 60;
const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticPaths() {
  const res = await client.getEntries({ content_type: 'post' });

  return {
    paths: res.items.map(({ fields: { slug }}) => ({ params: { slug } })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({ 
    content_type: 'post', 
    'fields.slug': params.slug 
  });

  if (!items.length) {
    return {
      redirect: {
        destingation : '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      recipe: items[0],
      revalidate: fifteenMinutes,
    }
  };
}

export default function RecipeDetails({ recipe }) {
  if (!recipe) {
    return (<div>Loading</div>);
  }

  return (
    <div>
        <RecipeCard recipe={recipe} />
        <div>{documentToReactComponents(recipe.fields.content)}</div>
    </div>
  )
}