import { Link } from 'react-router-dom';

type Props = {
  slug: string;
  name: string;
  sex: 'm' | 'f';
  search: string;
};

export const PersonLink: React.FC<Props> = ({ slug, name, sex, search }) => {
  const isFemale = sex === 'f';

  return (
    <Link
      to={`/people/${slug}?${search}`}
      className={isFemale ? 'has-text-danger' : undefined}
    >
      {name}
    </Link>
  );
};
