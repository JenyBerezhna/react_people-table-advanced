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
  if (!name || !slug) {
    return <>-</>;
  }

  const className = sex === 'f' ? 'has-text-danger' : 'has-text-link';

  return (
    <PersonLink
      slug={slug}
      name={name}
      sex={sex}
      search={search}
      className={className}
    />
  );
};
