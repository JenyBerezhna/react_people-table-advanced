import { Link } from 'react-router-dom';

type Props = {
  slug: string;
  name: string;
  sex: 'm' | 'f';
  search: string;
  colorClass?: string;
};

export const PersonLink: React.FC<Props> = ({
  slug,
  name,
  sex,
  search,
  colorClass,
}) => {
  const finalClass =
    colorClass ?? (sex === 'f' ? 'has-text-danger' : 'has-text-link');

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: search ? `?${search}` : '',
      }}
      className={finalClass}
    >
      {name}
    </Link>
  );
};
