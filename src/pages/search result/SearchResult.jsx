import { useSearchParams } from 'react-router-dom';

export const SearchResult = () => {
    const [searchParams] = useSearchParams();
    console.log(searchParams.get('search'))
  return (
    <div>SearchResult</div>
  )
}
