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
  //  No parent → show "-"
  if (!name) {
    return <span>-</span>;
  }

  // Parent exists AND has slug → colored link
  if (slug) {
    const colorClass = sex === 'f' ? 'has-text-danger' : 'has-text-link';

    return (
      <a
        href={`#/people/${slug}${search ? `?${search}` : ''}`}
        className={colorClass}
      >
        {name}
      </a>
    );
  }

  // Parent exists but no slug → plain text
  return <span>{name}</span>;
};
