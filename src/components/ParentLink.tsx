interface ParentLinkProps {
  slug?: string | null;
  name: string | null;
  sex?: 'm' | 'f';
  search?: string;
}

export const ParentLink: React.FC<ParentLinkProps> = ({
  slug,
  name,
  sex,
  search,
}) => {
  if (!name) {
    return null;
  }

  const colorClass = sex === 'f' ? 'has-text-danger' : 'has-text-link';

  if (slug) {
    return (
      <a
        href={`#/people/${slug}${search ? `?${search}` : ''}`}
        className={colorClass}
      >
        {name}
      </a>
    );
  }

  return <span className={colorClass}>{name}</span>;
};
