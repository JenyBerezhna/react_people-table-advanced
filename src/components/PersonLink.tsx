import { Link } from 'react-router-dom';

type Props = {
  slug: string;
  name: string;
  sex: 'm' | 'f';
  search: string;
};

export const PersonLink: React.FC<Props> = ({ slug, name, sex, search }) => (
  <Link
    to={{ pathname: `/people/${slug}`, search }}
    className={sex === 'f' ? 'has-text-danger' : undefined}
  >
    {name}
  </Link>
);
