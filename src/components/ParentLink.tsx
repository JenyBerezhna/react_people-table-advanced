import { PersonLink } from './PersonLink';

type ParentLinkProps = {
  slug: string | null | undefined;
  name: string | null;
  sex: 'm' | 'f';
  search: string;
};

export const ParentLink: React.FC<ParentLinkProps> = ({
  slug,
  name,
  sex,
  search,
}) => {
  // No data at all → "-"
  if (!name && !slug) {
    return <>-</>;
  }

  const colorClass = sex === 'f' ? 'has-text-danger' : 'has-text-link';

  // If slug exists → always render a link
  if (slug && name) {
    return (
      <PersonLink
        slug={slug}
        name={name ?? ''}
        sex={sex}
        search={search}
        className={colorClass}
      />
    );
  }

  // If only name exists → plain colored text
  return <>{name}</>;
};
