/* eslint-disable jsx-a11y/control-has-associated-label */
import { useLocation, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';
import { Person } from '../types/Person';
import { SortField } from '../types/SortField';

type PeopleTableProps = {
  people: Person[];
  sort: SortField | null;
  order: 'asc' | 'desc' | null;
};

type SortParams = {
  sort: SortField | null;
  order: 'asc' | 'desc' | null;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  sort,
  order,
}) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const search = searchParams.toString();

  const getNextParams = (column: SortField): SortParams => {
    if (sort !== column) {
      return { sort: column, order: 'asc' };
    }

    if (order === 'asc') {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (column: string): JSX.Element => {
    if (sort !== column) {
      return <i className="fas fa-sort" />;
    }

    return order === 'desc' ? (
      <i className="fas fa-sort-down" />
    ) : (
      <i className="fas fa-sort-up" />
    );
  };

  const resolveParent = (
    parentObj: Person | undefined,
    name: string | null,
    slug: string | null,
    sex: 'm' | 'f',
  ) => ({
    name: parentObj?.name ?? name,
    slug: parentObj?.slug ?? slug,
    sex,
  });

  const renderParent = (
    parent: ReturnType<typeof resolveParent>,
    searchQuery: string,
  ) => {
    if (!parent.name) {
      return '-';
    }

    if (!parent.slug) {
      return parent.name;
    }

    return (
      <PersonLink
        slug={parent.slug}
        name={parent.name}
        sex={parent.sex}
        search={searchQuery}
      />
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getNextParams('name')} className="icon ml-1">
                {getSortIcon('name')}
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextParams('sex')} className="icon ml-1">
                {getSortIcon('sex')}
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextParams('born')} className="icon ml-1">
                {getSortIcon('born')}
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextParams('died')} className="icon ml-1">
                {getSortIcon('died')}
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = location.pathname === `/people/${person.slug}`;

          const mother = resolveParent(
            person.mother,
            person.motherName,
            person.motherSlug,
            'f',
          );

          const father = resolveParent(
            person.father,
            person.fatherName,
            person.fatherSlug,
            'm',
          );

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                isSelected ? 'is-selected has-background-warning' : undefined
              }
            >
              {/* Person name */}
              <td>
                <PersonLink
                  slug={person.slug}
                  name={person.name}
                  sex={person.sex}
                  search={search}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>{renderParent(mother, search)}</td>

              <td>{renderParent(father, search)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
